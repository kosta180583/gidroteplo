import ImageGallery from '@/components/ImageGallery'
import SidebarWidgetsCopy from '@/components/SidebarWidgets copy'
import products from '@/data/products.json'
import fs from 'fs/promises'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import path from 'path'

type Product = {
	id: string
	name: string
	price: number
	images: string[]
	excerpt: string
	description: string
	characteristics?: string
	preorder?: boolean
}

async function getInstructionFile(productId: string): Promise<string | null> {
	const dir = path.join(process.cwd(), 'public', 'uploads', productId)
	try {
		const entries = await fs.readdir(dir)
		if (entries.length === 0) return null
		const stats = await Promise.all(
			entries.map(async f => ({ f, s: await fs.stat(path.join(dir, f)) }))
		)
		stats.sort((a, b) => b.s.mtimeMs - a.s.mtimeMs)
		return `/uploads/${productId}/${stats[0].f}`
	} catch {
		return null
	}
}

export async function generateMetadata({
	params,
}: {
	params: { id: string }
}): Promise<Metadata> {
	const product = (products as Product[]).find(p => p.id === params.id)
	if (!product) return { title: 'Товар не найден' }
	return {
		title: product.name,
		description: product.excerpt,
		openGraph: {
			title: product.name,
			description: product.excerpt,
			type: 'website',
			images: product.images?.map(u => ({ url: u })),
		},
	}
}

export default async function ProductPage({
	params,
}: {
	params: { id: string }
}) {
	const product = (products as Product[]).find(p => p.id === params.id)
	if (!product) return <div>Товар не найден</div>
	const fileUrl = await getInstructionFile(product.id)
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: product.name,
		description: product.excerpt,
		image: product.images,
		offers: {
			'@type': 'Offer',
			priceCurrency: 'RUB',
			price: product.price,
			availability: product.preorder
				? 'https://schema.org/PreOrder'
				: 'https://schema.org/InStock',
		},
	}

	return (
		<div className='grid lg:grid-cols-3 gap-6'>
			<div className='lg:col-span-2 space-y-2'>
				<Link
					href='/'
					className='inline-flex items-center text-sm text-gray-600 hover:text-gray-900 -mt-7'
				>
					<ArrowLeft className='mr-2 h-4 w-4' />
					Назад к каталогу
				</Link>
				<div className='card p-4'>
					<ImageGallery images={product.images} />
				</div>
				<div className='card p-6 space-y-3'>
					<div className='flex items-center gap-3'>
						<h1 className='text-2xl font-semibold'>{product.name}</h1>
						{product.preorder && <span className='badge'>Под заказ</span>}
					</div>
					<p className='text-gray-700'>{product.description}</p>
					{product.characteristics && (
						<div className='text-sm text-gray-700'>
							<span className='font-medium'>Характеристика: </span>
							{product.characteristics}
						</div>
					)}
					<div className='pt-2 flex flex-wrap items-center gap-3'>
						<div className='font-semibold'>
							{product.price.toLocaleString('ru-RU')} руб.
						</div>
						<a
							className='btn btn-outline'
							href='https://t.me/Koeeeeen'
							target='_blank'
						>
							Заказать в Telegram
						</a>
						{fileUrl && (
							<a className='btn btn-outline' href={fileUrl} target='_blank'>
								Скачать инструкцию
							</a>
						)}
					</div>
				</div>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</div>
			<div>
				<SidebarWidgetsCopy />
			</div>
		</div>
	)
}

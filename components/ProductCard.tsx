import Image from 'next/image'
import Link from 'next/link'

type Product = {
	id: string
	name: string
	price: number
	images: string[]
	excerpt: string
	characteristics?: string
	preorder?: boolean
}

export default function ProductCard({ product }: { product: Product }) {
	const img = product.images?.[0] || '/placeholder/boiler-1.svg'

	return (
		<Link
			href={`/product/${product.id}`}
			className='card p-4 flex flex-col transform transition duration-200 hover:-translate-y-1 hover:shadow-md hover:bg-white focus:outline-none'
		>
			<div className='relative'>
				{product.preorder && (
					<span className='absolute left-3 top-3 z-10 bg-yellow-200 text-yellow-800 px-2 py-1 rounded-md text-xs font-medium'>
						Под заказ
					</span>
				)}

				{/* Ключевой блок */}
				<div className='relative w-full h-56 rounded-xl overflow-hidden bg-gray-200'>
					<Image
						src={img}
						alt={product.name}
						fill
						className='object-cover transition-transform duration-300 hover:scale-105'
						sizes='(max-width: 768px) 100vw, 400px'
					/>
				</div>
			</div>

			<div className='mt-4 flex-1'>
				<h3 className='text-lg font-semibold'>{product.name}</h3>
				{product.characteristics && (
					<p className='text-sm text-gray-600 mt-1'>
						{product.characteristics}
					</p>
				)}
				<p className='text-sm text-gray-500 mt-1 line-clamp-2'>
					{product.excerpt}
				</p>
			</div>

			<div className='mt-4 flex items-center justify-between gap-2'>
				<span className='font-semibold'>
					{product.price.toLocaleString('ru-RU')} руб.
				</span>
				<span className='btn btn-primary'>Подробнее</span>
			</div>
		</Link>
	)
}

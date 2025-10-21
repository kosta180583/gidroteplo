'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function ImageGallery({ images }: { images: string[] }) {
	const [active, setActive] = useState(0)
	const [open, setOpen] = useState(false)

	const current = images[active] || '/placeholder/boiler-1.svg'

	// 🔒 Блокировка прокрутки при открытии модалки
	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [open])

	return (
		<div className='space-y-3'>
			{/* Основное изображение */}
			<div
				className='aspect-video w-full rounded-xl bg-gray-100 overflow-hidden cursor-zoom-in flex items-center justify-center'
				onClick={() => setOpen(true)}
			>
				<div className='relative w-full h-full transition-transform duration-500 ease-in-out hover:scale-105'>
					<Image
						src={current}
						alt='product'
						fill
						className='object-contain'
						sizes='(max-width: 768px) 100vw, 800px'
					/>
				</div>
			</div>

			{/* Миниатюры */}
			<div className='grid grid-cols-4 gap-2'>
				{images.map((src, i) => (
					<button
						key={i}
						onClick={() => setActive(i)}
						className={`aspect-video rounded-lg overflow-hidden border transition ${
							i === active ? 'border-gray-900' : 'border-transparent'
						}`}
					>
						<div className='relative w-full h-full'>
							<Image
								src={src}
								alt={`img-${i}`}
								fill
								className='object-contain bg-gray-100'
								sizes='(max-width: 768px) 25vw, 200px'
							/>
						</div>
					</button>
				))}
			</div>

			{/* Модалка (увеличение картинки) */}
			{open && (
				<div
					className='fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4'
					onClick={() => setOpen(false)}
				>
					{/* Контейнер, чтобы fill работал */}
					<div
						className='relative max-w-[90vw] max-h-[90vh] w-auto h-auto flex items-center justify-center'
						onClick={e => e.stopPropagation()} // чтобы не закрывалось при клике на фото
					>
						{/* ✅ Добавляем pinch-to-zoom и панорамирование */}
						<div
							className='relative w-[90vw] h-[90vh] overflow-auto touch-pan-y touch-pan-x'
							style={{ WebkitOverflowScrolling: 'touch' }}
						>
							<Image
								src={current}
								alt='zoom'
								fill
								className='object-contain rounded-xl select-none'
								sizes='90vw'
								draggable={false}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

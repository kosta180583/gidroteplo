import ProductCard from '@/components/ProductCard'
import SidebarWidgets from '@/components/SidebarWidgets'
import products from '@/data/products.json'

export default function HomePage() {
	return (
		<div className='container container-narrow py-6'>
			<div className='space-y-8'>
				{/* Заголовок */}
				<section className='text-center space-y-2'>
					<h1 className='text-3xl md:text-4xl font-semibold tracking-tight'>
						Модульные котельные
					</h1>
					<p className='text-gray-600'>
						Готовые котельные установки для домов площадью до 150 м² —
						практичное и экономичное решение без лишних расходов
					</p>
				</section>

				{/* Основная сетка: карточки + виджет */}
				<div className='grid lg:grid-cols-3 gap-6 items-start'>
					{/* Карточки товаров */}
					<section className='lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4'>
						{products.map((p: any) => (
							<ProductCard key={p.id} product={p} />
						))}
					</section>

					{/* Боковой виджет */}
					<aside className='space-y-4'>
						<SidebarWidgets />
					</aside>
				</div>
			</div>
		</div>
	)
}

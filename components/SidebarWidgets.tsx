import { Building2, Gift, MessageSquare, Truck } from 'lucide-react'
export default function SidebarWidgets() {
	return (
		<aside className='space-y-4 '>
			<div className='card p-4 flex gap-3'>
				<div className='h-10 w-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center'>
					<Truck />
				</div>
				<div>
					<h3 className='font-semibold'>Доставка по всей России</h3>
					<p className='text-sm text-gray-600'>
						Доставим заказ в любую точку России. Работаем с ведущими ТК,
						возможен самовывоз.
					</p>
				</div>
			</div>
			<div className='card p-4 flex gap-3'>
				<div className='h-10 w-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center'>
					<MessageSquare />
				</div>
				<div>
					<h3 className='font-semibold'>Контакты</h3>
					<p className='text-sm text-gray-600'>
						Свяжитесь с нами в Telegram — оперативно ответим, пришлём расчёт и
						консультацию.
					</p>
					<a
						className='btn btn-outline mt-2'
						href='https://t.me/Koeeeeen'
						target='_blank'
					>
						Написать в Telegram
					</a>
				</div>
			</div>
			<div className='card p-4 flex gap-3'>
				<div className='h-10 w-10 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center'>
					<Building2 />
				</div>
				<div>
					<h3 className='font-semibold'>О компании</h3>
					<p className='text-sm text-gray-600'>
						BoilerShop — поставщик оборудования для отопления. Подбираем решения
						для дома и бизнеса с гарантией качества.
					</p>
				</div>
			</div>
			<div className='card p-4 flex gap-3'>
				<div className='h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center'>
					<Gift />
				</div>
				<div>
					<h3 className='font-semibold'>Акция</h3>
					<p className='text-sm text-gray-600'>
						При покупке комплекта — проект тёплого пола бесплатно:
						3D‑визуализация, гидравлический расчёт, длины петель и раскладка
						контуров.
					</p>
				</div>
			</div>
		</aside>
	)
}

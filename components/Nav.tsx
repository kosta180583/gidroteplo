'use client'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'
export default function Nav() {
	return (
		<header className='sticky top-0 z-30 border-b border-gray-200 bg-white/70 backdrop-blur'>
			<div className='container container-narrow flex h-14 items-center gap-4'>
				<Link href='/' className='font-semibold tracking-tight text-lg'>
					Boiler<span className='text-gray-500'>Shop</span>
				</Link>
				<nav className='ml-auto flex items-center gap-2'>
					<a
						href='https://t.me/your_username'
						target='_blank'
						className='btn btn-outline'
					>
						<MessageSquare className='mr-2 h-4 w-4' />
						Заказать в Telegram
					</a>
				</nav>
			</div>
		</header>
	)
}

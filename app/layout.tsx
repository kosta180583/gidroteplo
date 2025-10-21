import './globals.css';
import type { Metadata } from 'next';
import Nav from '@/components/Nav';
export const metadata:Metadata={
  metadataBase:new URL('https://example.com'),
  title:{default:'BoilerShop — каталог оборудования',template:'%s — BoilerShop'},
  description:'Каталог котлов и комплектующих. Доставка по всей России. Проект тёплого пола в подарок.',
  keywords:['котлы','отопление','насосы','BoilerShop','теплый пол','инженерное оборудование'],
  openGraph:{type:'website',title:'BoilerShop — каталог оборудования',description:'Оборудование для систем отопления. Доставка по РФ.',url:'https://example.com',siteName:'BoilerShop'},
  robots:{index:true,follow:true}
};
export default function RootLayout({children}:{children:React.ReactNode}){
  return(<html lang="ru"><body><Nav/><main className="container container-narrow py-6">{children}</main></body></html>);
}

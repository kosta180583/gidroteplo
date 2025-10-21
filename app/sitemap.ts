import { MetadataRoute } from 'next';
import products from '@/data/products.json';
export default function sitemap():MetadataRoute.Sitemap{
  const base='https://example.com';
  const routes=['','/admin',...(products as any).map((p:any)=>`/product/${p.id}`)];
  return routes.map(r=>({url:base+r,lastModified:new Date(),changeFrequency:'weekly',priority:r.startsWith('/product/')?0.8:0.5}));
}

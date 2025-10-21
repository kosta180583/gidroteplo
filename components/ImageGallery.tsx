'use client';
import { useState } from 'react';
export default function ImageGallery({images}:{images:string[]}){
  const [active,setActive]=useState(0);
  const [open,setOpen]=useState(false);
  const current=images[active]||'/placeholder/boiler-1.svg';
  return(<div className="space-y-3">
    <div className="aspect-video w-full rounded-xl bg-gray-200 overflow-hidden cursor-zoom-in" onClick={()=>setOpen(true)}>
      <img src={current} alt="product" className="h-full w-full object-cover"/>
    </div>
    <div className="grid grid-cols-4 gap-2">
      {images.map((src,i)=>(
        <button key={i} onClick={()=>setActive(i)} className={`aspect-video rounded-lg overflow-hidden border ${i===active?'border-gray-900':'border-transparent'}`}>
          <img src={src} alt={`img-${i}`} className="h-full w-full object-cover"/>
        </button>
      ))}
    </div>
    {open&&(<div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center" onClick={()=>setOpen(false)}>
      <img src={current} alt="zoom" className="max-h-[90vh] max-w-[90vw] rounded-xl"/>
    </div>)}
  </div>);
}
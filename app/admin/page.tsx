'use client';
import { useEffect,useState,FormEvent } from 'react';
import products from '@/data/products.json';
type Product={id:string;name:string};
export default function AdminPage(){
  const [status,setStatus]=useState<string>('');
  const [isAdmin,setIsAdmin]=useState<boolean>(false);
  const [productId,setProductId]=useState<string>((products as any)[0]?.id||'');
  const [file,setFile]=useState<File|null>(null);
  useEffect(()=>{fetch('/api/ping').then(res=>setIsAdmin(res.ok)).catch(()=>{});},[]);
  async function onLogin(e:FormEvent<HTMLFormElement>){e.preventDefault();const form=new FormData(e.currentTarget);const res=await fetch('/api/login',{method:'POST',body:form});if(res.ok){setStatus('Вы вошли как админ.');setIsAdmin(true);}else setStatus('Неверный пароль.');}
  async function onLogout(){await fetch('/api/logout',{method:'POST'});setIsAdmin(false);setStatus('Вы вышли.');}
  async function onUpload(e:FormEvent<HTMLFormElement>){e.preventDefault();if(!file||!productId){setStatus('Выберите файл и товар');return;}const data=new FormData();data.append('productId',productId);data.append('file',file);const res=await fetch('/api/upload',{method:'POST',body:data});setStatus(res.ok?'Файл загружен. Проверьте страницу товара.':'Ошибка загрузки.');}
  return(<div className="max-w-xl mx-auto space-y-6">
    <h1 className="text-2xl font-semibold">Админ</h1>
    {!isAdmin&&(<form onSubmit={onLogin} className="card p-4 space-y-3"><div className="space-y-1"><label className="label">Пароль администратора</label><input className="input" name="password" type="password" placeholder="Введите пароль"/></div><button className="btn btn-primary" type="submit">Войти</button></form>)}
    {isAdmin&&(<form onSubmit={onUpload} className="card p-4 space-y-3">
      <div className="space-y-1"><label className="label">Выберите товар</label><select className="input" value={productId} onChange={e=>setProductId(e.target.value)}>{(products as Product[]).map(p=>(<option key={p.id} value={p.id}>{p.name}</option>))}</select></div>
      <div className="space-y-1"><label className="label">Файл инструкции (PDF/DOC/DOCX/TXT)</label><input className="input" type="file" accept=".pdf,.doc,.docx,.txt" onChange={e=>setFile(e.target.files?.[0]||null)}/></div>
      <button className="btn btn-primary" type="submit">Загрузить</button><button type="button" className="btn btn-outline w-full" onClick={onLogout}>Выйти</button></form>)}
    {status&&<p className="text-sm text-gray-600">{status}</p>}
  </div>);
}

import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {furniture} from '@/data/furniture';
import {DetailClient} from './detail-client';
import {JsonLd} from '@/components/json-ld';
import {metadataForPage} from '@/lib/seo-metadata';
import {absoluteUrl,productPageSchema,webPageSchema} from '@/lib/seo-schema';
import {business} from '@/data/config';

type Props={params:Promise<{slug:string}>};

export function generateStaticParams(){return furniture.map(item=>({slug:item.slug}))}

export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {slug}=await params;
  const item=furniture.find(product=>product.slug===slug);
  if(!item)return {title:'Furniture piece not found'};
  const path=`/collection/${item.slug}`;
  return {...metadataForPage({title:item.title,description:item.description,path}),openGraph:{title:item.title,description:item.description,type:'website',...(business.siteUrlConfigured?{url:absoluteUrl(path)}:{}),images:[{url:item.images[0].src,alt:item.images[0].alt}]},twitter:{card:'summary_large_image',title:item.title,description:item.description,images:[item.images[0].src]}};
}

export default async function Detail({params}:Props){
  const {slug}=await params;
  const item=furniture.find(product=>product.slug===slug);
  if(!item)notFound();
  const path=`/collection/${item.slug}`;
  const webPage=webPageSchema(path,item.title,item.description);
  const productData=productPageSchema(item);
  const structuredData=business.siteUrlConfigured&&webPage&&productData?[webPage,...productData]:null;
  return <><JsonLd data={structuredData}/><DetailClient item={item}/></>;
}

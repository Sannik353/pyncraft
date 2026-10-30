import type {Metadata} from 'next';
import {business} from '@/data/config';

type PageInfo={title:string;description:string;path:string};

export function metadataForPage(page:PageInfo):Metadata{
  const title=`${page.title} | ${business.name}`;
  const image='https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85';
  return {
    title:page.title,
    description:page.description,
    ...(business.siteUrlConfigured?{alternates:{canonical:page.path}}:{}),
    robots:{index:business.siteUrlConfigured,follow:true},
    openGraph:{title,description:page.description,type:'website',...(business.siteUrlConfigured?{url:new URL(page.path,business.siteUrl).toString()}:{}),images:[{url:image,alt:'Warm modern living room with handcrafted timber furniture'}]},
    twitter:{card:'summary_large_image',title,description:page.description,images:[image]},
  };
}

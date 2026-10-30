import type {MetadataRoute} from 'next';import {categories,furniture} from '@/data/furniture';import {business} from '@/data/config';
export default function sitemap():MetadataRoute.Sitemap{
  if(!business.siteUrlConfigured)return [];
  const categoryPages=categories.map(category=>`/collection?category=${encodeURIComponent(category)}`);
  return['','/collection','/about','/projects','/contact','/faq',...categoryPages,...furniture.map(item=>`/collection/${item.slug}`)].map(path=>({url:new URL(path,business.siteUrl).toString(),lastModified:new Date()}));
}

import type {Metadata} from 'next';
import {JsonLd} from '@/components/json-ld';
import {categories,furniture,type Category} from '@/data/furniture';
import {megaMenus} from '@/data/navigation';
import {business} from '@/data/config';
import {collectionSeo,pageSeo} from '@/data/seo';
import {metadataForPage} from '@/lib/seo-metadata';
import {webPageSchema} from '@/lib/seo-schema';
import {CollectionPageView} from './collection-page-view';

type SearchValues={category?:string|string[];subcategory?:string|string[]};
type Props={searchParams:Promise<SearchValues>};

function single(value:string|string[]|undefined){return Array.isArray(value)?value[0]:value}
function isKnownSubcategory(category:string,subcategory:string){
  return megaMenus.some(menu=>menu.groups.some(group=>group.category===category&&(group.title===subcategory||group.subcategories?.some(item=>item.label===subcategory))));
}
async function resolveCollection({searchParams}:Props){
  const params=await searchParams;
  const rawCategory=single(params.category);
  const category=categories.find(item=>item===rawCategory);
  const rawSubcategory=single(params.subcategory);
  const subcategory=category&&rawSubcategory&&isKnownSubcategory(category,rawSubcategory)?rawSubcategory:undefined;
  const seo=category?collectionSeo(category,subcategory):pageSeo.collection;
  const hasMatchingItems=!subcategory||furniture.some(item=>item.category===category&&`${item.title} ${item.category} ${item.material} ${item.description}`.toLowerCase().includes(subcategory.toLowerCase()));
  const url=new URL('/collection',business.siteUrl);
  if(category)url.searchParams.set('category',category);
  if(subcategory)url.searchParams.set('subcategory',subcategory);
  return {category,subcategory,seo,canonical:`${url.pathname}${url.search}`,hasMatchingItems};
}

export async function generateMetadata(props:Props):Promise<Metadata>{
  const {seo,canonical,hasMatchingItems}=await resolveCollection(props);
  return {...metadataForPage({...seo,path:canonical}),robots:{index:business.siteUrlConfigured&&hasMatchingItems,follow:true}};
}

export default async function Collection(props:Props){
  const {category,subcategory,seo,canonical}=await resolveCollection(props);
  const description=category?seo.description:pageSeo.collection.description;
  return <><JsonLd data={webPageSchema(canonical,seo.title,description)}/><CollectionPageView category={category as Category|undefined} subcategory={subcategory} description={description}/></>;
}

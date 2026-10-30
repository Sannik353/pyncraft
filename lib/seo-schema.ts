import {business} from '@/data/config';
import type {Furniture} from '@/data/furniture';

export const absoluteUrl=(path:string)=>new URL(path,business.siteUrl).toString();
const businessId=absoluteUrl('/#business');
const siteId=absoluteUrl('/#website');
const whatsappNumber=business.whatsapp.replace(/\D/g,'');
const addressFields=business.address;
const hasAddress=Boolean(addressFields.streetAddress&&addressFields.city&&addressFields.state&&addressFields.postalCode&&addressFields.country);

export const siteEntityGraph=business.siteUrlConfigured?{
  '@context':'https://schema.org',
  '@graph':[
    {
      '@type':'HomeAndConstructionBusiness',
      '@id':businessId,
      name:business.name,
      url:business.siteUrl,
      description:'Independent carpentry and custom furniture business creating made-to-order pieces with attention to materials and detail.',
      telephone:business.phone.replace(/\s/g,''),
      ...(business.email?{email:business.email}:{}),
      ...(whatsappNumber?{contactPoint:{'@type':'ContactPoint',telephone:business.phone.replace(/\s/g,''),contactType:'furniture enquiries',url:`https://wa.me/${whatsappNumber}`}}:{}),
      ...(hasAddress?{address:{'@type':'PostalAddress',streetAddress:addressFields.streetAddress,addressLocality:addressFields.city,addressRegion:addressFields.state,postalCode:addressFields.postalCode,addressCountry:addressFields.country}}:{}),
      ...(business.businessHours.length?{openingHoursSpecification:business.businessHours}:{}),
      ...(business.serviceAreas.length?{areaServed:business.serviceAreas}:{}),
      ...(business.geo?{geo:{'@type':'GeoCoordinates',latitude:business.geo.latitude,longitude:business.geo.longitude}}:{}),
      ...([business.instagram,business.facebook].some(Boolean)?{sameAs:[business.instagram,business.facebook].filter(Boolean)}:{}),
    },
    {'@type':'WebSite','@id':siteId,url:business.siteUrl,name:business.name,inLanguage:'en',publisher:{'@id':businessId}},
    {'@type':'WebPage','@id':absoluteUrl('/#webpage'),url:business.siteUrl,name:'Custom & Handcrafted Furniture | Pyne Carpenter House',description:'Discover custom, handcrafted furniture by Pyne Carpenter House. Thoughtful wooden beds, wardrobes, dining tables and made-to-order carpentry.',isPartOf:{'@id':siteId},about:{'@id':businessId}},
  ],
}:null;

export function webPageSchema(path:string,title:string,description:string){
  if(!business.siteUrlConfigured)return null;
  const url=absoluteUrl(path);
  return {'@context':'https://schema.org','@type':'WebPage','@id':`${url}#webpage`,url,name:title,description,isPartOf:{'@id':siteId},about:{'@id':businessId}};
}

export function productPageSchema(item:Furniture){
  if(!business.siteUrlConfigured)return null;
  const path=`/collection/${item.slug}`;
  const url=absoluteUrl(path);
  return [
    {'@context':'https://schema.org','@type':'Product','@id':`${url}#product`,name:item.title,description:item.description,image:item.images.map(image=>image.src),category:item.category,material:item.material,url,mainEntityOfPage:url,brand:{'@id':businessId}},
    {'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[
      {'@type':'ListItem',position:1,name:'Home',item:absoluteUrl('/')},
      {'@type':'ListItem',position:2,name:'Furniture collection',item:absoluteUrl('/collection')},
      {'@type':'ListItem',position:3,name:item.title,item:url},
    ]},
  ];
}

export function breadcrumbSchema(entries:{name:string;path:string}[]){
  if(!business.siteUrlConfigured)return null;
  return {'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':entries.map((entry,index)=>({'@type':'ListItem',position:index+1,name:entry.name,item:absoluteUrl(entry.path)}))};
}

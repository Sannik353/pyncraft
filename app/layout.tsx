import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { business } from '@/data/config';
import { WhatsAppFloat } from '@/components/whatsapp-float';
import { pageSeo } from '@/data/seo';
import { siteEntityGraph } from '@/lib/seo-schema';
import { JsonLd } from '@/components/json-ld';
export const metadata: Metadata = { metadataBase: new URL(business.siteUrl), title: { default:`${business.name} | Furniture, made with care`, template:`%s | ${business.name}` }, description:pageSeo.home.description, ...(business.siteUrlConfigured?{alternates:{canonical:pageSeo.home.path}}:{}), robots:{index:business.siteUrlConfigured,follow:true}, openGraph:{ title:`${business.name} | Furniture, made with care`, description:pageSeo.home.description, type:'website', ...(business.siteUrlConfigured?{url:new URL('/',business.siteUrl).toString()}:{}), images:[{url:'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',width:1200,height:800,alt:'Warm modern living room with handcrafted timber furniture'}] }, twitter:{card:'summary_large_image',title:`${business.name} | Furniture, made with care`,description:pageSeo.home.description,images:['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85']} };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link rel="preconnect" href="https://images.unsplash.com"/></head><body><JsonLd data={siteEntityGraph}/><SiteHeader/>{children}<SiteFooter/><WhatsAppFloat/></body></html>; }


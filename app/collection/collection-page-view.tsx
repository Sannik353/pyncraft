'use client';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {CollectionBrowser} from '@/components/collection-browser';
import {pageSeo} from '@/data/seo';
import type {Category} from '@/data/furniture';

const categoryContent:{category:Category;title:string;description:string}[]=[
  {category:'Beds',title:'Wooden beds',description:'Platform, spindle and four-poster examples, with sizes and dimensions confirmed for each commission.'},
  {category:'Wardrobes',title:'Custom wardrobes',description:'Made-to-order bedroom storage with materials and internal layouts discussed for your space.'},
  {category:'Dining Tables',title:'Dining tables',description:'Dining table examples include reclaimed teak and sheesham, with multiple lengths noted for selected designs.'},
  {category:'Sofas',title:'Sofas',description:'Wood-framed sofa samples pair considered timber frames with upholstery fabrics.'},
  {category:'Cabinets',title:'Cabinets & storage',description:'Sample cabinets use materials such as walnut, oak, teak and cane; confirm details for a specific piece.'},
  {category:'Custom Furniture',title:'Study & custom furniture',description:'Made-to-order desks, benches and other custom pieces can be discussed for your space and intended use.'},
];
const categoryHeading:Record<Category,string>={'Beds':'Wooden beds','Wardrobes':'Custom wardrobes','Dining Tables':'Wooden dining tables','Sofas':'Wooden sofas','Cabinets':'Wooden cabinets','Custom Furniture':'Custom-made furniture'};

export function CollectionPageView({category,subcategory,description}:{category?:Category;subcategory?:string;description:string}){
  const heading=subcategory||category?(subcategory||categoryHeading[category as Category]):'The collection';
  return <main className="page"><div className="page-hero"><div className="wrap"><span className="eyebrow">Furniture for considered living</span><h1 className="display">{heading}<span>.</span></h1><p>{category||subcategory?description:pageSeo.collection.description}</p></div></div><section className="wrap collection"><section className="category-guide" aria-labelledby="category-guide-heading"><div><span className="eyebrow">Explore by furniture type</span><h2 className="display" id="category-guide-heading">Made for different rooms and routines.</h2></div><div className="category-guide-grid">{categoryContent.map(item=><Link key={item.category} href={`/collection?category=${encodeURIComponent(item.category)}`} className="category-guide-item"><h3>{item.title}<ArrowUpRight size={15}/></h3><p>{item.description}</p></Link>)}</div></section><CollectionBrowser/></section><style jsx>{`.page-hero{padding:165px 0 65px;background:#eae3d8}.page-hero h1{font-size:clamp(70px,10vw,120px);line-height:.9;margin:20px 0}.page-hero h1 span{color:#8c6548}.page-hero p{font-size:14px;color:#66675f;max-width:570px;line-height:1.8}.collection{padding-top:40px;padding-bottom:100px}.category-guide{border-bottom:1px solid #d8d1c6;padding:15px 0 44px}.category-guide>div:first-child{max-width:650px}.category-guide h2{font-size:clamp(38px,5vw,56px);line-height:.95;margin:14px 0 28px}.category-guide-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px 28px}.category-guide-item{display:block;border-top:1px solid #d8d1c6;padding:14px 0 0}.category-guide-item h3{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:0;font:500 25px var(--font-cormorant);color:#292c24}.category-guide-item:hover h3{color:#8c6548}.category-guide-item p{font-size:11px;line-height:1.7;color:#717269;margin:8px 0 0}@media(max-width:760px){.page-hero{padding-top:140px}.category-guide-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.category-guide h2{font-size:42px}}@media(max-width:460px){.category-guide-grid{grid-template-columns:1fr}}`}</style></main>;
}

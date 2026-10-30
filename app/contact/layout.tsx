import {JsonLd} from '@/components/json-ld';import {pageSeo} from '@/data/seo';import {metadataForPage} from '@/lib/seo-metadata';import {webPageSchema} from '@/lib/seo-schema';
export const metadata=metadataForPage(pageSeo.contact);
export default function ContactLayout({children}:{children:React.ReactNode}){return <>{children}<JsonLd data={webPageSchema(pageSeo.contact.path,pageSeo.contact.title,pageSeo.contact.description)}/></>}

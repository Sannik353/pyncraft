import {JsonLd} from '@/components/json-ld';import {pageSeo} from '@/data/seo';import {metadataForPage} from '@/lib/seo-metadata';import {webPageSchema} from '@/lib/seo-schema';
export const metadata=metadataForPage(pageSeo.about);
export default function AboutLayout({children}:{children:React.ReactNode}){return <>{children}<JsonLd data={webPageSchema(pageSeo.about.path,pageSeo.about.title,pageSeo.about.description)}/></>}

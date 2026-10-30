import {JsonLd} from '@/components/json-ld';import {pageSeo} from '@/data/seo';import {metadataForPage} from '@/lib/seo-metadata';import {webPageSchema} from '@/lib/seo-schema';
export const metadata=metadataForPage(pageSeo.projects);
export default function ProjectsLayout({children}:{children:React.ReactNode}){return <>{children}<JsonLd data={webPageSchema(pageSeo.projects.path,pageSeo.projects.title,pageSeo.projects.description)}/></>}

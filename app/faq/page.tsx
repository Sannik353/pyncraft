import Link from 'next/link';
import {JsonLd} from '@/components/json-ld';
import {pageSeo} from '@/data/seo';
import {business} from '@/data/config';
import {generalEnquiryMessage,whatsappUrl} from '@/lib/whatsapp';
import {metadataForPage} from '@/lib/seo-metadata';
import {breadcrumbSchema,webPageSchema} from '@/lib/seo-schema';

export const metadata=metadataForPage(pageSeo.faq);

const questions=[
  {question:'What types of furniture does Pyne Carpenter House make?',answer:<>The catalogue currently showcases beds, wardrobes, dining tables, sofas, cabinets and custom furniture. Browse the <Link href="/collection">furniture collection</Link> for sample pieces and materials.</>},
  {question:'Can I request custom-made furniture?',answer:<>Yes. Pyne Carpenter House accepts made-to-order and custom furniture enquiries. Share your room, intended use and ideas through the <Link href="/contact">enquiry form</Link> or WhatsApp to discuss a piece.</>},
  {question:'Can I order a custom wooden wardrobe?',answer:<>Custom wardrobes are part of the furniture enquiry catalogue. The exact layout, dimensions, materials and finish should be confirmed directly for your project.</>},
  {question:'What types of wooden beds are available?',answer:<>The sample collection includes platform, spindle and four-poster bed designs. Ask the workshop about the right size and available details for your space.</>},
  {question:'Can furniture dimensions be customized?',answer:<>Some pieces in the sample catalogue are described as made to order or available in multiple dimensions. Confirm the dimensions for the specific piece before commissioning it.</>},
  {question:'How can I enquire about furniture?',answer:<>Use the contact form to prepare a message in WhatsApp, or message Pyne Carpenter House directly. The form opens WhatsApp for you to review and send your enquiry.</>},
  {question:'How do I contact Pyne Carpenter House?',answer:<>Call or WhatsApp <a href={`tel:${business.phone.replace(/\s/g,'')}`}>{business.phone}</a>. You can also visit the <Link href="/contact">contact page</Link> to send an enquiry.</>},
  {question:'Do you provide furniture installation?',answer:<>Installation details are not currently provided on this website. Please ask the workshop about installation for your specific furniture enquiry.</>},
  {question:'Which materials are available for custom furniture?',answer:<>Sample catalogue descriptions mention teak, oak, walnut, sheesham, reclaimed timber, cane, ash and upholstery fabrics. Material choices depend on the piece, so confirm options directly with the workshop.</>},
];

export default function FaqPage(){
  const whatsapp=whatsappUrl(generalEnquiryMessage);
  const webPage=webPageSchema(pageSeo.faq.path,pageSeo.faq.title,pageSeo.faq.description);
  const breadcrumb=breadcrumbSchema([{name:'Home',path:'/'},{name:'FAQs',path:'/faq'}]);
  const structuredData=webPage&&breadcrumb?[webPage,breadcrumb]:null;
  return <main className="faq-page"><JsonLd data={structuredData}/><header className="faq-hero"><div className="wrap"><span className="eyebrow">Useful answers</span><h1 className="display">Furniture questions,<br/><i>answered clearly.</i></h1><p>Details about custom furniture, materials, dimensions and contacting the workshop.</p></div></header><div className="wrap faq-content"><nav className="faq-crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>FAQs</span></nav>{questions.map(({question,answer})=><section className="faq-item" key={question}><h2>{question}</h2><p>{answer}</p></section>)}<aside className="faq-contact"><h2 className="display">Still have a question?</h2><p>Tell us what you have in mind and we’ll discuss the details.</p><div><Link className="btn" href="/contact">Contact the workshop</Link>{whatsapp&&<a className="btn btn-olive" href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp Pyne Carpenter House</a>}</div></aside></div></main>;
}

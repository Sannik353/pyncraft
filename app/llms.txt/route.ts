import {business} from '@/data/config';
import {categories} from '@/data/furniture';

export function GET(){
  const site=business.siteUrlConfigured?business.siteUrl:'';
  const link=(path:string)=>site?`${site}${path}`:path;
  const content=`# ${business.name}

> Independent carpentry and custom furniture business. The website presents sample furniture and made-to-order enquiry options.

Website: ${site||'Set NEXT_PUBLIC_SITE_URL before publishing this file.'}
Phone: ${business.phone}
WhatsApp: https://wa.me/${business.whatsapp}

## Furniture categories

${categories.map(category=>`- ${category}`).join('\n')}

## Custom furniture

Made-to-order furniture and custom carpentry enquiries can be started through the contact page or WhatsApp. Confirm materials, dimensions and project details directly with the workshop.

## Pages

- [Home](${link('/')})
- [Furniture collection](${link('/collection')})
- [About](${link('/about')})
- [Projects](${link('/projects')}) — demonstration content
- [Furniture FAQs](${link('/faq')})
- [Contact](${link('/contact')})
`;
  return new Response(content,{headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'public, max-age=3600'}});
}

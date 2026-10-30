# Pyne Carpenter House

A responsive furniture catalogue and portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion-ready architecture, and Lucide icons. This is a showcase and enquiry site; it has no cart or checkout.

## Run locally

- Install Node.js 20.9 or newer.
- Run `npm install`.
- Run `npm run dev` and open http://localhost:3000.
- Run `npm run typecheck` and `npm run build` before deployment.

## Business details

Edit `data/config.ts`. Add only verified business details. The verified WhatsApp number is stored as `919091295713` (digits only), and the click-to-call number is `+91 9091295713`. Update these centrally if they change. Optional address, city, state, postal code, country, business hours, service areas, coordinates, email, location, and social values stay blank until verified; blank values are omitted from public contact links and structured data. Set `NEXT_PUBLIC_SITE_URL` to the deployed HTTPS canonical URL before publishing. Until a valid production URL is configured, the site omits canonicals and site schemas, returns an empty sitemap, and sends `noindex`; it never publishes `localhost` or the `https://example.com` placeholder as the production URL.

## Product data and images

Edit `data/furniture.ts` to change product names, descriptions, materials, dimensions, and image references. Current images are temporary Unsplash URLs. To replace them, add client-supplied files to `public/images/furniture/` and update each `src` to `/images/furniture/your-file.jpg`. Write descriptive alt text for every image. Project gallery entries in `app/projects/page.tsx` are explicitly demonstration content; replace them with approved completed-work photographs and accurate captions before publishing.

## About and contact placeholders

The founder story and years of experience in `app/about/page.tsx` are editable prompts. Replace or remove them with approved facts. Contact form submissions open an encoded WhatsApp message; the visitor sends it in WhatsApp. No email is sent by this site.

## Deploy

Deploy to a Node-compatible host such as Vercel. Set `NEXT_PUBLIC_SITE_URL=https://your-real-domain` in the deployment environment before building; this enables canonical metadata, the sitemap, robots sitemap reference, absolute structured data, and absolute links in `/llms.txt`. Run `npm run build`, then use the host's standard Next.js deployment flow. Ensure the WhatsApp number and business details are correct before publishing.

## SEO, FAQ and AI-readable information

Page metadata, canonical URLs, Open Graph and Twitter cards are generated from `data/seo.ts`. `app/sitemap.ts` and `app/robots.ts` use `NEXT_PUBLIC_SITE_URL`. The visible FAQ is at `/faq`; answers intentionally avoid making unsupported promises. `/llms.txt` is a factual plain-text summary. The site emits organization, website, webpage, breadcrumb and sample Product schema without invented addresses, prices, ratings or inventory. Add verified local information to `data/config.ts` before expecting local business rich-result eligibility.

## Navigation and collection filters

Desktop and tablet mega menu categories and subcategories live in `data/navigation.ts`. Each destination maps to a broad catalogue category and optional subcategory query. The collection browser reads `category` and `subcategory` from `/collection` and applies both filters. Menu thumbnails are temporary Unsplash images and use the local fallback at `public/images/furniture/placeholder.svg` if loading fails.

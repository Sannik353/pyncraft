const configuredSiteUrl=process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteUrl=(()=>{
  // Invalid or local URLs never become public canonical URLs. Set NEXT_PUBLIC_SITE_URL in deployment.
  try{
    const parsed=configuredSiteUrl?new URL(configuredSiteUrl):null;
    const hostname=parsed?.hostname.toLowerCase()||'';
    const isLocal=hostname==='localhost'||hostname.endsWith('.localhost')||hostname.startsWith('127.')||['[::1]','0.0.0.0'].includes(hostname);
    return parsed&&parsed.protocol==='https:'&&!isLocal?parsed.origin:'https://example.com';
  }catch{return 'https://example.com'}
})();

export const business={
  name:'Pyne Carpenter House',
  phone:'+91 9091295713',
  whatsapp:'919091295713',
  email:'',
  siteUrl,
  siteUrlConfigured:Boolean(configuredSiteUrl&&siteUrl!=='https://example.com'),
  address:{streetAddress:'',city:'',state:'',postalCode:'',country:''},
  location:'',
  businessHours:[] as {dayOfWeek:string[];opens:string;closes:string}[],
  serviceAreas:[] as string[],
  geo:null as {latitude:number;longitude:number}|null,
  instagram:'',
  facebook:'',
};

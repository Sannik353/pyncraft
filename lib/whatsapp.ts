import {business} from '@/data/config';

export const generalEnquiryMessage='Hello Pyne Carpenter House! I would like to enquire about your furniture and carpentry services.';

export function productEnquiryMessage(productName:string){
  return `Hello Pyne Carpenter House! I am interested in ${productName}. Please share more details.`;
}

export function whatsappUrl(message:string){
  const number=business.whatsapp.replace(/\D/g,'');
  return number?`https://wa.me/${number}?text=${encodeURIComponent(message)}`:null;
}

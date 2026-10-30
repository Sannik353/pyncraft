'use client';
import {MessageCircle} from 'lucide-react';
import {generalEnquiryMessage,whatsappUrl} from '@/lib/whatsapp';

export function WhatsAppFloat(){
  const href=whatsappUrl(generalEnquiryMessage);
  if(!href)return null;
  return <a className="whatsapp-float" href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat with Pyne Carpenter House on WhatsApp"><MessageCircle size={22} aria-hidden="true"/><span>Chat with us</span><style jsx>{`.whatsapp-float{position:fixed;z-index:900;right:max(20px,env(safe-area-inset-right));bottom:max(20px,env(safe-area-inset-bottom));display:flex;align-items:center;gap:9px;padding:13px 17px;border-radius:999px;background:#536047;color:#fff;font-size:11px;letter-spacing:.04em;box-shadow:0 8px 24px #17181335;transition:background .2s,transform .2s}.whatsapp-float:hover{background:#414b37;transform:translateY(-2px)}.whatsapp-float:focus-visible{outline:3px solid #d6c5ae;outline-offset:3px}@media(max-width:480px){.whatsapp-float{right:16px;bottom:max(16px,env(safe-area-inset-bottom));padding:14px;border-radius:50%}.whatsapp-float span{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}}@media(prefers-reduced-motion:reduce){.whatsapp-float{transition:none}}`}</style></a>;
}

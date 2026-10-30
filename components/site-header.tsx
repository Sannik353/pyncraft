'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';
import {ChevronDown,Menu as MenuIcon,X} from 'lucide-react';
import {useEffect,useRef,useState} from 'react';
import {destinationHref,groupDestination,megaMenus,type MenuGroup,type MenuDestination} from '@/data/navigation';
import {SafeImage} from '@/components/safe-image';

function CategoryLink({item,onClick}:{item:MenuDestination;onClick:()=>void}){return <Link className="mega-sub-link" href={destinationHref(item)} onClick={onClick}>{item.label}</Link>}
function GroupLink({group,onClick}:{group:MenuGroup;onClick:()=>void}){const dest=groupDestination(group);return <div className="mega-group"><Link className="mega-group-title" href={destinationHref(dest)} onClick={onClick}><span className="mega-thumb"><SafeImage src={group.image} alt={group.alt} width={48} height={48} sizes="48px"/></span><span>{group.title}</span></Link>{group.subcategories?.length?<div className="mega-sublinks">{group.subcategories.map(item=><CategoryLink key={item.label} item={item} onClick={onClick}/>)}</div>:null}</div>}

export function SiteHeader(){
 const pathname=usePathname();
 const[activeMenu,setActiveMenu]=useState<string|null>(null);
 const[mobileOpen,setMobileOpen]=useState(false);
 const[mobileSection,setMobileSection]=useState<string|null>(null);
 const[scrolled,setScrolled]=useState(false);const reduceMotion=useReducedMotion();
 const closeTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const cancelClose=()=>{if(closeTimer.current){clearTimeout(closeTimer.current);closeTimer.current=null}};
 const scheduleClose=()=>{cancelClose();closeTimer.current=setTimeout(()=>{setActiveMenu(null);closeTimer.current=null},140)};
 useEffect(()=>{const update=()=>setScrolled(window.scrollY>48);update();window.addEventListener('scroll',update,{passive:true});return()=>window.removeEventListener('scroll',update)},[]);
 useEffect(()=>{const onKeyDown=(event:KeyboardEvent)=>{if(event.key==='Escape'){cancelClose();setActiveMenu(null);setMobileOpen(false);setMobileSection(null)}};window.addEventListener('keydown',onKeyDown);return()=>window.removeEventListener('keydown',onKeyDown)},[]);
 useEffect(()=>{setActiveMenu(null);setMobileOpen(false);setMobileSection(null);cancelClose()},[pathname]);
 useEffect(()=>()=>cancelClose(),[]);
 const closeMenu=()=>{cancelClose();setActiveMenu(null);setMobileOpen(false);setMobileSection(null)};
 const home=pathname==='/';
 return <header className={`site-header ${home?'home-header':''} ${scrolled||!home?'is-solid':''}`} onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
  <div className="header-bar wrap">
   <Link href="/" className="brand" aria-label="Pyne Carpenter House home" onClick={closeMenu}><span>PYNE</span><small>CARPENTER HOUSE</small></Link>
   <nav className="desktop-nav" aria-label="Main navigation">
    <Link className="plain-nav-link" href="/" onMouseEnter={()=>setActiveMenu(null)} onFocus={()=>setActiveMenu(null)}>Home</Link>
    {megaMenus.map(menu=><button key={menu.id} className={`nav-trigger ${activeMenu===menu.id?'is-active':''}`} type="button" aria-haspopup="true" aria-expanded={activeMenu===menu.id} aria-controls="mega-navigation-panel" onMouseEnter={()=>{cancelClose();setActiveMenu(menu.id)}} onFocus={()=>{cancelClose();setActiveMenu(menu.id)}} onClick={()=>{cancelClose();setActiveMenu(activeMenu===menu.id?null:menu.id)}}>{menu.label}<ChevronDown size={13} strokeWidth={1.6}/></button>)}
    <Link className="plain-nav-link" href="/about" onMouseEnter={()=>setActiveMenu(null)} onFocus={()=>setActiveMenu(null)}>About</Link>
    <Link className="plain-nav-link" href="/contact" onMouseEnter={()=>setActiveMenu(null)} onFocus={()=>setActiveMenu(null)}>Contact</Link>
   </nav>
   <button className="mobile-toggle" type="button" aria-label={mobileOpen?'Close navigation':'Open navigation'} aria-expanded={mobileOpen} onClick={()=>{setMobileOpen(!mobileOpen);setActiveMenu(null)}}>{mobileOpen?<X size={23}/>:<MenuIcon size={23}/>}</button>
  </div>
  <AnimatePresence initial={false}>{activeMenu&&<motion.div key={activeMenu} id="mega-navigation-panel" className="mega-panel" data-groups={megaMenus.find(menu=>menu.id===activeMenu)?.groups.length} role="region" aria-label={`${megaMenus.find(menu=>menu.id===activeMenu)?.label} furniture menu`} initial={{opacity:0,y:reduceMotion?0:9}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduceMotion?0:7}} transition={{duration:reduceMotion?0:.18,ease:'easeOut'}}><div className="mega-panel-inner">{megaMenus.find(menu=>menu.id===activeMenu)?.groups.map(group=><GroupLink key={group.title} group={group} onClick={closeMenu}/>)}</div></motion.div>}</AnimatePresence>
  {mobileOpen&&<nav className="mobile-panel" aria-label="Mobile navigation">
   <Link className="mobile-home" href="/" onClick={closeMenu}>Home</Link>
   {megaMenus.map(menu=><section className="mobile-menu-section" key={menu.id}><button className="mobile-accordion-trigger" type="button" aria-expanded={mobileSection===menu.id} onClick={()=>setMobileSection(mobileSection===menu.id?null:menu.id)}>{menu.label}<ChevronDown size={17} className={mobileSection===menu.id?'rotated':''}/></button>{mobileSection===menu.id&&<div className="mobile-accordion-content">{menu.groups.map(group=><div className="mobile-group" key={group.title}><Link className="mobile-group-title" href={destinationHref(groupDestination(group))} onClick={closeMenu}>{group.title}<span>View all ↗</span></Link>{group.subcategories?.map(item=><CategoryLink key={item.label} item={item} onClick={closeMenu}/>)}</div>)}</div>}</section>)}
   <Link className="mobile-home" href="/about" onClick={closeMenu}>About</Link><Link className="mobile-home" href="/contact" onClick={closeMenu}>Contact</Link><Link className="mobile-home" href="/projects" onClick={closeMenu}>Projects</Link>
  </nav>}
  <style jsx>{`
   .site-header{position:fixed;z-index:1000;inset:0 0 auto;color:#292c24;background:#f7f3eb;border-bottom:1px solid #292c2418;transition:background .25s,color .25s,box-shadow .25s}
   .site-header.home-header:not(.is-solid){background:transparent;color:#f7f3eb;border-color:transparent}
   .site-header.is-solid{background:rgba(247,243,235,.98);box-shadow:0 8px 22px #292c2410;backdrop-filter:blur(12px)}
   .header-bar{height:92px;display:flex;align-items:center;justify-content:space-between;gap:28px}
   .brand{display:flex;flex:0 0 auto;flex-direction:column;line-height:1}.brand span{font:500 27px var(--font-cormorant);letter-spacing:.14em}.brand small{font-size:8px;letter-spacing:.23em;margin-top:5px}
   .desktop-nav{display:flex;align-items:center;justify-content:flex-end;gap:clamp(11px,1.45vw,23px);height:100%;white-space:nowrap}
   .plain-nav-link,.nav-trigger{position:relative;display:inline-flex;align-items:center;gap:5px;border:0;padding:12px 0;background:none;color:inherit;font-size:10px;letter-spacing:.115em;text-transform:uppercase;cursor:pointer}
   .plain-nav-link:after,.nav-trigger:after{position:absolute;content:'';height:1px;left:0;right:100%;bottom:5px;background:#8c6548;transition:right .2s ease}
   .plain-nav-link:hover:after,.plain-nav-link:focus-visible:after,.nav-trigger:hover:after,.nav-trigger.is-active:after{right:0}
   .nav-trigger svg{transition:transform .2s}.nav-trigger.is-active svg{transform:rotate(180deg)}
   .mobile-toggle{display:none;border:0;background:none;color:inherit;padding:8px;cursor:pointer}
   .mega-panel{position:absolute;z-index:1001;top:100%;left:0;right:0;width:100%;max-height:min(72vh,700px);overflow-x:hidden;overflow-y:auto;box-sizing:border-box;background:#fbf9f4;color:#292c24;border-top:1px solid #d6c5ae;box-shadow:0 22px 45px #17181324}
   :global(.mega-panel[data-groups="6"] .mega-panel-inner){grid-template-columns:repeat(3,minmax(0,1fr))}:global(.mega-panel[data-groups="6"] .mega-group:nth-child(3n)){border-right:0}:global(.mega-panel-inner){width:min(1400px,calc(100% - 72px));margin:0 auto;padding:31px 0 38px;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:27px 24px}
   :global(.mega-group){min-width:0;border-right:1px solid #e5dfd5;padding-right:16px}:global(.mega-group:nth-child(5n)){border-right:0}
   :global(.mega-group-title){min-height:53px;display:flex;align-items:center;gap:11px;color:#292c24;font-size:13px;font-weight:600;letter-spacing:.025em;transition:color .2s}:global(.mega-group-title:hover){color:#8c6548}
   :global(.mega-thumb){position:relative;display:block;flex:0 0 48px;width:48px;height:48px;min-width:48px;min-height:48px;aspect-ratio:1/1;border-radius:50%;overflow:hidden;background:#e8e0d4}:global(.mega-thumb img){display:block!important;position:static!important;width:48px!important;height:48px!important;max-width:none;object-fit:cover}
   :global(.mega-sublinks){display:flex;flex-direction:column;gap:9px;margin:11px 0 0 59px}:global(.mega-sub-link){font-size:11px;line-height:1.35;color:#74746c;transition:color .18s,transform .18s}:global(.mega-sub-link:hover){color:#8c6548;transform:translateX(2px)}
   .mobile-panel{display:none}
   @media(max-width:1180px){.header-bar{gap:16px}.brand span{font-size:24px}.desktop-nav{gap:11px}.plain-nav-link,.nav-trigger{font-size:9px;letter-spacing:.08em}}
   @media(max-width:980px){.header-bar{height:auto;min-height:82px}.desktop-nav{gap:9px}.brand small{font-size:7px}:global(.mega-panel-inner){grid-template-columns:repeat(4,minmax(0,1fr));width:calc(100% - 48px)}:global(.mega-group:nth-child(5n)){border-right:1px solid #e5dfd5}:global(.mega-group:nth-child(4n)){border-right:0}}
   @media(max-width:720px){.header-bar{height:76px}.desktop-nav{display:none}.mobile-toggle{display:grid;place-items:center}.mobile-panel{position:fixed;display:block;top:76px;left:0;right:0;height:calc(100svh - 76px);overflow-y:auto;background:#292c24;color:#f7f3eb;padding:8px 22px 30px}.mobile-home,.mobile-accordion-trigger{width:100%;display:flex;align-items:center;justify-content:space-between;border:0;border-bottom:1px solid #ffffff26;background:none;color:inherit;padding:17px 0;font-size:11px;letter-spacing:.13em;text-align:left;text-transform:uppercase}.mobile-accordion-trigger{cursor:pointer}.mobile-accordion-trigger svg{transition:transform .2s}.mobile-accordion-trigger svg.rotated{transform:rotate(180deg)}.mobile-accordion-content{padding:6px 0 14px}.mobile-group{padding:13px 0 10px;border-bottom:1px solid #ffffff18}.mobile-group-title{display:flex;justify-content:space-between;align-items:center;margin-bottom:9px;color:#d6c5ae;font-size:12px;font-weight:600}.mobile-group-title span{font-size:9px;letter-spacing:.08em;text-transform:uppercase}.mobile-group .mega-sub-link{display:block;padding:7px 0 7px 12px;color:#e0ddd4;font-size:11px}.mega-panel{display:none}}
   @media(min-width:721px) and (max-width:980px){.header-bar{min-height:100px;padding-block:10px}.desktop-nav{flex:1;flex-wrap:wrap;justify-content:flex-end;gap:4px 13px}:global(.mega-panel-inner){grid-template-columns:repeat(3,minmax(0,1fr))}:global(.mega-group:nth-child(4n)){border-right:1px solid #e5dfd5}:global(.mega-group:nth-child(3n)){border-right:0}}
   @media(prefers-reduced-motion:reduce){.site-header,.nav-trigger svg,.plain-nav-link:after,.nav-trigger:after,.mega-sub-link,.mobile-accordion-trigger svg{transition:none}}
  `}</style>
 </header>
}




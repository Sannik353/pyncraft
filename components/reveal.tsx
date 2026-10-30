'use client';
import {ReactNode} from 'react';import {motion,useReducedMotion} from 'framer-motion';
export function Reveal({children,className}:{children:ReactNode;className?:string}){const reduced=useReducedMotion();return <motion.div className={className} initial={reduced?false:{opacity:0,y:18}} whileInView={reduced?undefined:{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.65,ease:[.22,.61,.36,1]}}>{children}</motion.div>}

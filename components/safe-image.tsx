'use client';
import Image,{ImageProps} from 'next/image';
import {useState} from 'react';

type Props=Omit<ImageProps,'src'|'onError'>&{src:string};

export function SafeImage({src,alt,...props}:Props){
  const[failedSrc,setFailedSrc]=useState<string|null>(null);
  const imageSrc=failedSrc===src?'/images/furniture/placeholder.svg':src;
  return <Image {...props} alt={alt} src={imageSrc} onError={()=>setFailedSrc(src)}/>;
}

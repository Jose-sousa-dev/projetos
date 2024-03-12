'use client'

import Image from "next/image";
import Link from "next/link";

export default function Error() {
    return (
        <>
     <h1>Ops! Esse País está com erros</h1>
     <Link className="flex items-center" href="/">
           <Image  src="/arrow-back.svg" alt="arrow" width={20} height={20}/>
           Volar
        </Link>
        </>
    );
  }
  
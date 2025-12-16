'use client'

import { useEffect, useState } from "react"
const BACKEND_URL='http://localhost:3000'
export default function Page(){
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    async function getsession(){
    const response=await fetch(`${BACKEND_URL}/auth/refresh`)
    if(response.ok){
      console.log(response);
    }
      setloading(false);
    }
    getsession();
  },[])
  if (loading) return <>loading...</>;
  return <>
    dsnfnn
  </>
}

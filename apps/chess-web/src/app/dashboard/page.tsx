'use client'

import Sidebar from "@/Components/Sidebar";
import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client";
const BACKEND_URL='http://localhost:4000'
export default function Page(){
  const {data,isPending,error,refetch}=authClient.useSession();
  useEffect(()=>{
    console.log(data)
  },[isPending])

  if (isPending) return <>loading...</>;
  return <>
  <div className="w-full h-screen max-w-4xl max-h-7xl bg-zinc-100 ">
      <div className="flex h-full">
        <Sidebar/>
      </div>
    </div>
  </>
}

'use client'

import Sidebar from "@/Components/Sidebar";
import { useEffect} from "react"
import { authClient } from "@/lib/auth";

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

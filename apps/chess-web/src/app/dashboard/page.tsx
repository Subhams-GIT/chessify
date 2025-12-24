'use client'

import Sidebar from "@/Components/Sidebar";
import { useEffect} from "react"
import { authClient } from "@/lib/auth";
import TopBar from "@/Components/TopBar";

export default function Page(){
  const data=authClient.getSession().then((data)=>{
    console.log(data)
  });
  useEffect(()=>{
    console.log(data)
  },[])

  // if (isPending) return <>loading...</>;
  return <>
  <div className="w-full h-screen grid grid-cols-2 grid-rows-1 max-w-4xl max-h-7xl bg-zinc-100 ">
      <div className="flex w-fit h-full items-center">
        <Sidebar/>
      </div>
      <div>
        <TopBar/>
      </div>
    </div>
  </>
}

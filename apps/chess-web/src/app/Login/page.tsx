'use client'

import { authClient } from "@/lib/auth";

export default function Page() {

  return (
    <div className="w-full h-full flex justify-center items-center">
    <div className="bg-white flex flex-col justify-center items-center shadow-2xl w-fit h-fit p-4 rounded-3xl ">
      <span className="font-stretch-150% font-serif">Sign in Using Google</span>
      <button onClick={()=>authClient.signIn.social({provider:"google"})} className="bg-green-500 px-2 w-fit m-auto py-3 rounded-3xl shadow-2xl hover:pointer">sign in with google</button>
    </div>
      
    </div>
  );
}

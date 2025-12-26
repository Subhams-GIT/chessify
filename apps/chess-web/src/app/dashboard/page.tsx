"use client";
import Sidebar from "@/Components/Sidebar";
import { useEffect } from "react";
import { authClient } from "@/lib/auth";
import TopBar from "@/Components/TopBar";
import { useUser } from "@/Store/store";
export default function Page() {
  const { setuser } = useUser();
  useEffect(() => {
    const getSession = async () => {
      const { data } = await authClient.getSession();
      if (data?.user) setuser(data.user);
      console.log(data);
    };
    getSession();
  }, []);

  return (
    <>
      <div className="w-screen h-screen max-w-full max-h-full bg-zinc-100 grid grid-cols-[200px_3fr]">
        <div className="h-full flex flex-col">
          <Sidebar />
        </div>
        <div className="h-full w-full flex flex-col px-3">
          <TopBar />
        </div>
      </div>
    </>
  );
}

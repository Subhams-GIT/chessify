"use client";

import Sidebar from "@/Components/Sidebar";
import TopBar from "@/Components/TopBar";
import { authClient } from "@/lib/auth";
import { useUser } from "@/Store/store";
import { LoaderPinwheelIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const { setuser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data } = await authClient.getSession();

        const session = data?.session;
        const user = data?.user;

        if (user && session) {
          setuser(user);
        }
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, [setuser]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <LoaderPinwheelIcon className="text-black animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen max-w-full max-h-full bg-zinc-100 grid grid-cols-[200px_3fr]">
      <div className="h-full flex flex-col">
        <Sidebar />
      </div>
      <div className="h-full w-full flex flex-col px-3">
        <TopBar />
      </div>
    </div>
  );
}

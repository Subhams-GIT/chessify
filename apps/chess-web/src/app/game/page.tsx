'use client'
import { useEffect } from "react";
import useWindow from "@/useWindow";
import { DesktopLayout, } from "@/Components/Desktop";
import { TabletLayout } from "@/Components/Tablet";
import { MobileLayout } from "@/Components/Mobile";

const page = () => {
  const windowWidth=useWindow();
  if(windowWidth<=1024) return <MobileLayout/>
  else return <DesktopLayout/>
};

export default page;

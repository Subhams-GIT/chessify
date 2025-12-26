import React from "react";
import "../app/globals.css";
import { useUser } from "@/Store/store";
import Image from "next/image";
import { ChevronDown, MoveDownIcon} from "lucide-react";
const link =
  "https://wallpapers.com/images/hd/cool-profile-picture-minion-13pu7815v42uvrsg.jpg";
const TopBar = () => {
  const { user } = useUser();
  return (
    <div className="w-full flex justify-between items-center ">
      <section className="">
        <div className="inter-font text-4xl">Dashboard Overview</div>

        <section className="text-md">Welcome back,Alex</section>
      </section>
      <section className="bg-white rounded-3xl mx-3 px-2 py-1 shadow-2xl">
        <div className=" flex rounded-2xl justify-center items-center gap-x-2">
          <img src={user.image || link} className="w-10 h-10 rounded-full " alt="profile" />
          <section className="flex flex-col justify-center items-center">
            <span className="text-md">{user.name || "Guest"}</span>
          </section>
          <ChevronDown className="text-gray-400"/>
        </div>
      </section>
    </div>
  );
};

export default TopBar;

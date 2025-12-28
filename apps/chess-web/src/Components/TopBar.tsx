'use client'
import "../app/globals.css";
import { useUser } from "@/Store/store";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import List from "./List";

const TopBar = () => {
  const { user } = useUser();
  const [isListOpen, setIsListOpen] = useState(false);

  return (
    <div className="w-full flex justify-between items-center relative" >
      <section>
        <div className="inter-font text-4xl">Dashboard Overview</div>
        <section className="text-md">Welcome back, {user.name}</section>
      </section>

      <section className="bg-white rounded-3xl mx-3 px-2 py-1 shadow-2xl relative">
        <div className="flex rounded-2xl items-center gap-x-2">
          <img
            src={user.image!}
            className="w-10 h-10 rounded-full"
            alt="profile"
          />

          <span className="text-md">{user.name || "Guest"}</span>

          <ChevronDown
            className="text-gray-400 cursor-pointer"
            onClick={() => setIsListOpen(prev => !prev)}
          />
        </div>

        {isListOpen && <List isListOpen={isListOpen}  />}
      </section>
    </div>
  );
};

export default TopBar;

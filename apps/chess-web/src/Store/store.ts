import { create } from "zustand";

export type user = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
  username:string|undefined
};

interface userStore {
  user: user;
  isMobileOpen: boolean;
  setuser: (user: user) => void;
  gamesPlayed:number,
  badgesEarned:number,
  updateUser:()=>void,
}

export const useUser = create<userStore>((set) => ({
  user: { id: "", emailVerified: false, email: "", name: "", image: "" ,createdAt:new Date(),updatedAt:new Date(),username:''},
  gamesPlayed:125,
  badgesEarned:0,
  setuser: (u) => set((state: userStore)=>{
    if(state.user.id===u.id) return {};
    return {user: u};
  }),
  isMobileOpen: false,
  updateUser:()=>set({})
}));

import { create } from "zustand";

export type user = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
};

interface userStore {
  user: user;
  isMobileOpen: boolean;
  setuser: (user: user) => void;
}

export const useUser = create<userStore>((set) => ({
  user: { id: "", emailVerified: false, email: "", name: "", image: "" ,createdAt:new Date(),updatedAt:new Date()},
  setuser: (u) => set((state: userStore)=>{
    if(state.user.id===u.id) return {};
    return {user: u};
  }),
  isMobileOpen: false,
}));

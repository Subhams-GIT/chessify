import { create } from "zustand";

export type user = {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  image: string;
};

interface userStore {
  user: user;
  isMobileOpen: boolean;
  setuser: (user: user) => void;
}

export const useUser = create<userStore>((set) => ({
  user: { id: "", emailVerified: false, email: "", name: "", image: "" },
  setuser: (u) => set({ user: u }),
  isMobileOpen: false,
}));

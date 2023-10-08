import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session, User } from "@supabase/supabase-js";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  session: Session | null;
  setSession: (session: Session | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      session: null,
      isLoggedIn: false,
      isOnboarded: false,
      setUser: (user: User | null) => set((state) => ({ user })),
      setIsLoggedIn: (isLoggedIn: boolean) => set((state) => ({ isLoggedIn })),
      setSession: (session: Session | null) => set((state) => ({ session })),
    }),
    {
      name: "rn-travel-user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (userId) => {
    if (!userId) return set({ currentUser: null, isLoading: false });

    try {
      const docRef = doc(db, "user details", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.error(err);
      return set({ currentUser: null, isLoading: false });
    }
  },
}));

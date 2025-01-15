import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { UserDetailsType } from "@/types/UserDetails";
import { db } from "@/firebase/firebase";

export const addUserDetails = async (
  userDetails: Omit<UserDetailsType, 'id'>
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "user details"), userDetails);
    return docRef.id;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const getUserDetails = async (
  userId: string
): Promise<UserDetailsType[]> => {
  try {
    const q = query(
      collection(db, "user details"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as UserDetailsType)
    );
  } catch (error) {
    console.error("Error getting user tasks:", error);
    throw error;
  }
};

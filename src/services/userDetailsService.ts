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
  setDoc,
} from "firebase/firestore";
import { UserDetailsType } from "@/types/UserDetails";
import { db } from "@/firebase/firebase";

export const addUserDetails = async (userDetails: UserDetailsType) => {
  try {
    await setDoc(doc(db, "user details", userDetails.userId), userDetails);

    await setDoc(doc(db, "userchats", userDetails.userId), { chats: [] });
  } catch (error) {
    console.error("Error adding user details:", error);
    throw error;
  }
};

export const updateUserDetails = async (
  detailsId: string,
  updates: Partial<UserDetailsType>
): Promise<void> => {
  try {
    await updateDoc(doc(db, "user details", detailsId), updates);
  } catch (error) {
    console.error("Error updating user details: ", error);
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
    console.error("Error getting user details:", error);
    throw error;
  }
};

export const getUserById = async (userId: string) => {
  const userDoc = doc(db, "user details", "IbwRYweaPzIpmTh9mIAK");
  const docSnap = await getDoc(userDoc);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("No such document!");
  }
};

import { db } from "@/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const fetchUsersWithLocation = async () => {
  const q = query(collection(db, "user details"), where("location", "!=", ""));
  const querySnapshot = await getDocs(q);
  const usersWithLocation = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return usersWithLocation;
};

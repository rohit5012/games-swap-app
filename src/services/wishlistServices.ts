import { db } from "@/firebase/firebase";
import { GameListItem } from "@/types/GameListItem";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export const createWishlist = async (userID: string) => {
  try {
    const docRef = await addDoc(collection(db, "wishlists"), {
      userId: userID,
    });
    return docRef;
  } catch (error) {
    console.error("error creating wishlist");
  }
};

export const updateWishlist = async (userId: string, newGame: GameListItem) => {
  try {
    // Fetch the user's wishlist
    const wishlists = await fetchWishlist(userId);

    if (wishlists.length === 0) {
      throw new Error("No wishlist found for the given user ID.");
    }

    // Assuming each user has one wishlist, take the first one
    const wishlist = wishlists[0];
    await updateDoc(doc(db, "wishlists", wishlist.id), {
      [`games.${newGame.slug}`]: {
        gameName: newGame.gameName,
        backgroundImg: newGame.backgroundImg,
        releaseDate: newGame.releaseDate,
        slug: newGame.slug,
      },
    });
  } catch (error) {
    console.error("Error updating wishlist:", error);
    throw error; // Optional: Re-throw the error if you want to handle it upstream
  }
};

export const fetchWishlist = async (userId: string) => {
  try {
    const wishlistsRef = collection(db, "wishlists");
    const q = query(wishlistsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const wishlists = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return wishlists;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};

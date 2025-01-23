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

export const createOwnedGamesList = async (userID: string) => {
  try {
    const docRef = await addDoc(collection(db, "ownedGames"), {
      userId: userID,
    });
    return docRef;
  } catch (error) {
    console.error("error creating owned games list");
  }
};

export const updateOwnedGamesList = async (
  userId: string,
  newGame: GameListItem
) => {
  try {
    // Fetch the user's owned games list
    const ownedList = await fetchOwnedList(userId);

    if (ownedList.length === 0) {
      throw new Error("No owned games list found for the given user ID.");
    }

    // Assuming each user has one owned list, take the first one
    const userOwnedList = ownedList[0];
    await updateDoc(doc(db, "ownedGames", userOwnedList.id), {
      [`games.${newGame.slug}`]: {
        gameName: newGame.gameName,
        backgroundImg: newGame.backgroundImg,
        releaseDate: newGame.releaseDate,
        slug: newGame.slug,
        lendable: false,
      },
    });
  } catch (error) {
    console.error("Error updating owned list:", error);
    throw error; // Optional: Re-throw the error if you want to handle it upstream
  }
};

export const fetchOwnedList = async (userId: string) => {
  try {
    const ownedListRef = collection(db, "ownedGames");
    const q = query(ownedListRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const ownedList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return ownedList;
  } catch (error) {
    console.error("Error fetching owned games list:", error);
    throw error;
  }
};

export const updateOwnedGame = async (userId: string, slug: string) => {
  try {
    const ownedListRef = collection(db, "ownedGames");
    const q = query(
      ownedListRef,
      where("userId", "==", userId),
      where("slug", "==", slug)
    );
    const qSnapshot = await getDocs(q);
    const lendGame = qSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return lendGame;
  } catch (error) {
    console.error("Error updating owned game", error);
    throw error;
  }
};

export const toggleLendable = async (userId: string, slug: string) => {
  try {
    // Fetch the user's owned games list
    const ownedList = await fetchOwnedList(userId);

    if (ownedList.length === 0) {
      throw new Error("No owned games list found for the given user ID.");
    }

    // Assuming each user has one owned list, take the first one
    const userOwnedList = ownedList[0];
    const game = userOwnedList.games?.[slug];

    if (!game) {
      throw new Error(
        `Game with slug "${slug}" not found in owned games list.`
      );
    }

    // Toggle the lendable property
    const updatedLendableStatus = !game.lendable;

    // Update the game in Firestore
    await updateDoc(doc(db, "ownedGames", userOwnedList.id), {
      [`games.${slug}.lendable`]: updatedLendableStatus,
    });

    return updatedLendableStatus;
  } catch (error) {
    console.error("Error toggling lendable status:", error);
    throw error;
  }
};



export const removeFromOwnedlist = async (userId: string, gameSlug: string) => {
  try {
    // Reference the user's wishlist document
    const wishlistsRef = collection(db, "ownedGames");
    const q = query(wishlistsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("No OwnedList found for the user.");
    }

    // Assuming a user has a single wishlist document
    const wishlistDoc = querySnapshot.docs[0];
    const wishlistDocRef = doc(db, "ownedGames", wishlistDoc.id);

    // Fetch the current wishlist data
    const wishlistData = wishlistDoc.data();
    
    if (!wishlistData?.games || !wishlistData.games[gameSlug]) {
      throw new Error("Game not found in wishlist.");
    }

    // Remove the game from the games object
    const updatedGames = { ...wishlistData.games };
    delete updatedGames[gameSlug];  // Delete the game by its slug

    // Update the wishlist document with the updated games
    await updateDoc(wishlistDocRef, {
      games: updatedGames, // Set the new updated games object
    });
    return true;
  } catch (error) {
    console.error("Error removing game from wishlist:", error);
    throw error;
  }
};
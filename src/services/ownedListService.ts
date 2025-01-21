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
  console.log("this is the user ID:" + userID);
  try {
    const docRef = await addDoc(collection(db, "ownedGames"), {
      userId: userID,
    });
    return docRef;
  } catch (error) {
    console.log("error creating owned games list");
  }
};

export const updateOwnedGamesList = async (
  userId: string,
  newGame: GameListItem
) => {
  try {
    console.log("Fetching owned list for user ID:", userId);

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

    console.log("Game added to owned list successfully.");
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
    // console.log(ownedList);
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
    console.log(lendGame);
    return lendGame;
  } catch (error) {
    console.error("Error updating owned game", error);
    throw error;
  }
};





export const toggleLendable = async (userId: string, slug: string) => {
  try {
    console.log("Toggling lendable status for user ID:", userId, "and game slug:", slug);

    // Fetch the user's owned games list
    const ownedList = await fetchOwnedList(userId);

    if (ownedList.length === 0) {
      throw new Error("No owned games list found for the given user ID.");
    }

    // Assuming each user has one owned list, take the first one
    const userOwnedList = ownedList[0];
    const game = userOwnedList.games?.[slug];

    if (!game) {
      throw new Error(`Game with slug "${slug}" not found in owned games list.`);
    }

    // Toggle the lendable property
    const updatedLendableStatus = !game.lendable;

    // Update the game in Firestore
    await updateDoc(doc(db, "ownedGames", userOwnedList.id), {
      [`games.${slug}.lendable`]: updatedLendableStatus,
    });

    console.log(`Lendable status updated successfully for game "${slug}".`);
    return updatedLendableStatus;
  } catch (error) {
    console.error("Error toggling lendable status:", error);
    throw error;
  }
};


import { db } from "@/firebase/firebase"
import { GameListItem } from "@/types/GameListItem"
import { addDoc, collection, doc, updateDoc, query, where, getDocs } from "firebase/firestore"


export const createWishlist = async (userID: string) => {
    console.log("this is the user ID:" + userID)
    try {
        const docRef = await addDoc(collection(db, "wishlists"), {userId: userID})
        return docRef
    }
    catch(error){
        console.log("error creating wishlist")
    }
}

export const updateWishlist = async (userId: string, newGame: GameListItem) => {

    try {
        console.log("Fetching wishlist for user ID:", userId);

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

        console.log("Game added to wishlist successfully.");
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
        console.log(wishlists)
        return wishlists;
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        throw error; 
    }
};




import { db } from "@/firebase/firebase"
import { GameListItem } from "@/types/GameListItem"
import { addDoc, collection, doc, updateDoc, query, where, getDocs } from "firebase/firestore"

export const createGamesOwned = async (userID: string) => {
    console.log("this is the user ID:" + userID)
    try {
        const docRef = await addDoc(collection(db, "gamesOwned"), {userId: userID})
        return docRef
    }
    catch(error){
        console.log("error creating wishlist")
    }
}
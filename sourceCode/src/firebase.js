import { initializeApp } from "firebase/app";
import {firebaseKeys} from './firebaseKeys'
import {collection, getFirestore, query, onSnapshot, doc, getDocs} from "firebase/firestore";

const firebaseConfig = {
    apiKey: firebaseKeys.FIREBASE_API_KEY,
    authDomain: firebaseKeys.FIREBASE_AUTH_DOMAIN,
    projectId: firebaseKeys.FIREBASE_PROJECT_ID,
    storageBucket: firebaseKeys.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: firebaseKeys.FIREBASE_MESSAGING_SENDER_ID,
    appId: firebaseKeys.FIREBASE_APP_ID
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export function getMessages() {
    const messages = []

    const q = query(collection(db, "messages"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            messages.push(doc.data());
        })
    });
    return messages
}





window.apiKey = firebaseConfig.apiKey
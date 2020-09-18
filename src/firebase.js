import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDoEVev31qiDydow19N9P9BXc7ye4ldzaA",
  authDomain: "instagram-clone-82d5f.firebaseapp.com",
  databaseURL: "https://instagram-clone-82d5f.firebaseio.com",
  projectId: "instagram-clone-82d5f",
  storageBucket: "instagram-clone-82d5f.appspot.com",
  messagingSenderId: "655388872609",
  appId: "1:655388872609:web:c9544bea68334ecc2885e0",
  measurementId: "G-BY7DFMSFFJ",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

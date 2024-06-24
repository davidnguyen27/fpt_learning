import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbY-4mHRAkX5vW8l2ZrbxJdnjMgHeroyA",
  authDomain: "course-learning-d9747.firebaseapp.com",
  projectId: "course-learning-d9747",
  storageBucket: "course-learning-d9747.appspot.com",
  messagingSenderId: "760684283126",
  appId: "1:760684283126:web:8dc722355c82b0bcd358d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbY-4mHRAkX5vW8l2ZrbxJdnjMgHeroyA",
  authDomain: "course-learning-d9747.firebaseapp.com",
  projectId: "course-learning-d9747",
  storageBucket: "course-learning-d9747.appspot.com",
  messagingSenderId: "760684283126",
  appId: "1:760684283126:web:8dc722355c82b0bcd358d7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app as default };

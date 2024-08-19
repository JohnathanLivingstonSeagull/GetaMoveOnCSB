import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0_xo1J3TQ9OZdN-udkb4lgQ5afjoP6CU",
  authDomain: "getamoveon-46c2c.firebaseapp.com",
  projectId: "getamoveon-46c2c",
  storageBucket: "getamoveon-46c2c.appspot.com",
  messagingSenderId: "418214493360",
  appId: "1:418214493360:web:39f049e8ae7f29bfb00f75",
  measurementId: "G-TZRF94DB8D",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

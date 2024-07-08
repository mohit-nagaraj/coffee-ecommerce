// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLujxIc_ku9yFCwZAtmwmkQjy-g3B_YFw",
  authDomain: "hackprep-deb59.firebaseapp.com",
  projectId: "hackprep-deb59",
  storageBucket: "hackprep-deb59.appspot.com",
  messagingSenderId: "398068371459",
  appId: "1:398068371459:web:6b8cc52b1cd390b9f4be36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
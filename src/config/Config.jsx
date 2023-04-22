import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBjdNnUal8brCSswmJx8qAW3rPRu3utSrU",
  authDomain: "ecommerce-app-with-react-657f7.firebaseapp.com",
  projectId: "ecommerce-app-with-react-657f7",
  storageBucket: "ecommerce-app-with-react-657f7.appspot.com",
  messagingSenderId: "543095575471",
  appId: "1:543095575471:web:800a037c4715e61420d55a"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export {auth,firestore,storage};

/*-----------------------------------*/
/* --------Bilgilendirme Amaçlı----- */
/*-----------------------------------*/

//firebase npm i firebase@9.0.0 sürümünde firebase/compat/app şeklinde uzantı yolu yapılmalı 
/* Önce: sürüm 8 (Eski)

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
Sonra: sürüm 9 uyumluluğu (Yeni)

// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 

bibliography: stackoverflow
link: https://stackoverflow.com/questions/68929593/vue-2-export-default-imported-as-firebase-was-not-found-in-firebase-app
*/
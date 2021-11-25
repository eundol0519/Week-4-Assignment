// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// 할당량 최대치 갈 때마다 프로젝트 삭제 하고 새로 만들어서 바꿔줘야 함
const firebaseConfig = {
  apiKey: "AIzaSyAuLSgmuEkhE0bI8HVcYC_HJab2MFgwbvs",
  authDomain: "dictionary-5e1c5.firebaseapp.com",
  projectId: "dictionary-5e1c5",
  storageBucket: "dictionary-5e1c5.appspot.com",
  messagingSenderId: "754058010407",
  appId: "1:754058010407:web:1c774be533f20259b11302",
  measurementId: "G-Q55JDJQKKQ"
};

initializeApp(firebaseConfig);

export const db = getFirestore();
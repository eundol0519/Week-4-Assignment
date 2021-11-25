// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// 할당량 최대치 갈 때마다 프로젝트 삭제 하고 새로 만들어서 바꿔줘야 함
const firebaseConfig = {
  apiKey: "AIzaSyAX6unk5hzyYOSzuemdWUt6q-UdbJg40ck",
  authDomain: "dictionary-a59f3.firebaseapp.com",
  projectId: "dictionary-a59f3",
  storageBucket: "dictionary-a59f3.appspot.com",
  messagingSenderId: "651413873189",
  appId: "1:651413873189:web:2041d2b3d5dcc8ab5b55cc",
  measurementId: "G-EVP6STN112"
};

initializeApp(firebaseConfig);

export const db = getFirestore();
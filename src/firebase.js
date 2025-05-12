
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDIU5hMCUU_1BFxBfL-OzjMpsaPQ_XU95U",
  authDomain: "student-management-3f11b.firebaseapp.com",
  projectId: "student-management-3f11b",
  storageBucket: "student-management-3f11b.firebasestorage.app",
  messagingSenderId: "743260632927",
  appId: "1:743260632927:web:a4bddcf69976af199f28ea",
  measurementId: "G-0CXV8945RC"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();







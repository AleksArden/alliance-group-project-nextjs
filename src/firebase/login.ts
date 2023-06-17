import firebase_app from './config';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

const auth = getAuth(firebase_app);

const login = async (email: string, password: string) => {
  let error = null;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }
  return { error };
};
export default login;

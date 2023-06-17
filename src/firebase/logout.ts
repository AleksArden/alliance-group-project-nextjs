import firebase_app from './config';
import { signOut, getAuth } from 'firebase/auth';

const auth = getAuth(firebase_app);

const logout = async () => {
  signOut(auth);
};
export default logout;

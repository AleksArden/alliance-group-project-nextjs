import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import firebase_app from '../firebase/config';
import { CurrentAdmin } from 'types/types';
const auth = getAuth(firebase_app);

const AuthContext = createContext<CurrentAdmin | null>(null);
export const useAuthContex = () => useContext(AuthContext);

export const AuthContexProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<CurrentAdmin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

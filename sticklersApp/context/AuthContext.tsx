// context/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { Profile } from "@/types/userCache";

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    let unsubscribeProfile: (() => void) | null = null;
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);

      if(!firebaseUser){
        setProfile(null);
        setLoading(false)
        return;
      }

      const profileRef = doc(db, "users", firebaseUser.uid);
      unsubscribeProfile = onSnapshot(profileRef, (snap) => {
        if(snap.exists()){
          setProfile({
            id: snap.id,
            ...snap.data(),
            birthday: snap.data().birthday?.toDate() ?? null
          } as Profile)
        }
        else {
          setProfile(null);
        }
        setLoading(false);
      });
    });

    return () => {
      unsubscribeAuth();
      if(unsubscribeProfile) unsubscribeProfile();
    }

  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside provider");
  return ctx;
};
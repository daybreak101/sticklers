// context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, onIdTokenChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebaseConfig";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { Profile } from "@/types/userCache";

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;
    //maybe change back to onAuthStateChanged
    const unsubscribeAuth = onIdTokenChanged(auth, async (firebaseUser) => {
      console.log("AUTH CHANGED: ", firebaseUser);
      setLoading(true);
      setUser(auth.currentUser);

      if (!firebaseUser) {
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }
      const profileRef = doc(db, "users", firebaseUser.uid);
      unsubscribeProfile = onSnapshot(profileRef, (snap) => {
        if (snap.exists()) {  
          setProfile({
            id: snap.id,
            ...snap.data(),
            birthday: snap.data().birthday?.toDate() ?? null,
          } as Profile);
    
        } else {
          setProfile(null);
        }
        setLoading(false);
      });
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  const refreshUser = async () => {
    const current = auth.currentUser;
    if (!current) return;

    await current.reload();
    await current.getIdToken(true);

    setUser(auth.currentUser);

    console.log("REFRESHED USER:", auth.currentUser);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside provider");
  return ctx;
};

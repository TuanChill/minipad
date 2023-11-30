import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../libs/firebase";
// import { useNavigate } from "react-router-dom";

export interface IAuthenUser {
  uid: string;
  email?: string | null;
  photoURL: string | null;
  displayName: string | null;
}

interface IAuthenContext {
  user: IAuthenUser | null;
}

export const AuthenContext = createContext<IAuthenContext>({
  user: null,
});

interface AuthenProviderProps {
  children: JSX.Element | JSX.Element[];
}

export default function AuthProvider({ children }: AuthenProviderProps) {
  const [authInfo, setAuthInfo] = useState<IAuthenContext>({
    user: null,
  });

  // const navigate = useNavigate();

  useEffect(() => {
    // observer auth 
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setAuthInfo({
          user: {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
          },
        });
        // navigate("/app/pad");
      } else {
        setAuthInfo({
          user: null,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <AuthenContext.Provider value={authInfo}>{children}</AuthenContext.Provider>
  );
}

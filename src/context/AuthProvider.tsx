import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";

interface IAuthenUser {
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setAuthInfo({
          user: {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
          },
        });
      } else {
        setAuthInfo({
          user: null,
        });
      }
    });
    return unsubscribe();
  }, []);
  return (
    <AuthenContext.Provider value={authInfo}>{children}</AuthenContext.Provider>
  );
}

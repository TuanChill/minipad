import {useEffect, useState, createContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config';

export interface IAuthenUser {
  email: string | null;
  displayName: string | null;
  uid: string;
  photoURL: string | null;
}

interface IAuthenContext {
  user: IAuthenUser | null ;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const AuthContext = createContext<IAuthenContext>({
  user: null
});

export default function AuthProvider({children} : Props) {
  const [user, setUser] = useState<IAuthenContext>({
    user: null
  })
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged( (userInfo) => {
      console.log(userInfo)
      if(userInfo) {
        setUser({
          user: {
            displayName: userInfo?.displayName ?? null,
            email: userInfo?.email ?? null,
            uid: userInfo?.uid ?? '',
            photoURL: userInfo?.photoURL ?? null
          }
        })
      } else {
        setUser({
          user: null
        });
        navigate("/login");
      }
    })
  
    return () => {
      unsubscribed()
    }
  }, [])
  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}

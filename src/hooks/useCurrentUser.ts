import { useEffect, useState } from "react";
import { getUser, IUser } from "../services/users";
import { useAuth } from "./useAuth";

export const useCurrentUser = (): IUser | null  => {
  const { user } = useAuth();
  const [info, setInfo] = useState<IUser | null>(null);

  useEffect(() => {
    if (user) {
      getUser(user?.uid).then((result) => {
        const nUser = {
          ...result,
          uid: user.uid
        } as IUser
        setInfo(nUser)
      });
    } else {
      setInfo(null);
    }
  }, [user]);

  return info
};

import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export const useAuth = () => {
    const authUser = useContext(AuthContext);
    return authUser;
  };
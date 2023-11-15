import { useContext } from "react";
import { AuthenContext } from "../context/AuthProvider";

export const useAuth = () => {
    const authUser = useContext(AuthenContext);
    return authUser;
  };
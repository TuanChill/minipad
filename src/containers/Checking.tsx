import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Checking() {
  const {user} = useAuth();

  console.log(user)

  if(user) return <Navigate to={"/app/pad"} />

  return <Navigate to="/login" />
}

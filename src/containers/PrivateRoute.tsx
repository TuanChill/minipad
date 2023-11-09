import { Navigate } from "react-router-dom";
import { getAuthCache } from "./localAuth";

interface IPrivateRouteProps {
  children: JSX.Element | JSX.Element[];
}

export default function PrivateRoute({ children }: IPrivateRouteProps) {
  const user = getAuthCache();
  console.log(user);

  console.log(!user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

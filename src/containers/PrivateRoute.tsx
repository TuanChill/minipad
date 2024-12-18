import { Navigate } from "react-router-dom";
import { getAuthCache } from "./localAuth";
import { isEmptyObject } from "../utils";
import React from "react";

interface IPrivateRouteProps {
  children: JSX.Element | JSX.Element[];
}

export default function PrivateRoute({ children }: IPrivateRouteProps) {
  // get user in cache
  const user = getAuthCache();
  
  // check user
  if (isEmptyObject(user)) {
    return <Navigate to="/login" replace />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

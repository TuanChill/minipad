import { useEffect } from "react";
import { auth } from "../../../libs/firebase";
import { useNavigate } from "react-router-dom";
import { rmAuthCache } from "../../../containers/localAuth";
import { logOut } from "../../../services/sign";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    auth.signOut().then(
      () => {
        navigate("/login");
        logOut();
        rmAuthCache();
      },
      () => {
        navigate("/login");
        logOut();
        rmAuthCache();
      }
    );
  }, [navigate]);

  return <></>;
}

import { useEffect } from "react";
import { auth } from "../../../libs/firebase";
import { useNavigate } from "react-router-dom";
import { rmAuthCache } from "../../../containers/localAuth";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    auth.signOut().then(
      () => {
        navigate("/login");
        rmAuthCache();
      },
      () => {
        navigate("/login");
        rmAuthCache();
      }
    );
  }, [navigate]);

  return <></>;
}

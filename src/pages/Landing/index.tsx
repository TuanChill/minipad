import { useAuth } from "../../hooks/useAuth";
import HeaderLanding from "../../layouts/components/HeaderLanding";

export default function LandingPage() {
  const {user} = useAuth()
  // console.log(user)
  return (
    <div>
        <HeaderLanding />
    </div>
  )
}

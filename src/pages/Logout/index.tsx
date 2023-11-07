import { useEffect } from "react"
import { auth } from "../../firebase/config"
import { useNavigate } from "react-router-dom"

export default function Logout() {
    const navigate = useNavigate()
    useEffect(() => {
      auth.signOut().then(
        () => {
            navigate("/login")
        },
        () => {
            navigate("/login")
        }
      )
    }, [navigate])
    
  return (
    <></>
  )
}

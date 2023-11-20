import { useEffect } from "react";
import { useLocation } from "react-router-dom"

export default function SectionScroll({children} : {
    children: JSX.Element | JSX.Element[]
}) {
    const location = useLocation();
    // move to section by get id section in url path
    useEffect(() => {
        const elementSection = document.getElementById(location.hash.slice(1)) || null ;
        if(elementSection) {
            elementSection.scrollIntoView({ behavior: "smooth", block: "center"})
        }
    }, [location])
  return (
    <>
        {children}
    </>
  )
}

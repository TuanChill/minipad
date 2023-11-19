import { useEffect } from "react";
import { useLocation } from "react-router-dom"

export default function SectionScroll({children} : {
    children: JSX.Element | JSX.Element[]
}) {
    const location = useLocation();
    useEffect(() => {
        const elementSection = document.querySelector(location.hash);
        console.log(location.hash);
        console.log(elementSection)
        if(elementSection) {
            elementSection.scrollIntoView({ behavior: "smooth", block: "center"})
        }
        console.log(location);
    }, [location])
  return (
    <>
        {children}
    </>
  )
}

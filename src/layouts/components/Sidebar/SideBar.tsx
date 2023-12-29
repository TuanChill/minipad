import { useCallback, useEffect, useRef, useState } from "react";
import UserInfo from "../../../components/UserInfo";
import Header from "./Header";
import DocumentList from "../../../components/DocumentList";
import useWindowDimensions from "../../../hooks/useWindowDemensions";

import "./index.css";

export default function SideBar() {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(300);

  const {width} = useWindowDimensions();

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  // handle resize event
  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing && sidebarRef?.current) {
        setSidebarWidth(
          mouseMoveEvent.clientX - sidebarRef.current.getBoundingClientRect().left
        );
      }
    },
    [isResizing]
  );

  // get event listener
  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  useEffect(() => {
    if(width < 1200) {
      setSidebarWidth(250);
    }
  }, [width])
  
  return (
    <div
      ref={sidebarRef}
      className="app-sidebar"
      style={{ width: sidebarWidth }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <div className="app-sidebar-content" >
        <Header />
        <DocumentList />
        <UserInfo />
      </div>
      <div className={`app-sidebar-resizer ${width < 1240 && "hidden"}`} onMouseDown={startResizing} />
    </div>
  );
}

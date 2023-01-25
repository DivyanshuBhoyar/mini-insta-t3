import { useState, useEffect } from "react";

export function useScreenSize() {
  const [isMd, setIsMd] = useState(window.innerWidth > 992);

  useEffect(() => {
    function handleResize() {
      setIsMd(window.innerWidth > 992);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMd;
}

import { useState, useEffect } from "react";
import { TABLET_BREAKPOINT } from "../config/layout";

export function useIsTablet(): boolean {
  const [isTablet, setIsTablet] = useState(
    typeof window !== "undefined" ? window.innerWidth >= TABLET_BREAKPOINT : false
  );

  useEffect(() => {
    const handler = () => setIsTablet(window.innerWidth >= TABLET_BREAKPOINT);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return isTablet;
}

import { useEffect, useState } from "react";

export const useHook = () => {
  var initialWidth = 0;
  if (typeof window !== "undefined") {
    initialWidth = window.screen.width;
  }
  const [width, setWidth] = useState<number>(initialWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };
  }, [width]);
  return {
    width,
  };
};

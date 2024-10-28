import { useState, useRef, useEffect } from "react";

export const useClickOutside = (initialValue: boolean) => {
  const [isActive, setIsActive] = useState(initialValue);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isActive, setIsActive };
};

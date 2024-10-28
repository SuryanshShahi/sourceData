import { GlobalContext } from "@/contexts";
import { useContext, useEffect, useRef } from "react";

const useScrollHeight = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { setData } = useContext(GlobalContext);

  const handleScroll = () => {
    if (ref.current) {
      const position = ref.current.scrollTop;
      setData({ scrollHeight: position });
    }
  };

  useEffect(() => {
    const div = ref.current;
    if (div) {
      div.addEventListener("scroll", handleScroll);
      setData({ scrollHeight: div?.scrollTop });
    }
    return () => {
      if (div) {
        div.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  return { ref };
};

export default useScrollHeight;

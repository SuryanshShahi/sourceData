"use client";
import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
import Footer from "../footer";
import Header from "../header";
interface IPageWraps {
  wrapperClass?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

const PageWrapper: FC<PropsWithChildren<IPageWraps>> = ({
  children,
  wrapperClass,
  hideHeader,
  hideFooter,
}) => {
  // const scroll = useScrollHeight();
  return (
    <main className="h-full">
      {!hideHeader && <Header />}
      <div
        // ref={scroll?.ref}
        className={clsx(
          "animate-bottom overflow-scroll relative h-full max-[1024px]:p-5 pb-5",
          hideHeader
            ? "max-h-[calc(100vh-32px)]"
            : "lg:max-h-[calc(100vh-93px)] max-h-[calc(100vh-64px)]",
          wrapperClass
        )}
      >
        {children}
      </div>
      {!hideFooter && <Footer />}
    </main>
  );
};

export default PageWrapper;

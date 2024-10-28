import { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

export interface HeadingProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
  type?: "normal" | "medium" | "semibold" | "bold";
  variant?: string;
}

const Heading = ({
  children,
  className,
  as: Component = "h1",
  type = "semibold",
  variant = "primary",
  ...props
}: HeadingProps) => {
  return (
    <Component
      className={clsx(`font-${type}`, `text-${variant}`, className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Heading;

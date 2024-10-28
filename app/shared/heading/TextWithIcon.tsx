import clsx from "clsx";
import React, { FC, PropsWithChildren, ReactNode } from "react";
interface ITextWithIcon {
  className?: string;
  icon?: ReactNode;
  text: string;
  onClick?: () => void;
  styleText?: string;
}
const TextWithIcon: FC<PropsWithChildren<ITextWithIcon>> = ({
  className,
  icon,
  text,
  onClick,
  styleText,
  children,
}) => {
  return (
    <div
      className={clsx("text-sm flex gap-x-[6px]", className)}
      onClick={onClick}
    >
      {icon}
      <div className={clsx("text-primary", styleText)}>{text}</div>
      {children}
    </div>
  );
};

export default TextWithIcon;

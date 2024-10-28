import clsx from "clsx";
import React, { ReactNode } from "react";
export interface IButton {
  variant?:
    | "primary"
    | "secondary"
    | "secondary-color"
    | "tertiary"
    | "tertiary-color"
    | "tertiary-link"
    | "tertiary-color-link"
    | "error";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  iconFirst?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  btnName?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  icon?: ReactNode;
  secondaryIcon?: ReactNode;
}
const Button = ({
  variant = "primary",
  size = "md",
  icon,
  iconFirst,
  btnName,
  onClick,
  disabled,
  fullWidth,
  className,
  secondaryIcon,
  isLoading,
}: IButton) => {
  const getClassName = () => {
    switch (variant) {
      case "primary":
        return disabled
          ? "bg-disabled text-disabled !cursor-not-allowed border border-disabled-subtle"
          : "bg-btn-primary hover:bg-btn-primary-hover text-btn-primary-fg";
      case "secondary":
        return disabled
          ? "bg-primary text-disabled !cursor-not-allowed border border border-disabled-subtle"
          : "text-btn-secondary-fg border bg-btn-secondary hover:bg-btn-secondary-hover border-btn-secondary hover:border-btn-secondary-hover";
      case "secondary-color":
        return disabled
          ? "bg-primary text-disabled !cursor-not-allowed border border-disabled-subtle"
          : "text-btn-secondary-color-fg border bg-btn-secondary-color hover:bg-btn-secondary-color-hover border-btn-secondary-color hover:border-btn-secondary-color-hover";
      case "tertiary":
        return disabled
          ? "text-disabled !cursor-not-allowed"
          : "text-btn-tertiary-fg hover:bg-btn-tertiary-hover";
      case "tertiary-color":
        return disabled
          ? "text-disabled !cursor-not-allowed"
          : "text-btn-tertiary-color-fg hover:bg-btn-tertiary-color-hover";
      case "tertiary-link":
        return disabled
          ? "text-disabled !cursor-not-allowed"
          : "text-btn-tertiary-fg";
      case "tertiary-color-link":
        return disabled
          ? "text-disabled !cursor-not-allowed"
          : "text-btn-tertiary-color-fg";
      case "error":
        return disabled
          ? "bg-disabled text-disabled !cursor-not-allowed border border-disabled-subtle"
          : "bg-btn-primary-error bg-btn-primary-error-hover text-btn-primary-error-fg";
      default:
        break;
    }
  };
  return (
    <div
      className={clsx(
        "w-max h-max flex items-center justify-center rounded-lg cursor-pointer duration-300 font-semibold relative",
        getClassName(),
        icon && {
          "gap-x-1": size === "xs" || size === "sm",
          "gap-x-[6px]": size === "md" || size === "lg",
          "gap-x-[10px]": size === "xl",
        },
        !["tertiary-link", "tertiary-color-link"]?.includes(variant) && {
          "py-2 px-3": size === "xs",
          "py-[10px] px-[14px]": size === "sm",
          "py-[10px] px-4": size === "md",
          "py-3 px-[18px]": size === "lg",
          "py-4 px-[22px]": size === "xl",
        },
        { "!w-full justify-center": fullWidth },
        isLoading && "[&>*]:opacity-0",
        className
      )}
      onClick={onClick && (disabled ? () => {} : (e) => onClick(e))}
    >
      {/* {isLoading && <Loader wrapperClass="!opacity-100 absolute" />} */}
      {btnName && (
        <div
          className={clsx(
            {
              "text-sm leading-[21px]": size === "xs" || size === "sm",
              "text-lg": size === "xl",
            },
            "text-nowrap",
            iconFirst && "order-last"
          )}
        >
          {btnName}
        </div>
      )}
      {icon && (
        <div className={clsx("text-xl", { "!text-2xl": size === "xl" })}>
          {icon}
        </div>
      )}
      {secondaryIcon}
    </div>
  );
};

export default Button;

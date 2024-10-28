import clsx from "clsx";
import React, { Fragment } from "react";
import Button from "./Button";
import { camelCaseToWords } from "@/app/utils/constants";

const BtnGroup = ({
  buttons,
  onClick,
  selected,
  className,
}: {
  buttons: string[];
  onClick: (btn: string) => void;
  selected: string;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "border flex w-max bg-white border-primary rounded-lg [&>*:first-child]:!rounded-l-lg [&>*:last-child]:!rounded-r-lg",
        className
      )}
    >
      {buttons?.map((item, idx) => (
        <Fragment key={idx}>
          <Button
            btnName={camelCaseToWords(item)}
            variant={item === selected ? "secondary-color" : "secondary"}
            className={clsx(
              "!border-none rounded-none",
              item === selected && "bg-btn-secondary-color-hover"
            )}
            onClick={() => onClick(item)}
            key={idx}
          />
          {idx !== buttons?.length - 1 && (
            <div className="min-h-full w-[1px] border-r border-r-primary" />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default BtnGroup;

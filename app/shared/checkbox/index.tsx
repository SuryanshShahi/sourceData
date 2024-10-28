import clsx from "clsx";
import React, { useEffect } from "react";
import { FaCheck } from "react-icons/fa6";

interface CheckboxProps {
  name: string;
  onChange: (checked: boolean) => void;
  checked: boolean;
  disabled?: boolean;
  label?: string;
  styleLabel?: string;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  onChange,
  checked,
  disabled,
  label,
  styleLabel,
  className,
}) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div
      className={clsx(
        "flex space-x-3 rounded-lg cursor-pointer w-full items-center",
        className
      )}
      role="presentation"
    >
      <input
        name={name}
        id={name}
        type="checkbox"
        onChange={handleOnChange}
        checked={checked}
        disabled={disabled}
        hidden
      />
      <div
        className={clsx(
          "rounded-[6px] border h-5 duration-300 min-w-5 flex justify-center items-center",
          checked ? "border-brand bg-brand-solid" : "border-primary",
          disabled && "border-disabled bg-disabled"
        )}
        onClick={handleOnChange as any}
      >
        {checked && (
          <FaCheck
            size={12}
            className={clsx("text-white", disabled && "!text-disabled")}
          />
        )}
      </div>
      {label && (
        <label
          htmlFor={name}
          className={clsx(
            "text-base text-secondary cursor-pointer font-medium leading-6",
            styleLabel
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;

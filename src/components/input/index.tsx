import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

type InputProps = React.ComponentProps<"input"> & {
  label?: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
};

export function Input({ name, register, rules, error, ...props }: InputProps) {
  return (
    <div>
      <input
        className="w-full border-2 rounded-md h-11 px-2"
        autoComplete="on"
        {...register(`${name}`, rules)}
        {...props}
      />
      {error && <p className="my-1 text-red-500">{error}</p>}
    </div>
  );
}

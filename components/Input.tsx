import React from "react";

type Props = { label?: React.ReactNode } & JSX.IntrinsicElements["input"];

export const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { label, ...rest } = props;

  return (
    <div className="flex flex-col self-end flex-grow-0">
      {label && label}
      <input
        ref={ref}
        className="bg-slate-900 px-4 py-2 border-slate-700 border rounded-lg "
        {...rest}
      />
    </div>
  );
});

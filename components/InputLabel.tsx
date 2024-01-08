import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const InputLabel = ({ children }: Props) => {
  return <span className="text-sm text-slate-400 mb-1">{children}</span>;
};

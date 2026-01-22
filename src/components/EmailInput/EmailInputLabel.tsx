import cn from "classnames";
import { ReactNode } from "react";

type EmailInputLabelProps = {
  id: string;
  children: ReactNode;
  srOnly?: boolean;
};

const EmailInputLabel = ({ id, children, srOnly }: EmailInputLabelProps) => {
  return (
    <label
      htmlFor={id}
      className={cn(
        "mb-3 block text-sm font-medium text-gray-700",
        srOnly && "sr-only",
      )}
    >
      {children}
    </label>
  );
};

export default EmailInputLabel;

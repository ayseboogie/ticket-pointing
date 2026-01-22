import cn from "classnames";
import { ChangeEvent } from "react";
import EmailInputLabel from "@/components/EmailInput/EmailInputLabel";

type EmailInputProps = {
  id: string;
  label: string;
  labelSrOnly?: boolean;
  type: string;
  className?: string;
  name?: string;
  autoComplete?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  buttonConnected?: boolean;
};

export const EmailInput = ({
  id,
  label,
  labelSrOnly,
  type = "text",
  className = "",
  name = "",
  autoComplete = "",
  required,
  placeholder = "",
  onChange,
  buttonConnected,
  ...props
}: EmailInputProps) => {
  return (
    <div className={className}>
      {label && (
        <EmailInputLabel id={id} srOnly={labelSrOnly}>
          {label}
        </EmailInputLabel>
      )}
      <input
        id={id}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={cn(
          buttonConnected && "rounded-r-none",
          "block w-full appearance-none rounded-sm border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900" +
            " placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm",
        )}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default EmailInput;

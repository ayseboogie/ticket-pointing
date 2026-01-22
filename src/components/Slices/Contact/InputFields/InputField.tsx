import { ChangeEvent } from "react";
import Field from "./Field.tsx";

export type InputFieldProps = {
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
  value,
  onChange,
  className,
}: InputFieldProps) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      // Call onChange handler with new value after debounce delay
      if (onChange) {
        onChange(newValue);
      }
    }, 100);
  };

  return (
    <Field label={label} className={className}>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="input-custom"
      />
    </Field>
  );
};

export default InputField;

import Field from "./Field.tsx";

export type TextAreaProps = {
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

const TextAreaField = ({
  label,
  name,
  placeholder,
  required = true,
  className,
}: TextAreaProps) => {
  return (
    <Field label={label} className={className}>
      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        className="input-custom-large"
      />
    </Field>
  );
};

export default TextAreaField;

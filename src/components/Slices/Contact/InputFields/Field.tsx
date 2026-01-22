export type FieldProps = {
  label?: string;
  children?: any;
  className?: string;
};

const Field = ({ label, children, className }: FieldProps) => {
  return (
    <label>
      <span className={`text-sm ${className}`}>{label}</span>
      {children}
    </label>
  );
};

export default Field;

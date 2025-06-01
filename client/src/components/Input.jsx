const Input = ({
  type,
  name,
  onChange,
  value,
  placeholder,
  required,
  disabled,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={name}
        className="text-[var(--label-gray)] text-[0.875rem] mb-1 font-medium"
      >
        {placeholder}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          id={name}
          disabled={disabled}
          onChange={onChange}
          value={value}
          className="relative border-1 border-[var(--muted-gray)] p-[0.25rem_0.75rem] text-[var(--label-gray)] text-[0.875rem] rounded-sm w-full"
          required={required}
        />
      </div>
    </div>
  );
};

export default Input;

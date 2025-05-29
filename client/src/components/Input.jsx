const Input = ({ type, name, onChange, value, placeholder, required, disabled }) => {
    return (
        <>
            <label
                htmlFor={name}
                className="text-[var(--label-gray)] text-[0.875rem]"
            >
                {placeholder}
            </label>
            <div className="relative">
                <input
                    type={type}
                    name={name}
                    disabled={disabled}
                    onChange={onChange}
                    value={value}
                    className="relative border-1 border-[var(--muted-gray)] p-[0.25rem_0.75rem] text-[var(--label-gray)] text-[0.875rem] rounded-sm w-full mb-2"
                    required={required}
                />
            </div>
        </>
    );
};

export default Input;
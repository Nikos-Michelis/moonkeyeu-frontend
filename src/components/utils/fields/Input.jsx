import InputElement from "@/components/utils/html/InputElement.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = (
    {
        className = "",
        type,
        icon,
        lucideIcon,
        suffix = null,
        label = "",
        register,
        name,
        rules,
        errors = null,
        disabled,
        ...props
    }) => {
    const errorMessage = errors?.[name]?.message;

    return (
        <>
            <div className={`input ${className}`}>
                {icon && <FontAwesomeIcon size="lg" icon={icon} />}
                {lucideIcon && lucideIcon }
                <InputElement
                    {...props}
                    type={type}
                    placeholder={label}
                    name={name}
                    register={register}
                    rules={rules}
                    disabled={disabled}
                />
                {suffix && (
                    <span className="input__suffix">
                        {suffix}
                    </span>
                )}
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </>
    );
};

export default Input;
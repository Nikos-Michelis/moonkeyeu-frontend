import TextAreaElement from "@/components/utils/html/TextAreaElement.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMessage} from "@fortawesome/free-solid-svg-icons";

const TextArea = (
    {
        className,
        label,
        register,
        name,
        rules,
        options,
        errors = null,
        defaultValue = "",
        disabled,
        ...props
    }) => {
    const errorMessage = errors ? errors[name]?.message : null;
    return (
        <>
            <div className={`input ${className}`}>
                <FontAwesomeIcon size="lg" icon={faMessage} />
                <TextAreaElement
                    {...props}
                    name={name}
                    placeholder={label}
                    register={register}
                    rules={rules}
                    options={options}
                    disabled={disabled}
                />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </>
    );
};

export default TextArea;

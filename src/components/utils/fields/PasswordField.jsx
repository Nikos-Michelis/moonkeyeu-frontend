import Input from "@/components/utils/fields/Input.jsx";
import { useState } from "react";
import { faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PasswordField = (
    {
        label = "Password",
        name = "password",
        errors,
        register,
        rules = {
            required: 'Password is required.',
            pattern:{value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g,
                message:'Password should be at least 8 characters and include, ' +
                    'at least 1 UPPERCASE letter, 1 number, 1 special character!'}
        }
    }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="input-field">
            <Input
                className={errors?.[name] ? "input-error" : ""}
                icon={faLock}
                suffix={
                    <FontAwesomeIcon
                        icon={visible ? faEye : faEyeSlash}
                        onClick={() => setVisible((prev) => !prev)}
                        style={{ cursor: "pointer" }}
                    />
                }
                label={label}
                name={name}
                type={visible ? "text" : "password"}
                register={register}
                rules={rules}
                errors={errors}
            />
        </div>
    );
};

export default PasswordField;
import ReCAPTCHA from "react-google-recaptcha";
import { Controller } from "react-hook-form";

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

function CustomReCAPTCHA({ control, name = "recaptcha", rules }) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules ?? { required: "Please complete the captcha" }}
            render={({ field, fieldState }) => (
                <div className="recaptcha__wrapper">
                    <ReCAPTCHA
                        classname="recaptcha"
                        sitekey={SITE_KEY}
                        onChange={(token) => field.onChange(token)}
                    />
                    {fieldState.error && (
                        <p className="error-message">
                            {fieldState.error.message}
                        </p>
                    )}
                </div>
            )}
        />
    );
}

export default CustomReCAPTCHA;
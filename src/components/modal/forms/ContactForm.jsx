import {useEffect} from 'react';
import {Button} from "@/components/button/Button.jsx";
import Input from "@/components/utils/fields/Input.jsx";
import {Controller, useForm} from "react-hook-form";
import ErrorBox from "@/components/utils/ErrorBox.jsx";
import TextArea from "@/components/utils/fields/TextArea.jsx";
import {useCreateMutation} from "@/services/mutations.jsx";
import {useAuth} from "@/context/AuthProvider.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDown, faArrowRight, faAt, faBug, faChevronLeft, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {LinkButton} from "@/components/button/LinkButton.jsx";
import SimpleSelect from "@/components/utils/select/SimpleSelect.jsx";
import CustomReCAPTCHA from "@/components/utils/fields/Recaptcha.jsx";

const ContactForm = () => {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const { user, status } = useAuth();
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        control,
        formState: {errors}} = useForm({
        mode: 'onChange',
        defaultValues: {
            email: user?.email || "",
            category: ""
        },
    });

    const contactFormMutation =
        useCreateMutation({
            successMessage: "We'll review your request shortly!",
            queryKeysToInvalidate: ["contact-messages"]
        });

    const onSubmit = (data) => {
        contactFormMutation.mutate(
            {
                data: data,
                url: `${baseUrl}/community/contact`,
                options: {withCredentials: true, Bearer: false, Csrf: true}
            },
            {
                onSuccess: () => {
                    reset((formValues) => ({
                        email: formValues.email,
                        category: "",
                        message: ""
                    }));
                },
            }
        );
    }

    useEffect(() => {
        if (user?.email) {
            setValue("email", user.email);
        }
    }, [user?.email, setValue]);

    const options = [
        { value: "Bug", label: "Report A Bug" },
        { value: "Account", label: "Account Issue" },
        { value: "Other", label: "Other" },
    ]

    return (
        <>
            <section className="contact-section">
                <div className="container flex justify-center" data-type="medium" data-spacing="none">
                    <div className="container flex flex-column align-center padding-inline-8 padding-block-10" data-type="fixed-inherit" data-spacing="none">
                        <div className="container flex justify-start padding-block-end-4">
                            <Button
                                className="btn--transparent"
                                onClick={() => window.history.back()}>
                                <FontAwesomeIcon icon={faChevronLeft} /> Back
                            </Button>
                        </div>
                        <div className="container margin-block-8" data-type="narrow">
                            <div className="flex justify-center">
                                <h2 className="heading-3"><FontAwesomeIcon icon={faBug}/> Report</h2>
                            </div>
                            <hr/>
                            <p className="fs-small-300">
                                To help us organize bug reports more effectively, please create a new issue
                                <LinkButton
                                    className="btn--transparent fw-bold" to="https://github.com/Nikos-Michelis/MoonkeyEU-Feedback/issues/new"
                                    isExternal={true}> here.
                                </LinkButton>
                                Thank you for your feedback — we're striving to make the platform better!
                            </p>
                            <hr/>
                            <p className="margin-block-start-2 fs-small-300 text-center">You can email us at moonkeyeu@gmail.com</p>
                        </div>
                        <div className="container container--form margin-block-end-12 margin-inline-5" data-type="narrow">
                            <div className="form-content">
                                <h2>Contact</h2>
                                {(errors && Object.keys(errors).length > 0 || contactFormMutation.error) && <ErrorBox errors={errors} apiError={contactFormMutation.error?.response?.data}/>}
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="input-field">
                                        <Input
                                            className={`${errors.email ? 'input-error' : ''}`}
                                            label={!user?.email? "Email" : ''}
                                            icon={faAt}
                                            name="email"
                                            type="email"
                                            register={register}
                                            rules={{
                                                required: 'Email is required.',
                                                pattern:{value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g, message:'Incorrect email.'}
                                            }}
                                            errors={errors}
                                            disabled={!!user || status.isPending}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <Controller
                                            name="category"
                                            control={control}
                                            rules={{ required: "Category is required" }}
                                            render={({ field, fieldState }) => (
                                                <>
                                                    <SimpleSelect
                                                        name="category"
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SimpleSelect.Button
                                                            className={`select__trigger select__trigger--full ${fieldState.error ? "select__trigger--error" : ""}`}
                                                        >
                                                            <SimpleSelect.Value placeholder="Category" />
                                                            <SimpleSelect.Icon>
                                                                <FontAwesomeIcon icon={faAngleDown} />
                                                            </SimpleSelect.Icon>
                                                        </SimpleSelect.Button>

                                                        <SimpleSelect.Content className="select__content--full-width">
                                                            {options.map((option) => (
                                                                <SimpleSelect.Item
                                                                    key={option.value}
                                                                    value={option.value}
                                                                    className="select__option"
                                                                    data-selected={field.value === option.value}
                                                                >
                                                                    <SimpleSelect.ItemText>
                                                                        {option.label}
                                                                    </SimpleSelect.ItemText>
                                                                </SimpleSelect.Item>
                                                            ))}
                                                        </SimpleSelect.Content>
                                                    </SimpleSelect>

                                                    {fieldState.error && (
                                                        <p className="error-message">
                                                            {fieldState.error.message}
                                                        </p>
                                                    )}
                                                </>
                                            )}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <TextArea
                                            className={`${errors.email ? 'input-error' : ''}`}
                                            label="Description"
                                            name="message"
                                            type="text"
                                            cols="30"
                                            rows="4"
                                            register={register}
                                            rules={{
                                                required: 'Description is required.',
                                                minLength: { value: 10, message: "Message should be at least 10 characters"},
                                                maxLength: { value: 350, message: "Message cannot exceed 350 characters" }
                                            }}
                                            errors={errors}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <CustomReCAPTCHA control={control} />
                                    </div>
                                    <div className="flex justify-center padding-2">
                                        <Button className="btn btn--primary btn--big" type="submit" disabled={contactFormMutation.isPending}>
                                            {contactFormMutation.isPending
                                                ? <FontAwesomeIcon icon={faSpinner} spin />
                                                : <FontAwesomeIcon icon={faArrowRight} />
                                            } Continue
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default ContactForm;
import { useCallback, useEffect, useReducer } from "react";
import { Button } from "@/components/button/Button.jsx";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthProvider.jsx";
import ErrorBox from "@/components/utils/ErrorBox.jsx";
import ResendButton from "@/components/button/ResendButton.jsx";
import Input from "@/components/utils/fields/Input.jsx";
import { useNavigate } from "react-router-dom";
import { useCreateMutation } from "@/services/mutations.jsx";
import PasswordField from "@/components/utils/fields/PasswordField.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRight, faAt, faLock, faRightToBracket, faSpinner, faUserAstronaut} from "@fortawesome/free-solid-svg-icons";
import GoogleLoginButton from "@/components/button/GoogleLoginButton.jsx";
import CustomCheckbox from "@/components/utils/CustomCheckbox.jsx";
import {useQueryClient} from "@tanstack/react-query";

const FORM_STATES = {
    LOGIN:              "login",
    REGISTER:           "register",
    OTP_VERIFY:         "otpVerify",
    FORGOT_PASSWORD:    "forgotPassword",
    RESET_PASSWORD:     "resetPassword",
    OAUTH2_REGISTRATION:"oAuth2Registration",
};

const API_URLS = {
    [FORM_STATES.REGISTER]:            "/auth/register",
    [FORM_STATES.OAUTH2_REGISTRATION]: "/oauth2/register/google",
    [FORM_STATES.LOGIN]:               "/auth/authenticate",
    [FORM_STATES.OTP_VERIFY]:          "/auth/verify-otp",
    [FORM_STATES.FORGOT_PASSWORD]:     "/auth/forgot-password",
    [FORM_STATES.RESET_PASSWORD]:      "",
};

const TITLE_MAP = {
    [FORM_STATES.LOGIN]:               "Welcome back",
    [FORM_STATES.REGISTER]:            "Create account",
    [FORM_STATES.OTP_VERIFY]:          "Account verification",
    [FORM_STATES.FORGOT_PASSWORD]:     "Forgot password?",
    [FORM_STATES.RESET_PASSWORD]:      "Check your inbox",
    [FORM_STATES.OAUTH2_REGISTRATION]: "One more step!",
};

const USERNAME_PATTERN = {
    value: /^[A-Za-z][A-Za-z0-9_]{6,15}$/,
    message: "Username must be between 7 and 16 characters and cannot contain spaces.",
};

const EMAIL_PATTERN = {
    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: "Incorrect email.",
};

const initialState = {
    formState: FORM_STATES.LOGIN,
    apiError:  null,
    otpToken:  null,
    user:      null,
    idToken:   null,
};

function formReducer(state, action) {
    switch (action.type) {
        case "SET_FORM_STATE": return { ...state, formState: action.payload, apiError: null };
        case "SET_API_ERROR":  return { ...state, apiError: action.payload };
        case "SET_OTP_TOKEN":  return { ...state, otpToken: action.payload };
        case "SET_ID_TOKEN":   return { ...state, idToken: action.payload };
        case "SET_USERNAME":   return { ...state, user: action.payload };
        case "RESET":          return initialState;
        default:               return state;
    }
}

const BASE_URL  = import.meta.env.VITE_BACKEND_BASE_URL;

const LoginForm = ({ setOpen, onTitleChange, onBackChange }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { setJwtToken, status, error: authContextError } = useAuth();
    const [state, dispatch] = useReducer(formReducer, initialState);

    const { register, handleSubmit, reset, setValue, watch, control, formState: { errors } } =
        useForm({ mode: "onChange" });

    const resendMutation = useCreateMutation({
        successMessage: "OTP resent successfully."
    });
    const otpVerificationMutation = useCreateMutation({
        successMessage: undefined
    });
    const credentialsMutation = useCreateMutation({
        successMessage: undefined
    });
    const signInWithGoogleMutation = useCreateMutation({
        successMessage: undefined
    });

    const isPending = signInWithGoogleMutation.isPending || credentialsMutation.isPending;

    const handleClose = useCallback(() => {
        dispatch({ type: "RESET" });
        reset();
        setOpen(false);
    }, [setOpen, reset]);

    const onNavigate = (url)=> {
        handleClose();
        navigate(url);
    }

    const handleSwitchForm = useCallback((newState) => {
        dispatch({ type: "SET_FORM_STATE", payload: newState });
        reset();
    }, [reset]);

    const handleFormView = useCallback(() => {
        const { LOGIN, REGISTER, FORGOT_PASSWORD, OTP_VERIFY, RESET_PASSWORD } = FORM_STATES;

        dispatch({ type: "SET_API_ERROR", payload: null });

        if ([LOGIN, REGISTER].includes(state.formState)) {
            dispatch({ type: "SET_FORM_STATE", payload: OTP_VERIFY });
        } else if (state.formState === FORGOT_PASSWORD) {
            dispatch({ type: "SET_FORM_STATE", payload: RESET_PASSWORD });
        } else {
            handleClose();
        }
    }, [state.formState, handleClose]);

    const handleOtpResend = (token) => {
        resendMutation.mutate(
            { data: { token }, url: `${BASE_URL}/auth/resend-otp` },
            { onSuccess: (res) => setValue("token", res.token) }
        );
    };

    const handleUserVerification = (tokenUrl, credentials = null) => {
        otpVerificationMutation.mutate(
            { url: tokenUrl, data: credentials, options: { withCredentials: true } },
            {
                onSuccess: (res) => {
                    setJwtToken(res?.token)
                    queryClient.removeQueries({ queryKey: ["user"] });
                    handleClose()
                },
                onError: (err) => dispatch({ type: "SET_API_ERROR", payload: err.response?.data }),
            }
        );
    };

    const handleCredentials = (url, credentials = null) => {
        credentialsMutation.mutate(
            { data: credentials, url },
            {
                onSuccess: (res) => {
                    if (res.token) dispatch({ type: "SET_OTP_TOKEN", payload: res.token });
                    handleFormView();
                },
                onError: (err) => dispatch({ type: "SET_API_ERROR", payload: err.response?.data }),
            }
        );
    };

    const handleGoogleLoginSuccess = (res, idToken) => {
        dispatch({ type: "SET_USERNAME", payload: { ...res } });
        dispatch({ type: "SET_ID_TOKEN",  payload: idToken });
        handleSwitchForm(FORM_STATES.OAUTH2_REGISTRATION);
    };

    const handleOAuth2Response = ((response) => {
        const { credential: idToken } = response;
        signInWithGoogleMutation.mutate(
            { url: `${BASE_URL}/oauth2/login/google`, data: { idToken } },
            {
                onSuccess: (res) => {
                    queryClient.removeQueries({ queryKey: ["user"] });
                    if (res.token) {
                        setJwtToken(res.token);
                        handleClose()
                        return;
                    }
                    handleGoogleLoginSuccess(res, idToken);
                },
                onError: (err) => dispatch({ type: "SET_API_ERROR", payload: err.response?.data }),
            }
        );
    });

    useEffect(() => {
        const canGoBack = [FORM_STATES.REGISTER, FORM_STATES.FORGOT_PASSWORD].includes(state.formState);
        onBackChange?.({
            show: canGoBack,
            onBack: () => handleSwitchForm(FORM_STATES.LOGIN)
        });

    }, [state.formState, handleSwitchForm, onBackChange]);

    useEffect(() => {
        if (state.user?.name) setValue("confirmUsername", state.user.name);
    }, [state.user?.name, setValue]);

    useEffect(() => {
        if (status.isSuccess) handleClose();
    }, [status.isSuccess, handleClose]);

    useEffect(() => {
        if (!authContextError) return;
        dispatch({ type: "SET_API_ERROR", payload: authContextError.response?.data });
    }, [authContextError]);

    useEffect(() => {
        onTitleChange?.(TITLE_MAP[state.formState] ?? "");
    }, [state.formState, onTitleChange]);

    const hasErrors = Object.keys(errors).length > 0;

    const onSubmit = (data) => {
        const url = `${BASE_URL}${API_URLS[state.formState]}`;

        if (state.formState === FORM_STATES.OTP_VERIFY) {
            handleUserVerification(url, data);
            return;
        }
        if (state.formState === FORM_STATES.OAUTH2_REGISTRATION) {
            handleUserVerification(url, {
                confirmUsername: data.confirmUsername,
                email: state.user?.email,
                idToken: state.idToken,
            });
            return;
        }
        handleCredentials(url, data);
    };

    const isSmall = [FORM_STATES.OTP_VERIFY, FORM_STATES.FORGOT_PASSWORD, FORM_STATES.RESET_PASSWORD].includes(state.formState);

    return (
        <>
            <div className={`dialog__content${isSmall ? " small-form" : ""}`}>
                {state.formState === FORM_STATES.LOGIN && (
                    <div className="dialog__info fs-small-300">
                        <h2>Create Account</h2>
                        <p>Don&#39;t you want to miss a single launch?</p>
                        <div className="text-center">
                            Become a member now!
                            <Button className="btn--transparent" type="button" onClick={() => handleSwitchForm(FORM_STATES.REGISTER)}>
                                Sign-up
                            </Button>
                        </div>
                        <GoogleLoginButton onSuccess={handleOAuth2Response} />
                    </div>
                )}
                {state.formState === FORM_STATES.LOGIN && (
                    <div className="form-content">
                        {(hasErrors || state.apiError?.validationErrors) && (
                            <ErrorBox errors={errors} apiError={state.apiError} />
                        )}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-field">
                                <Input
                                    className={errors.email ? "input-error" : ""}
                                    icon={faAt}
                                    label="Email"
                                    name="email"
                                    type="email"
                                    register={register}
                                    errors={errors}
                                    autoComplete="email"
                                    rules={{ required: "Email is required.", pattern: EMAIL_PATTERN }}
                                />
                            </div>
                            <PasswordField errors={errors} register={register} />
                            <div className="flex justify-space-between align-center fs-medium-200 margin-block-end-4">
                                <Controller
                                    name="rememberMe" control={control}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <CustomCheckbox
                                            ref={ref} id="checkbox-remember"
                                            label="Remember me"
                                            className={{ root: "checkbox__root checkbox__root--small" }}
                                            defaultChecked={value}
                                            onCheckedChange={onChange}
                                            disabled={isPending}
                                        />
                                    )}
                                />
                                <Button className="btn--transparent" type="button" onClick={() => handleSwitchForm(FORM_STATES.FORGOT_PASSWORD)}>
                                    Forgot password?
                                </Button>
                            </div>
                            <div className="flex flex-wrap justify-center">
                                <Button className="btn btn--primary btn--big" type="submit" disabled={isPending}>
                                    <FontAwesomeIcon icon={isPending ? faSpinner : faRightToBracket} spin={isPending} /> Login
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
                {state.formState === FORM_STATES.REGISTER && (
                    <div className="form-content">
                        {(hasErrors || state.apiError?.validationErrors) && (
                            <ErrorBox errors={errors} apiError={state.apiError} />
                        )}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-field">
                                <Input
                                    className={errors.username ? "input-error" : ""}
                                    icon={faUserAstronaut}
                                    label="Username"
                                    name="username"
                                    type="text"
                                    register={register}
                                    errors={errors}
                                    autoComplete="username"
                                    rules={{ required: "Username is required.", pattern: USERNAME_PATTERN }}
                                />
                            </div>
                            <div className="input-field">
                                <Input
                                    className={errors.email ? "input-error" : ""}
                                    icon={faAt}
                                    label="Email"
                                    name="email"
                                    type="email"
                                    register={register}
                                    errors={errors}
                                    autoComplete="email"
                                    rules={{ required: "Email is required.", pattern: EMAIL_PATTERN }}
                                />
                            </div>
                            <PasswordField errors={errors} register={register} />
                            <PasswordField
                                label="Repeat Password" name="repeatPassword"
                                errors={errors} register={register}
                                rules={{
                                    required: "Repeat Password is required.",
                                    validate: (v) => v === watch("password") || "Passwords do not match.",
                                }}
                            />
                            <div className="flex justify-space-between align-center margin-block-end-4">
                                <Controller
                                    name="policy" control={control}
                                    rules={{ required: "You must agree to the privacy policy" }}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <CustomCheckbox
                                            ref={ref}
                                            checked={value ?? false}
                                            onCheckedChange={onChange}
                                            className={{ root: "checkbox__root checkbox__root--small" }}
                                            disabled={credentialsMutation.isPending}
                                            label={
                                                <>
                                                    I agree to the
                                                    <Button type="button" className="btn--transparent" onClick={() => onNavigate("/privacy")}>
                                                        Privacy Policy
                                                    </Button>
                                                </>
                                            }
                                        />
                                    )}
                                />
                            </div>
                            <div className="flex justify-center margin-block-start-2">
                                <Button className="btn btn--primary btn--big" type="submit" disabled={credentialsMutation.isPending}>
                                    {credentialsMutation.isPending && <FontAwesomeIcon icon={faSpinner} spin />} Register
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
                {state.formState === FORM_STATES.OTP_VERIFY && (
                    <div className="form-content">
                        {(hasErrors || state.apiError?.validationErrors) && (
                            <ErrorBox errors={errors} apiError={state.apiError} />
                        )}
                        <div className="padding-block-3">
                            <p>{credentialsMutation.data?.message}</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input type="hidden" {...register("token")}     value={state.otpToken ?? ""} />
                            <input type="hidden" {...register("rememberMe")} value="false" />
                            <div className="input-field">
                                <Input
                                    className={errors.otp ? "input-error" : ""}
                                    icon={faLock}
                                    label="One Time Password (OTP)"
                                    name="otp"
                                    type="text"
                                    register={register}
                                    errors={errors} autoComplete="one-time-code"
                                    rules={{
                                        required: "OTP code is required.",
                                        pattern: { value: /^\d{6}$/, message: "OTP must be 6 digits." },
                                    }}
                                />
                            </div>
                            <div className="flex justify-center">
                                <Button className="btn btn--primary btn--small" type="submit" disabled={otpVerificationMutation.isPending}>
                                    <FontAwesomeIcon icon={otpVerificationMutation.isPending ? faSpinner : faArrowRight} spin={otpVerificationMutation.isPending} /> Continue
                                </Button>
                                <ResendButton
                                    handleOtpResend={handleOtpResend}
                                    otpToken={state.otpToken}
                                    status={resendMutation}
                                    delay={resendMutation?.error?.response?.data?.delay}
                                />
                            </div>
                        </form>
                    </div>
                )}
                {state.formState === FORM_STATES.FORGOT_PASSWORD && (
                    <div className="form-content">
                        {(hasErrors || state.apiError?.validationErrors) && (
                            <ErrorBox errors={errors} apiError={state.apiError} />
                        )}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-field">
                                <Input
                                    className={errors.email ? "input-error" : ""}
                                    icon={faAt} label="Email"
                                    name="email"
                                    type="email"
                                    register={register}
                                    errors={errors}
                                    autoComplete="email"
                                    rules={{ required: "Email is required.", pattern: EMAIL_PATTERN }}
                                />
                            </div>
                            <div className="flex justify-center">
                                <Button className="btn btn--primary btn--big" type="submit" disabled={credentialsMutation.isPending}>
                                    <FontAwesomeIcon icon={credentialsMutation.isPending ? faSpinner : faArrowRight} spin={credentialsMutation.isPending} /> Continue
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
                {state.formState === FORM_STATES.RESET_PASSWORD && (
                    <div className="form-content">
                        <p>You will soon receive a link to reset your password via email. Don&#39;t forget to check your inbox!</p>
                    </div>
                )}
                {state.formState === FORM_STATES.OAUTH2_REGISTRATION && (
                    <div className="form-content">
                        {(hasErrors || state.apiError?.validationErrors) && (
                            <ErrorBox errors={errors} apiError={state.apiError} />
                        )}
                        <div className="margin-block-end-4">
                            <p>Oops! Looks like you forgot your username.</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-field">
                                <Input
                                    className={errors.confirmUsername ? "input-error" : ""}
                                    icon={faUserAstronaut}
                                    label="Username"
                                    name="confirmUsername"
                                    type="text"
                                    register={register}
                                    errors={errors}
                                    autoComplete="username"
                                    rules={{ required: "Username is required.", pattern: USERNAME_PATTERN }}
                                />
                            </div>
                            <div className="flex justify-center">
                                <Button className="btn btn--primary btn--big" type="submit" disabled={otpVerificationMutation.isPending}>
                                    <FontAwesomeIcon icon={otpVerificationMutation.isPending ? faSpinner : faArrowRight} spin={otpVerificationMutation.isPending} /> Continue
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default LoginForm;
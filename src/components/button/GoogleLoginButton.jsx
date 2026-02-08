import {GoogleLogin} from "@react-oauth/google";

function GoogleLoginButton({ onSuccess }) {
    return (
        <div className="btn btn--google margin-block-4">
            <GoogleLogin
                onSuccess={onSuccess}
                onError={() => {
                    console.error('Unable to login with Google provider.');
                }}
                text="continue_with"
                variant="outline"
                useOneTap={false}
            />
        </div>

    );
}

export default GoogleLoginButton;


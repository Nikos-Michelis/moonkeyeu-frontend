import {GoogleLogin} from "@react-oauth/google";

function GoogleLoginButton({ onSuccess }) {
    return (
        <div className="margin-block-4">
            <GoogleLogin
                onSuccess={onSuccess}
                onError={() => {
                    console.error('Unable to login with Google provider.');
                }}
                useOneTap={false}
            />
        </div>
    );
}

export default GoogleLoginButton;


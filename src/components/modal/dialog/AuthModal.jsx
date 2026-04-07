import Modal from "@/components/modal/dialog/Modal.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoginForm from "@/components/modal/forms/LoginForm.jsx";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import {useState} from "react";

const AuthModal = ({ open, setOpen }) => {
    const [title, setTitle] = useState("Welcome back");
    const [backConfig, setBackConfig] = useState({ show: false, onBack: null });

    return (
        <Modal open={open} onOpenChange={setOpen}>
            <Modal.Button className="navbar__user-link btn--transparent">
                <FontAwesomeIcon icon={faUser} />
            </Modal.Button>
            <Modal.Content
                title={title}
                showBack={backConfig.show}
                onBack={backConfig.onBack}
            >
                <LoginForm
                    setOpen={setOpen}
                    onTitleChange={setTitle}
                    setBackConfig={setBackConfig}
                />
            </Modal.Content>
        </Modal>
    );
};

export default AuthModal;
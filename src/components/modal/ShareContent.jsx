import React, {useEffect} from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    LinkedinIcon,
    WhatsappIcon, XIcon, RedditIcon, RedditShareButton
} from 'react-share';
import {Button} from "@/components/button/Button.jsx";
import useClipboard from "@/hooks/util/useClipboard.jsx";
import toast from "react-hot-toast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons";

const ShareContent = ({ url, title }) => {
    const { copied, copyToClipboard } = useClipboard();
    const handleShare = () => {
        copyToClipboard(url);
    };

    useEffect(() => {
        copied &&  toast(
            "The link was copied to the clipboard.",
            { icon: <FontAwesomeIcon icon={faLink} /> }
        );
    }, [copied]);

    return (
        <div className="share__content">
            <div className="share__options">
                <div className="share__option">
                    <FacebookShareButton url={url} quote={title}>
                        <FacebookIcon size={58} round />
                        <span className="share__text">Facebook</span>
                    </FacebookShareButton>
                </div>

                <div className="share__option">
                    <TwitterShareButton url={url} title={title}>
                        <XIcon size={60} round />
                        <span className="share__text">X</span>
                    </TwitterShareButton>
                </div>

                <div className="share-option">
                    <LinkedinShareButton url={url}>
                        <LinkedinIcon size={58} round />
                        <span className="share__text">LinkedIn</span>
                    </LinkedinShareButton>
                </div>

                <div className="share-option">
                    <WhatsappShareButton url={url} title={title}>
                        <WhatsappIcon size={58} round />
                        <span className="share__text">WhatsApp</span>
                    </WhatsappShareButton>
                </div>
                <div className="share-option">
                    <RedditShareButton url={url} title={title}>
                        <RedditIcon size={58} round />
                        <span className="share__text">Reddit</span>
                    </RedditShareButton>
                </div>

            </div>

            <div className="share__copy">
                <input
                    type="text"
                    value={url}
                    readOnly
                    className="share__input"
                />
                <Button onClick={handleShare} className="share__btn-copy btn btn--transparent">
                    Copy
                </Button>
            </div>
        </div>
    );
};

export default ShareContent;
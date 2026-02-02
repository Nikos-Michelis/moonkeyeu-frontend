import { useState } from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon
} from 'react-share';

const ShareContent = ({ url, title }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="share">
            <div className="share__options">
                <div className="share__option">
                    <FacebookShareButton url={url} quote={title}>
                        <FacebookIcon size={48} round />
                        <span>Facebook</span>
                    </FacebookShareButton>
                </div>

                <div className="share__option">
                    <TwitterShareButton url={url} title={title}>
                        <TwitterIcon size={48} round />
                        <span>X</span>
                    </TwitterShareButton>
                </div>

                <div className="share-option">
                    <LinkedinShareButton url={url}>
                        <LinkedinIcon size={48} round />
                        <span>LinkedIn</span>
                    </LinkedinShareButton>
                </div>

                <div className="share-option">
                    <WhatsappShareButton url={url} title={title}>
                        <WhatsappIcon size={48} round />
                        <span>WhatsApp</span>
                    </WhatsappShareButton>
                </div>
            </div>

            <div className="share__copy">
                <input
                    type="text"
                    value={url}
                    readOnly
                    className="copy-input"
                />
                <button onClick={handleCopy} className="copy-button">
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
        </div>
    );
};

export default ShareContent;
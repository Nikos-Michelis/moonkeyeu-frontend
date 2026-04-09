import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleUp, faLink} from "@fortawesome/free-solid-svg-icons";
import {LinkButton} from "@/components/button/LinkButton.jsx";
import {faXTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";
import SimpleSelect from "@/components/utils/select/SimpleSelect.jsx";

const YoutubeDropdown = ({options, setVideo, placeholder, defaultValue}) => {
    const [isOpen, setIsOpen] = useState(false);
    const isYoutubeUrl = (option) => {
        return (option?.videoUrl?.includes("youtube.com") || option?.videoUrl?.includes("youtu.be"))
    };
    const handleIconDisplay = (option) => {
        if (option.source === "x.com"){
            return faXTwitter;
        } else if (option.source === "youtube.com" || isYoutubeUrl(option)) {
            return faYoutube;
        } else {
            return faLink
        }
    }
    const handleUrlIcon = (option) => {
        return(
            <FontAwesomeIcon icon={handleIconDisplay(option)} />
        )
    }

    const onOptionSelect = (option) => {
        setIsOpen(!isOpen)
        setVideo(option)
    }

    return(
        <SimpleSelect
            name="video"
            onOpenChange={() => setIsOpen(!isOpen)}
            open={isOpen}
        >
            <SimpleSelect.Button
                className={`select__trigger select__trigger--yt-video`}
            >
                <div className="flex flex-column">
                    <div className="flex justify-center align-center">
                        <FontAwesomeIcon icon={faYoutube} className="margin-inline-end-1 fs-small-300"/>
                        <h2 className="fs-small-300">{placeholder}</h2>
                    </div>
                    <p>Official Livestream</p>
                </div>
                <SimpleSelect.Icon>
                    <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} />
                </SimpleSelect.Icon>
            </SimpleSelect.Button>

            <SimpleSelect.Content className="select__content select__content--full-width">
                {options.length > 0 ? (
                    options.map((option) => (
                        <div
                            key={option.id}
                            className="select__options"
                        >
                            <LinkButton
                                className={`select__option btn--transparent ${defaultValue === option?.priority ? "select__option--selected" : ""}`}
                                to={!isYoutubeUrl(option) && option.videoUrl }
                                onClick={() => onOptionSelect(option)}
                                isExternal={true}
                            >
                                <span className="margin-inline-2">{handleUrlIcon(option)}</span>
                                <span className="ellipsis-1-lines">{option?.title}</span>
                            </LinkButton>
                        </div>
                    ))
                ) : (
                    <div>No results found</div>
                )}
            </SimpleSelect.Content>
        </SimpleSelect>
    );
};

export default YoutubeDropdown;

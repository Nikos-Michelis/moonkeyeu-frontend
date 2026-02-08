import {useTheme} from "@/context/ThemeProvider.jsx";
import {Button} from "@/components/button/Button.jsx";

const ThemeButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button className="theme__content" onClick={toggleTheme}>
            <div
                data-theme-picker
                className="theme__container"
            >
                <div
                    className={`theme__moon-wrapper ${theme === "dark" ? "theme__moon-wrapper--active" : ""}`}
                    data-theme="dark"
                >
                    <div className="moon" />
                </div>
                <div
                    className={`theme__sun-wrapper ${theme === "light" ? "theme__sun-wrapper--active" : ""}`}
                    data-theme="light"
                >
                    <div className="sun" />
                </div>
            </div>
            <div className="theme__text">
                {theme.toUpperCase()}
            </div>
        </Button>
    );
};


export default ThemeButton;

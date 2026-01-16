import {Button} from "@/components/button/Button.jsx";
import {useTheme} from "@/context/ThemeProvider.jsx";

const ThemeButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div
            data-theme-picker
            className="btn-theme"
            id="theme"
            onClick={toggleTheme}
        >
            <div
                className={`moon-wrapper ${theme === "dark" ? "moon-wrapper--active" : ""}`}
                data-theme="dark"
            >
                <div className="moon" />
            </div>
            <div
                className={`sun-wrapper ${theme === "light" ? "sun-wrapper--active" : ""}`}
                data-theme="light"
            >
                <div className="sun" />
            </div>
        </div>
    );
};


export default ThemeButton;

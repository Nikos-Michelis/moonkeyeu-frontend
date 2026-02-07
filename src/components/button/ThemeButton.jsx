import {useTheme} from "@/context/ThemeProvider.jsx";

const ThemeButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="theme__content">
            <div
                data-theme-picker
                className="theme__container"
                id="theme"
                onClick={toggleTheme}
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
        </div>
    );
};


export default ThemeButton;

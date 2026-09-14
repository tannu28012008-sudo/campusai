import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("campusai-theme") === "dark";
    });

    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode);

        localStorage.setItem(
            "campusai-theme",
            darkMode ? "dark" : "light"
        );
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode((current) => !current);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeToggle() {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <button
            className="global-theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            {darkMode ? "☀️" : "🌙"}
        </button>
    );
}
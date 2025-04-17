import React, { createContext, useContext, useState, useCallback } from 'react';
import { ThemeType, ThemeColors, lightTheme, darkTheme } from './themeConfig';

interface ThemeContextType {
    theme: ThemeColors;
    themeType: ThemeType;
    toggleTheme: () => void;
    setThemeType: (type: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [themeType, setThemeType] = useState<ThemeType>('light');

    const theme = themeType === 'light' ? lightTheme : darkTheme;

    const toggleTheme = useCallback(() => {
        setThemeType(prev => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                themeType,
                toggleTheme,
                setThemeType,
            }}>
            {children}
        </ThemeContext.Provider>
    );
};

// hook to use the theme
export const useCustomTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
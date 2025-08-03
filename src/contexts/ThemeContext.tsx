import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material';

interface ThemeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check if user preference is stored in localStorage
        const stored = localStorage.getItem('darkMode');
        if (stored) {
            return JSON.parse(stored);
        }
        // Default to system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode((prev: boolean) => !prev);
    };

    // Create light theme
    const lightTheme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#667eea',
                light: '#8b9ff7',
                dark: '#4c63d2',
            },
            secondary: {
                main: '#f093fb',
                light: '#f5b3fc',
                dark: '#d665e0',
            },
            background: {
                default: '#ffffff',
                paper: 'rgba(255, 255, 255, 0.9)',
            },
            success: {
                main: '#10b981',
            },
            text: {
                primary: '#1e293b',
                secondary: '#64748b',
            },
        },
        typography: {
            fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
            h1: { fontWeight: 900 },
            h2: { fontWeight: 800 },
            button: { textTransform: 'none', fontWeight: 600 },
        },
        shape: { borderRadius: 12 },
    });

    // Create beautiful dark theme inspired by GitHub Dark, VS Code, and Discord
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#58a6ff', // GitHub's blue
                light: '#79c0ff',
                dark: '#388bfd',
            },
            secondary: {
                main: '#d2a8ff', // GitHub's purple
                light: '#e2c5ff',
                dark: '#bc8cff',
            },
            background: {
                default: '#0d1117', // GitHub dark background
                paper: '#161b22', // GitHub dark elevated surface
            },
            success: {
                main: '#3fb950', // GitHub green
                light: '#56d364',
                dark: '#2ea043',
            },
            warning: {
                main: '#f85149', // GitHub red/orange
                light: '#ff7b72',
                dark: '#da3633',
            },
            info: {
                main: '#58a6ff',
                light: '#79c0ff',
                dark: '#388bfd',
            },
            text: {
                primary: '#f0f6fc', // High contrast white
                secondary: '#8b949e', // Muted gray
            },
            divider: '#30363d', // Subtle borders
            action: {
                hover: 'rgba(177, 186, 196, 0.12)',
                selected: 'rgba(177, 186, 196, 0.16)',
                disabled: 'rgba(177, 186, 196, 0.3)',
            },
        },
        typography: {
            fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
            h1: { fontWeight: 900, color: '#f0f6fc' },
            h2: { fontWeight: 800, color: '#f0f6fc' },
            h3: { fontWeight: 700, color: '#f0f6fc' },
            h4: { fontWeight: 600, color: '#f0f6fc' },
            h5: { fontWeight: 600, color: '#f0f6fc' },
            h6: { fontWeight: 600, color: '#f0f6fc' },
            button: { textTransform: 'none', fontWeight: 600 },
        },
        shape: { borderRadius: 12 },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        scrollbarWidth: 'thin',
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#161b22',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#30363d',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: '#484f58',
                        },
                    },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        background: 'rgba(13, 17, 23, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderBottom: '1px solid #30363d',
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                        backgroundColor: '#161b22',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        '&:hover': {
                            backgroundColor: 'rgba(88, 166, 255, 0.1)',
                        },
                    },
                },
            },
        },
    });

    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            <MUIThemeProvider theme={theme}>
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
};

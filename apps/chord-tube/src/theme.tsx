// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#f7f8ff',
        },
        secondary: {
            main: '##f0f3fc',
        },
        error: {
            main: '#f44336',
        },
        success: {
            main: '#4caf50',
        }
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                },
            },
        },
    },
});

export default theme;

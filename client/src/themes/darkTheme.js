import { createTheme } from '@mui/material/styles';

const themeOptions = {
    palette: {
        type: 'dark',

        primary: {
            main: '#1A1B25',
        },

        secondary: {
            main: '#392061',
        },
    
        success: {
            main: '#6EEB83',
        },
    
        error: {
            main: '#FF5714',
        },
    
        warning: {
            main: '#FFB800',
        },
    
        info: {
            main: '#E4FF1A',
        },
    
        background: {
            default: '#4e4e4e',
        },
    },
};

const darkTheme = createTheme(themeOptions);

export default darkTheme;

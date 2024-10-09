// theme.js or themes/index.js

import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',  // Enforce light mode
    },
    // You can customize other theme properties here if needed
});

export default lightTheme;

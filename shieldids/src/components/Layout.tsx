// Layout.tsx
//option to make it from sidebar.tsx and navbar.tsx
import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import darkTheme from './darkTheme';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CssBaseline />
                
                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        bgcolor: '#0A0E17',
                        width: '100%',
                        minHeight: '100vh',
                        p: 0,
                        borderRadius: '0',
                        boxShadow: 'none',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Layout;

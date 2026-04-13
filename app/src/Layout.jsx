import { LeftBar } from "./features/layout/components/LeftBar";
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material'
import React from 'react'


export const Layout = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <Box sx={{ display: 'flex' }}>
            <LeftBar open={open} setOpen={setOpen} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 8,
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};
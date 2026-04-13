// Import de react
import React from 'react'
// Importación de estilización
import { styled, useTheme } from '@mui/material/styles';
import { useAuth } from '../../auth/context/AuthContext'
// Importación de iconos
import SummarizeIcon from '@mui/icons-material/Summarize';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaidIcon from '@mui/icons-material/Paid';
import SavingsIcon from '@mui/icons-material/Savings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import BuildIcon from '@mui/icons-material/Build';
import LogoutIcon from '@mui/icons-material/Logout'
import AccountCircle from '@mui/icons-material/AccountCircle';
import ApiIcon from '@mui/icons-material/Api';
// Importación de componentes
import {
    Box, Toolbar, List, CssBaseline, Typography, Divider, IconButton,
    ListItem, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material'
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
    { text: 'Inicio', icon: <SummarizeIcon />, path: '/content' },
    { text: 'Api', icon: <ApiIcon />, path: '/api' },
    { text: 'Gastos', icon: < ReceiptIcon />, path: '/FormGastos' },
];

const accountItems = [
    { text: 'Mi Cuenta', icon: <AccountCircle />, path: '/login' },
]

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar // De mui
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

export const LeftBar = ({ open, setOpen }) => {
    const navigate = useNavigate()
    const theme = useTheme()
    const { estaAutenticado, usuario, logout } = useAuth()

    const handleDrawerOpen = () => setOpen(true)
    const handleDrawerClose = () => setOpen(false)

    const cerrarSesion = () => {
        logout()
        navigate('/login')
    }

    const drawerContent = (
        <>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />

            <List>
                {menuItems.map(({ text, icon, path }) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={() => navigate(path)}
                            sx={[{ minHeight: 48, px: 2.5 }, open ? { justifyContent: 'initial' } : { justifyContent: 'center' }]}
                        >
                            <ListItemIcon sx={[{ minWidth: 0, justifyContent: 'center' }, open ? { mr: 3 } : { mr: 'auto' }]}>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={[open ? { opacity: 1 } : { opacity: 0 }]} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />

            <List>
                {estaAutenticado ? (
                    <>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={[{ minHeight: 48, px: 2.5 }, open ? { justifyContent: 'initial' } : { justifyContent: 'center' }]}
                            >
                                <ListItemIcon sx={[{ minWidth: 0, justifyContent: 'center' }, open ? { mr: 3 } : { mr: 'auto' }]}>
                                    <AccountCircle />
                                </ListItemIcon>
                                <ListItemText
                                    primary={usuario?.nombre}
                                    sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                                />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={cerrarSesion}
                                sx={[{ minHeight: 48, px: 2.5, color: 'error.main' }, open ? { justifyContent: 'initial' } : { justifyContent: 'center' }]}
                            >
                                <ListItemIcon sx={[{ minWidth: 0, justifyContent: 'center', color: 'error.main' }, open ? { mr: 3 } : { mr: 'auto' }]}>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Cerrar Sesión" sx={[open ? { opacity: 1 } : { opacity: 0 }]} />
                            </ListItemButton>
                        </ListItem>
                    </>
                ) : (
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={() => navigate('/login')}
                            sx={[{ minHeight: 48, px: 2.5 }, open ? { justifyContent: 'initial' } : { justifyContent: 'center' }]}
                        >
                            <ListItemIcon sx={[{ minWidth: 0, justifyContent: 'center' }, open ? { mr: 3 } : { mr: 'auto' }]}>
                                <AccountCircle />
                            </ListItemIcon>
                            <ListItemText primary="Iniciar Sesión" sx={[open ? { opacity: 1 } : { opacity: 0 }]} />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
        </>
    )

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ backgroundColor: 'black' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[{ marginRight: 5 }, open && { display: 'none' }]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        App Control de Gastos
                    </Typography>
                </Toolbar>
            </AppBar>

            <MuiDrawer variant="temporary" open={open} onClose={handleDrawerClose} sx={{
                display: { xs: 'block', md: 'none' }
            }}>
                {drawerContent}
            </MuiDrawer>

            <Drawer variant="permanent" open={open} sx={{
                display: { xs: 'none', md: 'block' }
            }}>
                {drawerContent}
            </Drawer>
        </>
    )
}
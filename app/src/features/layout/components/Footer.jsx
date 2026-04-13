import { Box, Typography, Divider } from '@mui/material'

export const Footer = () => {
    return (
        <Box sx={{
            backgroundColor: '#000000',
            color: 'white',
            textAlign: 'center',
            py: 2,
            px: 3,
        }}>
            <Divider color='gray' sx={{ mb: 2 }} />
            <Typography variant='body2' color='gray'>
                © {new Date().getFullYear()} App Control de Gastos
            </Typography>
            <Typography variant='caption' color='gray'>
                React + Node.js + MongoDB
            </Typography>
        </Box>
    )
}
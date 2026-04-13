import React from 'react'
import { Box, TextField, Typography, Button, Divider, Alert } from '@mui/material'
import { useFormValidation } from '../hooks/useFormValidation'
import { useNavigate } from 'react-router-dom';


export const LogIn = () => {
    const { form, setForm, errors, mensaje, logInOk } = useFormValidation()
    const navigate = useNavigate();

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh'
        }}>
            <Box
                sx={{
                    bgcolor: '#000000',
                    borderRadius: '15px',
                    textAlign: 'center',
                    width: { xs: '90%', sm: '60%', md: '40%', lg: '30%' },
                    padding: { xs: '6%', sm: '4%', md: '3%' }
                }}>
                <Typography variant='h5' color='white'>Iniciar Sesión</Typography>
                <Typography variant='body2' color='white' sx={{ marginBottom: '5%' }}>
                    Ingresa a continuación tus datos
                </Typography>
                <Divider color='gray' />
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        margin: '4% 0% 5% 0%',
                        gap: 2
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        value={form.correo}
                        onChange={(e) => setForm({ ...form, correo: e.target.value })}
                        error={!!errors.correo}
                        helperText={errors.correo}
                        id="correo" label="Correo" variant="filled" required
                        fullWidth  
                        sx={{ backgroundColor: '#ffffffd3', borderRadius: '7px' }}
                    />
                    <TextField
                        value={form.contrasena}
                        onChange={(e) => setForm({ ...form, contrasena: e.target.value })}
                        error={!!errors.contrasena}
                        helperText={errors.contrasena}
                        id="contrasena"
                        label="Contraseña" variant="filled" required
                        type='password'
                        fullWidth 
                        sx={{ backgroundColor: '#ffffffd3', borderRadius: '7px' }}
                    />
                </Box>

                {mensaje.texto && (
                    <Alert
                        severity={mensaje.tipo === 'exito' ? 'success' : 'error'}
                        sx={{ marginBottom: '4%' }}
                    >
                        {mensaje.texto}
                    </Alert>
                )}

                <Button
                    onClick={logInOk}
                    variant="outlined" size="medium"
                    sx={{ backgroundColor: 'white', color: 'black', marginBottom: '5%' }}
                >
                    Iniciar Sesión
                </Button>

                <Divider color='gray' />
                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '5%' }}>
                    <Button variant="text" size="small" onClick={() => navigate('/registrar')}>
                        Crear Cuenta
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

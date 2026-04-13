import React from 'react'
import { Box, TextField, Typography, Button, Divider, Alert } from '@mui/material'
import { useRegister } from '../hooks/useRegister'
import { useNavigate } from 'react-router-dom'

export const Registrar = () => {
    const { form, setForm, errors, mensaje, registrar } = useRegister()
    const navigate = useNavigate()

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh'
        }}>
            <Box sx={{
                bgcolor: '#000000',
                borderRadius: '15px',
                textAlign: 'center',
                width: { xs: '90%', sm: '60%', md: '40%', lg: '30%' },
                padding: { xs: '6%', sm: '4%', md: '3%' }
            }}>
                <Typography variant='h5' color='white'>Crear Cuenta</Typography>
                <Typography variant='body2' color='white' sx={{ marginBottom: '5%' }}>
                    Ingresa tus datos para registrarte
                </Typography>
                <Divider color='gray' />

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '4% 0% 5% 0%',
                    gap: 2
                }}>
                    <TextField
                        value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        error={!!errors.nombre}
                        helperText={errors.nombre}
                        label="Nombre completo" variant="filled" required
                        fullWidth
                        sx={{ backgroundColor: '#ffffffd3', borderRadius: '7px' }} />

                    <TextField
                        value={form.correo}
                        onChange={(e) => setForm({ ...form, correo: e.target.value })}
                        error={!!errors.correo}
                        helperText={errors.correo}
                        label="Correo" variant="filled" required
                        fullWidth
                        sx={{ backgroundColor: '#ffffffd3', borderRadius: '7px' }} />

                    <TextField
                        value={form.contrasena}
                        onChange={(e) => setForm({ ...form, contrasena: e.target.value })}
                        error={!!errors.contrasena}
                        helperText={errors.contrasena}
                        label="Contraseña" variant="filled" required type='password'
                        fullWidth
                        sx={{ backgroundColor: '#ffffffd3', borderRadius: '7px' }} />

                    <TextField
                        value={form.confirmarContrasena}
                        onChange={(e) => setForm({ ...form, confirmarContrasena: e.target.value })}
                        error={!!errors.confirmarContrasena}
                        helperText={errors.confirmarContrasena}
                        label="Confirmar contraseña" variant="filled" required type='password'
                        fullWidth
                        sx={{ backgroundColor: '#ffffffd3', borderRadius: '7px' }} />
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
                    onClick={registrar}
                    variant="outlined" size="medium"
                    sx={{ backgroundColor: 'white', color: 'black', marginBottom: '5%' }}
                >
                    Crear Cuenta
                </Button>

                <Divider color='gray' />

                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '5%' }}>
                    <Button onClick={() => navigate('/login')} variant="text" size="small">
                        Iniciar sesión
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
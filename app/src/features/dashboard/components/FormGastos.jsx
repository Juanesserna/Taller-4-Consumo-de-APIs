import React from 'react'
import {
    Box, Typography, TextField, Button, MenuItem,
    Alert, CircularProgress, Divider, Chip, IconButton, Paper
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useGastos } from '../../context/hooks/useGastos'

const CATEGORIAS = ['Alimentación', 'Transporte', 'Entretenimiento', 'Salud', 'Educación', 'Otros']

const COLORES_CATEGORIA = {
    'Alimentación': 'success',
    'Transporte': 'primary',
    'Entretenimiento': 'secondary',
    'Salud': 'error',
    'Educación': 'warning',
    'Otros': 'default'
}

export const FormGastos = () => {
    const { gastos, cargando, mensaje, form, setForm, crearGasto, eliminarGasto } = useGastos()
    const totalGastos = gastos.reduce((acc, gasto) => acc + gasto.monto, 0)

    return (
        <Box sx={{ maxWidth: 800, margin: '0 auto', p: 2 }}>

            {/* ── Título ── */}
            <Typography variant='h4' fontWeight='bold' mb={3}>
                Control de Gastos
            </Typography>

            {/* ── Formulario ── */}
            <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
                <Typography variant='h6' mb={2}>Registrar nuevo gasto</Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Descripción"
                        value={form.descripcion}
                        onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                        variant="outlined"
                        fullWidth
                    />

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="Monto"
                            type="number"
                            value={form.monto}
                            onChange={(e) => setForm({ ...form, monto: e.target.value })}
                            variant="outlined"
                            fullWidth
                        />

                        <TextField
                            label="Categoría"
                            select
                            value={form.categoria}
                            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                            variant="outlined"
                            fullWidth
                        >
                            {CATEGORIAS.map((cat) => (
                                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    <TextField
                        label="Fecha"
                        type="date"
                        value={form.fecha}
                        onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />

                    {mensaje.texto && (
                        <Alert severity={mensaje.tipo === 'exito' ? 'success' : 'error'}>
                            {mensaje.texto}
                        </Alert>
                    )}

                    <Button
                        onClick={crearGasto}
                        variant="contained"
                        size="large"
                        sx={{ backgroundColor: 'black' }}
                    >
                        Registrar Gasto
                    </Button>
                </Box>
            </Paper>

            {/* ── Total ── */}
            <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 3, backgroundColor: '#f5f5f5' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='h6'>Total de gastos</Typography>
                    <Typography variant='h5' fontWeight='bold' color='error'>
                        ${totalGastos.toLocaleString('es-CO')}
                    </Typography>
                </Box>
            </Paper>

            {/* ── Lista de gastos ── */}
            <Typography variant='h6' mb={2}>Mis gastos</Typography>

            {cargando ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : gastos.length === 0 ? (
                <Typography color='text.secondary' textAlign='center' mt={4}>
                    No tienes gastos registrados aún
                </Typography>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {gastos.map((gasto) => (
                        <Paper key={gasto._id} elevation={2} sx={{ p: 2, borderRadius: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                                <Box>
                                    <Typography fontWeight='bold'>{gasto.descripcion}</Typography>
                                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5, alignItems: 'center' }}>
                                        <Chip
                                            label={gasto.categoria}
                                            color={COLORES_CATEGORIA[gasto.categoria]}
                                            size='small'
                                        />
                                        <Typography variant='body2' color='text.secondary'>
                                            {new Date(gasto.fecha).toLocaleDateString('es-CO')}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography fontWeight='bold' fontSize={18}>
                                        ${gasto.monto.toLocaleString('es-CO')}
                                    </Typography>
                                    <IconButton
                                        onClick={() => eliminarGasto(gasto._id)}
                                        color='error'
                                        size='small'
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>

                            </Box>
                        </Paper>
                    ))}
                </Box>
            )}
        </Box>
    )
}

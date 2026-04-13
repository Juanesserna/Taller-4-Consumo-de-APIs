import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Grid, Typography, CardMedia, Button, TextField, Chip } from '@mui/material'

export const ApiRyC_Axios = () => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [info, setInfo] = useState({})
    const [query, setQuery] = useState('')

    useEffect(() => {
        const source = axios.CancelToken.source()
        axios.get('https://rickandmortyapi.com/api/character', {
            params: { page, name: query },
            CancelToken: source.token
        })
            .then(({ data }) => {
                setData(data.results || [])
                setInfo(data.info || {})
            })
            .catch((err) => {
                if (axios.isCancel(err)) return
                if (err.response?.status === 404) {
                    setData([])
                    setInfo({})
                    return
                }
            })
        return () => source.cancel()
    }, [page, query])

    return (
        <Box sx={{ p: { xs: 1, md: 3 } }}>

            <Typography variant='h4' fontWeight='bold' textAlign='center' mb={1}>
                Rick & Morty
            </Typography>
            <Typography variant='body2' color='text.secondary' textAlign='center' mb={3}>
                Explora los personajes de la serie
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <TextField
                    placeholder='Buscar personaje...'
                    value={query}
                    onChange={(e) => { setQuery(e.target.value.trim()); setPage(1) }}
                    variant='outlined'
                    size='small'
                    sx={{ width: { xs: '100%', sm: '400px' } }}
                />
            </Box>

            {data.length === 0 && (
                <Typography textAlign='center' color='text.secondary' mt={4}>
                    No se encontraron personajes
                </Typography>
            )}

            <Grid container spacing={3} justifyContent='center' sx={{
                backgroundColor: '#1e1e1efe',
                padding: '2% 1% 2% 1%',
                borderRadius: '15px'
            }}>
                {data.map(char => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={char.id}>
                        <Box sx={{
                            backgroundColor: '#0f0f0f',
                            borderRadius: 2,
                            overflow: 'hidden',
                            boxShadow: '0px 4px 12px rgba(0,0,0,0.4)',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'translateY(-4px)' }
                        }}>
                            <CardMedia
                                component='img'
                                image={char.image}
                                alt={char.name}
                                height='220'
                                sx={{ objectFit: 'cover' }}
                            />
                            <Box sx={{ p: 1.5 }}>
                                <Typography variant='subtitle1' color='white' fontWeight='bold' noWrap>
                                    {char.name}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                                    <Chip
                                        label={char.status}
                                        size='small'
                                        color={char.status === 'Alive' ? 'success' : char.status === 'Dead' ? 'error' : 'default'}
                                    />
                                    <Chip label={char.gender} size='small' variant='outlined' sx={{ color: 'white', borderColor: 'gray' }} />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 4, mb: 2 }}>
                <Button
                    variant='outlined'
                    onClick={() => setPage(page - 1)}
                    disabled={!info.prev}
                    sx={{ color: 'black', borderColor: 'black' }}
                >
                    Anterior
                </Button>
                <Typography variant='body2'>Página {page} de {info.pages || 1}</Typography>
                <Button
                    variant='outlined'
                    onClick={() => setPage(page + 1)}
                    disabled={!info.next}
                    sx={{ color: 'black', borderColor: 'black' }}
                >
                    Siguiente
                </Button>
            </Box>

        </Box>
    )
}
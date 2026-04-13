import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography, CardMedia, Button } from '@mui/material'

export const ApiRyC = () => {
    const [data, setData] = useState(null)
    const [page, setPage] = useState(1)
    const [info, setInfo] = useState({})

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
            .then(response => response.json())
            .then(data => {
                setData(data.results)
                setInfo(data.info)
            })
    }, [page]);


    return (
        <Box sx={{
            flexGrow: 1,
            textAlign: 'center'
        }}>
            <Typography variant='h4' sx={{
                marginBottom: '3%',
                fontFamily: 'sans-serif'
            }}>ApiRyM {() => setPage(page + 1)}</Typography>
            <Grid container spacing={8}>
                {data?.map(char => (
                    <Box key={char.id} sx={{
                        backgroundColor: '#0f0f0f',
                        paddingBottom: '0.5%',
                        boxShadow: '5px 5px 10px 2px rgba(0, 0, 0, 0.47)',
                        borderRadius: '2%',
                    }}>
                        <Typography variant='h6' color='white'>{char.name} </Typography>
                        <CardMedia component="img" image={char.image} alt={char.name} height='300' />
                        <Typography variant='body1' color='white'>{char.gender}</Typography>
                    </Box>
                ))
                }
            </Grid >
            <Box sx={{
                marginTop: '2%',
                marginBottom: '-2%',
                alignItems: 'center'
            }}>
                {/* Botones de navegación */}
                <Button color='black' onClick={() => setPage(page - 1)} disabled={!info.prev}>Anterior</Button>
                <span>Pagina {page}</span>
                <Button color='black' onClick={() => setPage(page + 1)} disabled={!info.next}>Siguiente</Button>
            </Box>
        </Box >
    )
}

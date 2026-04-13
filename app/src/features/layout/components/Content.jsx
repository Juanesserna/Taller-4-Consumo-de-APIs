import React from 'react'
import { Box, Typography, Card, CardContent, CardActionArea, CardMedia, Divider } from '@mui/material'

const cards = [
    { id: 1, title: 'Manejo', description: '$400.000', imagen: '/img/manejo.jpg' },
    { id: 2, title: 'Seguridad', description: '$2.500.000', imagen: '/img/seguridad.jpg' },
    { id: 3, title: 'Celular', description: '$300.000', imagen: '/img/celular.jpg' },
    { id: 4, title: 'Ingresos', description: '$500.000', imagen: '/img/stocks.jpg' },
]

const steps = [
    { id: '01', title: 'Registra tus ingresos', description: 'Añade cada movimiento en segundos desde cualquier dispositivo' },
    { id: '02', title: 'Registra tus gastos', description: 'Añade cada movimiento en segundos desde cualquier dispositivo' },
    { id: '03', title: 'Visualiza tus categorias', description: 'Mira exactamente en que se va tu dinero cada mes' },
    { id: '04', title: 'Toma mejores decisiones', description: 'Detecta habitos y ajusta tu presupuesto con claridad' },
]

export const Content = () => {
    const [selectedCard, setSelectedCard] = React.useState(0)

    return (
        <Box>
            <Box sx={{ textAlign: 'center', py: 6 }}>
                <CardMedia
                    component="img"
                    image="/img/img-landing.jpg"
                    alt="Inicio"
                    sx={{ borderRadius: 2, height: { xs: 160, sm: 220 }, objectFit: 'cover', mb: 3 }}
                />
                <Typography variant="overline" color="text.secondary">
                    Control financiero personal
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480, mx: 'auto' }}>
                    Registra tus gastos, entiende tus habitos y toma mejores decisiones cada mes
                </Typography>
            </Box>

            <Divider />
            <Box sx={{ textAlign: 'center', py: 6 , backgroundColor:'#aeaeae' }}>
                <Typography variant="overline" color="black">
                    Github
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480, mx: 'auto' }}>
                    https://github.com/Juanesserna/Taller-4-React.git
                </Typography>
            </Box>
            <Divider />

            <Box sx={{ py: 4 }}>
                <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">
                    Ventajas de Nuestra App
                </Typography>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: '1fr 1fr',
                        md: '1fr 1fr 1fr 1fr'
                    },
                    gap: 2
                }}>
                    {cards.map((card, index) => (
                        <Card key={card.id}>
                            <CardActionArea
                                onClick={() => setSelectedCard(index)}
                                data-active={selectedCard === index ? '' : undefined}
                                sx={{
                                    height: '100%',
                                    '&[data-active]': {
                                        backgroundColor: 'action.selected',
                                    },
                                }}
                            >
                                <CardMedia component="img" height="200" image={card.imagen} alt={card.title} />
                                <CardContent>
                                    <Typography variant="h6" textAlign="center">{card.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">{card.description}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Box>
            </Box>

            <Divider />

            <Box sx={{ py: 4 }}>
                <Typography variant="subtitle1" color="text.secondary" mb={0.5}>
                    Como funciona
                </Typography>
                <Typography variant="h5" fontWeight={600} mb={3}>
                    Algunos pasos para empezar
                </Typography>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: '1fr 1fr',
                        md: '1fr 1fr 1fr 1fr'
                    },
                    gap: 3
                }}>
                    {steps.map((step) => (
                        <Box key={step.id}>
                            <Typography variant="h3" color="text.disabled" fontWeight={700}>
                                {step.id}
                            </Typography>
                            <Typography variant="subtitle1" fontWeight={600}>
                                {step.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {step.description}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}
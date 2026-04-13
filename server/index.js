const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config({
    path: ".env"
});

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Conexión a MongoDB
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.log('Error con la conexión:', err))

// Rutas
const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)

const gastosRoutes = require('./routes/gastos')
app.use('/api/gastos', gastosRoutes)

// Iniciar servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
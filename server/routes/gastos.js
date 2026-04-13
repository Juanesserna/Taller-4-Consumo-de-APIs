const express = require('express')
const router = express.Router()
const Gasto = require('../models/gastos')
const verificarToken = require('../middleware/auth')

router.use(verificarToken)

// se crea el gasto
router.post('/', async (req, res) => {
    try {
        const { descripcion, monto, categoria, fecha } = req.body

        const nuevoGasto = new Gasto({
            usuario: req.usuario.id,
            descripcion,
            monto,
            categoria,
            fecha
        })

        await nuevoGasto.save()
        res.status(201).json({ mensaje: 'Gasto registrado', gasto: nuevoGasto })

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar gasto', error })
    }
})

// consulta gastos del usuario
router.get('/', async (req, res) => {
    try {
        const gastos = await Gasto.find({ usuario: req.usuario.id })
            .sort({ fecha: -1 }) 

        res.status(200).json(gastos)

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener gastos', error })
    }
})

// elimina gasto
router.delete('/:id', async (req, res) => {
    try {
        const gasto = await Gasto.findOneAndDelete({
            _id: req.params.id,
            usuario: req.usuario.id
        })

        if (!gasto) {
            return res.status(404).json({ mensaje: 'Gasto no encontrado' })
        }

        res.status(200).json({ mensaje: 'Gasto eliminado' })

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar gasto', error })
    }
})

module.exports = router
const mongoose = require('mongoose')

const gastoSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId, //guarda el id de quien lo creo
        ref: 'User', // indica el modelo user
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    categoria: {
        type: String,
        enum: ['Alimentación', 'Transporte', 'Entretenimiento', 'Salud', 'Educación', 'Otros'],
        default: 'Otros'
    },
    fecha: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

module.exports = mongoose.model('Gasto', gastoSchema)
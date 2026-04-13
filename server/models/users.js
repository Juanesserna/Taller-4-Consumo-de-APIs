const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    contrasena: {
        type: String,
        required: true
    },
    tokenRecuperacion: {
        type: String,
        default: null
    },
    tokenExpiracion: {
        type: Date,
        default: null
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
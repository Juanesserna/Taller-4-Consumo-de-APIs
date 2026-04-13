const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

// se define ruta para registrar
router.post('/registro', async (req, res) => {
    try {
        const { nombre, correo, contrasena } = req.body

        // verifica el correo enviado en la solicitud
        const usuarioExiste = await User.findOne({ correo })
        if (usuarioExiste) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado' })
        }

        // con bcrypt hashea la contraseña para que no sea visible al 100% en la base de datos
        const salt = await bcrypt.genSalt(10)
        const contrasenaHasheada = await bcrypt.hash(contrasena, salt)

        // crea el usuario
        const nuevoUsuario = new User({
            nombre,
            correo,
            contrasena: contrasenaHasheada
        })

        await nuevoUsuario.save()

        res.status(201).json({ mensaje: 'Usuario creado exitosamente' })

    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error })
    }
})

// Valida el inicio de sesión
router.post('/login', async (req, res) => {
    try {
        const { correo, contrasena } = req.body

        // busca el usuario
        const usuario = await User.findOne({ correo })
        if (!usuario) {
            return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' })
        }

        // valida la contraseña
        const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena)
        if (!contrasenaValida) {
            return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' })
        }

        // genera JWT
        const token = jwt.sign(
            { id: usuario._id, nombre: usuario.nombre },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        )

        // respuesta exitosa (solo si se valido correctamente)
        res.status(200).json({
            mensaje: 'Login exitoso',
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                correo: usuario.correo
            }
        })

    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error })
    }
})

// solicita token
router.post('/recuperar', async (req, res) => {
    try {
        const { correo } = req.body

        const usuario = await User.findOne({ correo })
        if (!usuario) {
            return res.status(404).json({ mensaje: 'No existe una cuenta con ese correo' })
        }

        // genera codigo 
        const codigo = Math.floor(100000 + Math.random() * 900000).toString()

        // guarda codigo y expiración
        usuario.tokenRecuperacion = codigo
        usuario.tokenExpiracion = new Date(Date.now() + 15 * 60 * 1000)
        await usuario.save()

        res.status(200).json({
            mensaje: 'Código de recuperación generado',
            codigo
        })

    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error })
    }
})

// restablece contraseña
router.post('/restablecer', async (req, res) => {
    try {
        const { correo, codigo, nuevaContrasena } = req.body

        const usuario = await User.findOne({ correo })
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Correo no encontrado' })
        }

        // valida codigo
        if (usuario.tokenRecuperacion !== codigo) {
            return res.status(400).json({ mensaje: 'Código incorrecto' })
        }

        // valida expiración
        if (new Date() > usuario.tokenExpiracion) {
            return res.status(400).json({ mensaje: 'El código ha expirado, solicita uno nuevo' })
        }

        const salt = await bcrypt.genSalt(10)
        const contrasenaHasheada = await bcrypt.hash(nuevaContrasena, salt)

        usuario.contrasena = contrasenaHasheada
        usuario.tokenRecuperacion = null
        usuario.tokenExpiracion = null
        await usuario.save()

        res.status(200).json({ mensaje: 'Contraseña actualizada exitosamente' })

    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error })
    }
})

module.exports = router
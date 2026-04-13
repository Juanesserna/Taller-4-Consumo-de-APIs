import { useState } from 'react'
import axios from 'axios'

export const useRegister = () => {

    const [form, setForm] = useState({
        nombre: '',
        correo: '',
        contrasena: '',
        confirmarContrasena: ''
    })

    const [errors, setErrors] = useState({
        nombre: '',
        correo: '',
        contrasena: '',
        confirmarContrasena: ''
    })

    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' })

    // se genera la validación de los campos de registro
    const validar = () => {
        let newErrors = { nombre: '', correo: '', contrasena: '', confirmarContrasena: '' }
        let valido = true

        if (!form.nombre) {
            newErrors.nombre = 'El nombre es obligatorio'
            valido = false
        }

        if (!form.correo) {
            newErrors.correo = 'El correo es obligatorio'
            valido = false
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
            newErrors.correo = 'Correo inválido'
            valido = false
        }

        if (!form.contrasena) {
            newErrors.contrasena = 'La contraseña es obligatoria'
            valido = false
        } else if (form.contrasena.length < 6) {
            newErrors.contrasena = 'Mínimo 6 caracteres'
            valido = false
        }

        if (!form.confirmarContrasena) {
            newErrors.confirmarContrasena = 'Confirma tu contraseña'
            valido = false
        } else if (form.contrasena !== form.confirmarContrasena) {
            newErrors.confirmarContrasena = 'Las contraseñas no coinciden'
            valido = false
        }

        setErrors(newErrors)
        return valido
    }

    // se genera una función async donde se consume mediante axios el endpoint de registrar
    const registrar = async () => {
        if (!validar()) return

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}api/auth/registro`, {
                nombre: form.nombre,
                correo: form.correo,
                contrasena: form.contrasena
            })

            setMensaje({ texto: response.data.mensaje, tipo: 'exito' })
            setForm({ nombre: '', correo: '', contrasena: '', confirmarContrasena: '' })

        } catch (error) {
            const msg = error.response?.data?.mensaje || 'Error al registrar'
            setMensaje({ texto: msg, tipo: 'error' })
        }
    }

    return { form, setForm, errors, mensaje, registrar }
}
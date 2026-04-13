import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const useFormValidation = () => {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [form, setForm] = useState({ correo: '', contrasena: '' })
    const [errors, setErrors] = useState({ correo: '', contrasena: '' })
    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' })

    const validar = () => {
        let newErrors = ({ correo: '', contrasena: '' })
        let validate = true

        if (!form.correo) {
            newErrors.correo = 'Correo obligatorio'
            validate = false
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
            newErrors.correo = 'Correo invalido'
            validate = false
        }

        if (!form.contrasena) {
            newErrors.contrasena = 'Contraseña obligatoria'
            validate = false
        } else if (form.contrasena.length < 6) {
            newErrors.contrasena = 'Contraseña invalida'
            validate = false
        }
        setErrors(newErrors)
        return validate
    }

    const logInOk = async () => {
        if (!validar()) return

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}api/auth/login`, {
                correo: form.correo,
                contrasena: form.contrasena
            })

            // guarda el contexto global
            login(response.data.usuario, response.data.token)

            // redirección al formulario de gastos
            navigate('/formgastos')
        } catch (error) {
            const msg = error.response?.data?.mensaje || 'Error al iniciar sesión'
            setMensaje({ texto: msg, tipo: 'error' })
        }
    }

    return { form, setForm, errors, mensaje, logInOk }
}




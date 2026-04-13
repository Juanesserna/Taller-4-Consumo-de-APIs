import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../auth/context/AuthContext'

export const useGastos = () => {
    const { token } = useAuth()

    const [gastos, setGastos] = useState([])
    const [cargando, setCargando] = useState(false)
    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' })

    const [form, setForm] = useState({
        descripcion: '',
        monto: '',
        categoria: 'Otros',
        fecha: new Date().toISOString().split('T')[0]
    })

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    // función obtener información gastos
    const obtenerGastos = async () => {
        setCargando(true)
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}api/gastos`, config)
            setGastos(response.data)
        } catch (error) {
            setMensaje({ texto: 'Error al cargar gastos', tipo: 'error' })
        } finally {
            setCargando(false) 
        }
    }

    // Crear gasto
    const crearGasto = async () => {
        if (!form.descripcion || !form.monto) {
            setMensaje({ texto: 'Descripción y monto son obligatorios', tipo: 'error' })
            return
        }

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}api/gastos`, form, config)
            setMensaje({ texto: 'Gasto registrado exitosamente', tipo: 'exito' })
            setForm({
                descripcion: '',
                monto: '',
                categoria: 'Otros',
                fecha: new Date().toISOString().split('T')[0]
            })
            obtenerGastos() 
        } catch (error) {
            setMensaje({ texto: 'Error al registrar gasto', tipo: 'error' })
        }
    }

    // eliminar gasto
    const eliminarGasto = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}api/gastos/${id}`, config)
            setMensaje({ texto: 'Gasto eliminado', tipo: 'exito' })
            obtenerGastos()  // Refresca la lista
        } catch (error) {
            setMensaje({ texto: 'Error al eliminar gasto', tipo: 'error' })
        }
    }

    useEffect(() => {
        obtenerGastos()
    }, [])

    return { gastos, cargando, mensaje, form, setForm, crearGasto, eliminarGasto }
}
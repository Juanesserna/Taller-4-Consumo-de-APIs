import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null)
    const [token, setToken] = useState(null)

    const login = (datosUsuario, tokenJWT) => {
        setUsuario(datosUsuario)
        setToken(tokenJWT)
    }

    const logout = () => {
        setUsuario(null)
        setToken(null)
    }

    const estaAutenticado = !!usuario

    return (
        <AuthContext.Provider value={{ usuario, token, login, logout, estaAutenticado }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
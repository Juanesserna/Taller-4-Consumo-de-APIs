import { Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "../Layout"
import { Footer } from '../features/layout/components/Footer'
import { Content } from '../features/layout/components/Content'
import { LogIn } from "../features/auth/components/LogIn"
import { Registrar } from "../features/auth/components/Registrar"
import { FormGastos } from '../features/dashboard/components/FormGastos'
import { ApiRyC_Axios } from "../features/api/components/ApiRyC_Axios"
import { RutaProtegida } from "../features/auth/components/RutaProtegida"

export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Navigate to="/content" replace />} />
                    <Route path='/content' element={<Content />} />
                    <Route path='/login' element={<LogIn />} />
                    <Route path='/registrar' element={<Registrar />} />
                    <Route path='/api' element={<ApiRyC_Axios />} />
                    <Route path='/formgastos' element={
                        <RutaProtegida>
                            <FormGastos />
                        </RutaProtegida>
                    } />
                </Route>
            </Routes>
            <Footer />
        </>
    )
}
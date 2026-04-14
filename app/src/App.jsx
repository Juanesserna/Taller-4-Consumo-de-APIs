import { HashRouter } from "react-router-dom"
import { AppRoutes } from "./routes/Routes"

function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  )
}
// ...

export default App

import React from 'react'

export const App = () => {
  return useContext(FavortiteContext)
}

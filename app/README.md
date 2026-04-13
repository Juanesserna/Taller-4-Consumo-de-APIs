# App Control de Gastos

## Descripcion

Aplicacion web para el control de gastos personales. Permite a los usuarios registrar, visualizar y eliminar sus gastos categorizados.

## Caracteristicas principales

- Registro e inicio de sesion de usuarios con contrasena hasheada
- Autenticacion mediante JSON Web Tokens
- Registro de gastos con descripcion, monto, categoria y fecha
- Visualizacion del total de gastos y listado por usuario
- Eliminacion de gastos
- Diseno responsive para movil y escritorio
- Uso de API de Rick and Morty

## Instalacion

### Requisitos previos

- Node.js v18
- MongoDB Atlas
- npm
- Node

### Variables de entorno

Exite el archivo ".env" dentro de la carpeta "backend" con el siguiente contenido:

MONGODB_URI=mongodb+srv://usuario:contrasena@cluster.....
PORT=3000
JWT_SECRET=ejemplode contraseña

## Ejecucion

### Backend

cd backend
node index.js


### Frontend

Desde la raiz del proyecto:

npm run dev


La aplicacion estara disponible en "http://localhost:5173"

## Tecnologias

| Capa | Tecnologia |
|------|-----------|
| Frontend | React 18, Vite, React Router DOM |
| UI | Material UI (MUI) v6 |
| Backend | Node.js, Express |
| Base de datos | MongoDB Atlas, Mongoose |
| Autenticacion | JSON Web Tokens (JWT), bcryptjs |
| HTTP Client | Axios |
| PWA | vite-plugin-pwa |

## Arquitectura y encarpetado

```
app/                              # Frontend
├── public/
│   └── img/                      # Imagenes
├── src/
│   ├── features/
│   │   ├── api/
│   │   │   └── components/       # Componente de Rick and Morty API
│   │   ├── auth/
│   │   │   ├── components/       # Login, Registrar, RutaProtegida
│   │   │   ├── context/          # AuthContext
│   │   │   └── hooks/            # useFormValidation, useRegister
│   │   ├── context/
│   │   │   ├── components/       
│   │   │   └── hooks/            # useGastos
│   │   └── layout/
│   │       └── components/       # LeftBar, Footer, Content
│   ├── routes/
│   │   └── AppRoutes.jsx         # Rutas
│   ├── App.jsx                   # Punto de entrada del enrutador
│   ├── Layout.jsx                # Estructura principal con sidebar
│   └── main.jsx                  # Punto de entrada de React
├── index.html
├── vite.config.js
└── package.json

server/                           # Backend
├── middleware/
│   └── auth.js                   # Verificacion de JWT
├── models/
│   ├── users.js                  # Modelo de usuario
│   └── gasto.js                  # Modelo de gasto
├── routes/
│   ├── auth.js                   # Endpoints de autenticacion
│   └── gastos.js                 # Endpoints de gastos
├── .env                          # Variables de entorno
├── index.js                      # Servidor principal
└── serve.js
```

## Screenshot de la interfaz

### Landing / Inicio
![Landing](public/img/screenshot.png)

## Autor

- Juan Esteban Serna Grajales
- Analisis y Desarrollo de Software
- SENA
- Trimestre: 3
- juanesserna191@gmail.com

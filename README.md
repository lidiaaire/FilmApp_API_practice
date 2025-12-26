🎬 FilmApp API

API REST desarrollada con Node.js, Express y MongoDB como proyecto final del módulo de Backend.
La aplicación permite gestionar usuarios, autenticación, películas, favoritos, comentarios y valoraciones, aplicando buenas prácticas de seguridad y arquitectura.

🚀 Tecnologías utilizadas

Node.js

Express

MongoDB + Mongoose

JWT (access token + refresh token)

Bcrypt

Nodemailer

Swagger

Mailtrap

📁 Estructura del proyecto
backend/
└── src/
    ├── app.js
    ├── server.js
    ├── controllers/
    ├── routes/
    ├── models/
    ├── middlewares/
    ├── services/
    └── config/



controllers → lógica

routes → endpoints

models → esquemas de MongoDB

middlewares → autenticación, roles, validaciones

services → servicios externos (email)

🔐 Autenticación y seguridad

Registro y login de usuarios

Autenticación mediante JWT

Implementación de refresh token

Contraseñas encriptadas con bcrypt

Middleware para:

proteger rutas

controlar roles (admin / user)

validar ObjectId

🎬 Funcionalidades principales

Gestión de usuarios

Sistema de autenticación completo

CRUD de películas (protegido por rol)

Sistema de favoritos por usuario

Paginación de resultados

Sistema de comentarios en películas

Cálculo de media de valoraciones mediante MongoDB Aggregation

Envío de email de bienvenida al registrarse

📧 Envío de emails

Al registrarse un usuario, la API envia un email de bienvenida utilizando Nodemailer.

En entorno de desarrollo se utiliza Mailtrap

📄 Documentación

La API está documentada mediante Swagger.

Una vez el servidor está en marcha, la documentación está disponible en:

http://localhost:3001/api-docs

⚙️ Variables de entorno

Crear un archivo .env en la raíz del backend con las siguientes variables:

PORT=3001
MONGO_URI=tu_uri_de_mongodb

JWT_SECRET=tu_secreto_jwt
JWT_REFRESH_SECRET=tu_secreto_refresh

EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=xxxx
EMAIL_PASS=xxxx
EMAIL_FROM=FilmApp <no-reply@filmapp.com>

▶️ Cómo ejecutar el proyecto

Instalar dependencias:

npm install


Ejecutar en desarrollo:

npm run dev


El servidor se iniciará en:

http://localhost:3001

📌 Endpoints

👉 Todos los endpoints disponibles y probados están documentados en el archivo:

ENDPOINTS.md

------------------------------------------------------------------------------------------

💬 Este proyecto está diseñado como base backend independiente, listo para ser consumido por cualquier cliente (web o móvil), y enfocado en demostrar conocimientos sólidos de desarrollo backend.

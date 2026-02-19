# 📦 Mongo E-commerce (Backend)

API REST de e-commerce construida con Node.js, Express y MongoDB siguiendo arquitectura profesional con DAO, Repository, DTO, validación, roles y lógica de negocio robusta.

---

## 🚀 Tecnologías usadas

- ✔️ Node.js
- ✔️ Express
- ✔️ MongoDB + Mongoose (ODM)
- ✔️ JWT para autenticación
- ✔️ Nodemailer para mails
- ✔️ Crypto UUID
- ✔️ Patrones de diseño: DAO / Repository / DTO
- ✔️ Manejo de roles y autorización
- ✔️ Env variables con .env
- ✔️ API REST con paginación

---

## 📁 Estructura principal

```
src/
 ├── config/          Configuracion de passport, inicio de moongose, mailer y env
 ├── controllers/     API endpoints
 ├── daos/            Acceso a base de datos (Mongoose)
 ├── dtos/            Transformadores de datos
 ├── error/           Manejo de errores personalizado
 ├── middleware/      Auth y validaciones
 ├── models/          Mongoose schemas
 ├── public/          HTML, JS
 ├── repositories/    Abstracción de datos
 ├── routes/          Rutas de la API
 └── services/        Lógica de negocio
```

---

### 📌 Características principales

## 🧑‍🔒 Autenticación y roles

- Registro y login de usuarios

- Roles user y admin

- Middleware de autorización para proteger endpoints

- Endpoint /current que devuelve datos seguros del usuario

## 📦 Gestión de productos

- CRUD completo de productos

- Paginación, filtros por categoría, estado, búsqueda por query

- Ordenamiento por precio

## 🛒 Carrito de compras

- Obtener o crear carrito para usuario

- Agregar y remover productos

- Lógica de stock y validación de cantidades

## 🧾 Tickets de compra

- Generación de ticket al procesar compra

- Cálculo de totales/subtotales

- Ticket histórico independiente de productos

## 📨 Envío de mails

- Confirmación de compra al usuario

- Contenido personalizado incluyendo productos comprados y total

---

## 🧠 Arquitectura y mejores prácticas

El proyecto sigue patrones de arquitectura profesional:

Capa -> Responsabilidad

DAO -> CRUD directo con Mongoose

Repository -> Abstracción de persistencia

Service -> Lógica de negocio y reglas

DTO -> Transformación de datos para salida

Controller -> Responde al cliente

> Esto permite separación de responsabilidades, testabilidad y mantenibilidad.

---

## 📥 Instalación y uso

1. Clonar el repositorio:
   `git clone https://github.com/CesValde/MongoE-commerce.git`

2. Entrar al proyecto:
   `cd MongoE-commerce`

3. Instalar dependencias:
   ` npm install`

4. Crear .env a partir de .envExample:

   ```PORT=<tu puerto>
   MONGODB_URI=<tu Mongo URI>
   JWT_SECRET=<secreto JWT>
   MAIL_USER=<mail para nodemailer>
   MAIL_PASS=<contraseña mail>
   ```

5. Iniciar:
   `npm run dev`

---

## 📍 Endpoints principales (algunos ejemplos)

## 👤 Usuarios

`POST /api/auth/login – Login`

`GET /api/users – Listar usuarios`

`GET /api/users/:id – Usuario por ID`

## 🛍️ Productos

`GET /api/products – Listar con filtros/paginación`

`POST /api/products – Crear producto`

`PUT /api/products/:pid – Actualizar producto`

`DELETE /api/products/:pid – Eliminar producto`

## 🛒 Carrito

`GET /api/carts – Ver carrito`

`POST /api/carts – Agregar producto`

`DELETE /api/carts/products/:pid – Quitar producto`

## 🧾 Compra / Tickets

`POST /api/carts/:cid/purchase – Procesar compra y generar ticket`

### 🧪 Puntos de mejora (posibles)

- Agregar tests automáticos (jest / supertest)

- Documentación OpenAPI / Swagger

- Integración de pago externo (MercadoPago / Stripe)

- Frontend independiente (React/Vue/Next)

---

### 📦 Resultado

Este backend ofrece una API completa para un e-commerce con:

- Control de stock

- Carrito persistente

- Manejo seguro de roles

- Confirmación de compra vía correo

- Arquitectura profesional escalable

---

**Autor**

```
Cesar Valderrama - CesValde
```

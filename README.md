# Movie Management API

API para gestión de películas desarrollada con Node.js, Express, Prisma, PostgreSQL y TypeScript siguiendo buenas prácticas de desarrollo.

## 🚀 Características

- **Autenticación JWT**: Login y registro de usuarios
- **Gestión de Películas**: CRUD completo con categorías
- **Filtros y Paginación**: Búsqueda avanzada de películas
- **Novedades**: Películas estrenadas en las últimas 3 semanas
- **Sistema de Vistas**: Marcar películas como vistas
- **Arquitectura Limpia**: Modelo MVC y Clean Architecture
- **TypeScript**: Un poco de tipado

## 🛠️ Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **Prisma** - ORM para base de datos
- **PostgreSQL** - Base de datos (Neon)
- **TypeScript** - Tipado estático

## 📋 Requisitos

- Node.js 20+
- PostgreSQL (o cuenta en Neon)
- npm

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Uber830/movie-management-api.git
cd movie-management-api
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp env.example .env
```

Editar el archivo `.env` con tus configuraciones.

4. **Configurar base de datos**
```bash
# Generar cliente de Prisma
npm run db:generate

# Aplicar migraciones
npm run db:migrate
```

5. **Iniciar servidor**
```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

## 📊 Estructura del Proyecto

```
src/
├── controllers/     # Controladores MVC
├── services/        # Lógica de negocio
├── models/          # Modelos de datos
├── middleware/      # Middlewares de Express
├── routes/          # Definición de rutas
├── utils/           # Utilidades y helpers
├── types/           # Tipos TypeScript
└── index.ts         # Punto de entrada
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

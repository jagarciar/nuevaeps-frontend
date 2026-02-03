# 🏥 NuevaEPS Frontend - Aplicación React

Frontend React de NuevaEPS - Sistema de gestión de solicitudes de medicamentos con autenticación JWT y containerizado con Docker.

> **Nota**: Este es un repositorio independiente. Para la configuración completa del proyecto con Docker Compose, consulta el [repositorio principal de NuevaEPS](../README.md).

## 📋 Contenido

- [Requisitos](#requisitos)
- [Características](#características-principales)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación-y-ejecución)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Scripts Disponibles](#-scripts-disponibles)
- [Autenticación](#-autenticación-jwt)
- [Componentes](#-componentes-principales)
- [API Endpoints](#-api-endpoints-utilizados)
- [Containerización](#-containerización)
- [Testing](#-testing)

---

## ✅ Requisitos

- **Node.js 20+** (para desarrollo local)
- **npm 10+** o **yarn**
- **Backend ejecutándose** en `http://localhost:8080` (para desarrollo local)
- **Docker y Docker Compose** (para ejecución containerizada)

---

## ✨ Características Principales

- ✅ **Autenticación Segura**: Login y registro con JWT
- ✅ **Panel de Solicitudes**: Visualiza todas tus solicitudes de medicamentos
- ✅ **Crear Solicitudes**: Solicita medicamentos con detalles completos de entrega
- ✅ **Gestión de Medicamentos (ADMIN)**: Crear y editar medicamentos con control de roles
- ✅ **Catálogo de Medicamentos**: Explora medicamentos disponibles
- ✅ **Control de Roles**: Sistema de permisos basado en roles (USER, ADMIN)
- ✅ **Interfaz Responsiva**: Diseño moderno y limpio
- ✅ **TypeScript**: Seguridad de tipos en todo el código
- ✅ **Rutas Protegidas**: Acceso solo para usuarios autenticados
- ✅ **Dockerizado**: Build multietapa optimizado
- ✅ **Testing**: Vitest con tests unitarios
- ✅ **Code Quality**: ESLint + Prettier

---

## 🛠️ Tecnologías

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| React | 18.2.0 | Framework UI |
| TypeScript | 5.2.2 | Tipado estático |
| Vite | 5.0.8 | Build tool |
| React Router | 6.20.0 | Routing |
| Axios | 1.6.2 | HTTP client |
| Vitest | 1.6.1 | Testing |
| ESLint | 8.57.1 | Linting |
| Prettier | Latest | Code formatting |
| Node.js | 20-alpine | Build |
| Nginx | Alpine | Servidor producción |

---

## 🚀 Instalación y Ejecución

### Opción 1: Con Docker Compose (Recomendado)

```bash
# Desde el directorio principal
docker-compose up -d frontend

# Accede a http://localhost
# El backend y base de datos se inician automáticamente
```

### Opción 2: Desarrollo Local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo con hot reload
npm run dev

# Accede a http://localhost:5173
# (Backend debe estar ejecutándose en http://localhost:8080)
```

### Opción 3: Build para Producción

```bash
# 1. Compilar para producción
npm run build

# 2. Preview del build
npm run preview

# 3. Accede a http://localhost:4173
```

---

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor con hot reload
npm run preview          # Preview de build final

# Build
npm run build            # Compila para producción

# Calidad de código
npm run lint             # Ejecuta ESLint
npm run format           # Formatea código con Prettier
npm run format:check     # Verifica formateo sin cambios

# Testing
npm test                 # Ejecuta tests
npm run test:watch       # Tests en modo watch
npm run test:ui          # Tests con interfaz UI
npm run test:coverage    # Reporte de cobertura
```

---

## 📁 Estructura del Proyecto

```
nuevaeps-frontend/
├── Dockerfile                  # Build multietapa optimizado
├── nginx.conf                  # Configuración Nginx
├── package.json                # Dependencias npm
├── tsconfig.json               # Configuración TypeScript
├── vite.config.ts              # Configuración Vite
├── vitest.config.ts            # Configuración Vitest
├── .eslintrc.cjs               # Configuración ESLint
├── .prettierrc                 # Configuración Prettier
├── index.html                  # HTML principal
├── README.md                   # Este archivo
└── src/
    ├── App.tsx                 # Componente raíz
    ├── main.tsx                # Punto de entrada
    ├── pages/                  # Páginas (por feature)
    │   ├── auth/
    │   │   ├── LoginPage.tsx           # Página de login
    │   │   ├── RegisterPage.tsx        # Página de registro
    │   │   ├── AuthForms.css           # Estilos
    │   │   └── index.ts                # Exports
    │   ├── dashboard/
    │   │   ├── DashboardPage.tsx       # Panel principal
    │   │   ├── DashboardPage.css       # Estilos
    │   │   ├── DashboardPage.test.tsx  # Tests
    │   │   └── index.ts                # Exports
    │   ├── medicamentos/
    │   │   ├── MedicamentosPage.tsx    # Gestión medicamentos (CRUD)
    │   │   ├── EditarMedicamento.tsx   # Modal para editar
    │   │   ├── MedicamentosPage.css    # Estilos
    │   │   ├── MedicamentosPage.test.tsx # Tests
    │   │   ├── EditarMedicamento.test.tsx # Tests del modal
    │   │   └── index.ts                # Exports
    │   ├── solicitudes/
    │   │   ├── SolicitudesPage.tsx     # Mis solicitudes
    │   │   ├── SolicitudesPage.css     # Estilos
    │   │   └── index.ts                # Exports
    │   └── index.ts                    # Exports centralizados
    ├── components/
    │   ├── common/                     # Componentes compartidos
    │   │   ├── PrivateRoute.tsx        # Protección de rutas autenticadas
    │   │   ├── PrivateRoute.test.tsx   # Tests
    │   │   └── index.ts                # Exports
    │   ├── layout/                     # Layout principal
    │   │   ├── Layout.tsx              # Componente Layout
    │   │   ├── Layout.css              # Estilos
    │   │   ├── Layout.test.tsx         # Tests
    │   │   └── index.ts                # Exports
    │   └── index.ts                    # Exports centralizados
    ├── services/
    │   ├── api.ts                      # Cliente Axios (heredado)
    │   ├── api.test.ts                 # Tests
    │   ├── api/
    │   │   ├── client.ts               # Cliente Axios con JWT
    │   │   ├── client.test.ts          # Tests
    │   │   └── index.ts                # Exports
    │   ├── hooks/                      # Custom hooks (preparado)
    │   └── index.ts                    # Exports
    ├── types/                          # Tipos TypeScript
    │   ├── medicamento.ts              # Tipo Medicamento
    │   └── solicitud.ts                # Tipo SolicitudMedicamento
    ├── styles/                         # Estilos globales
    │   ├── globals.css                 # Estilos globales
    │   └── layout.css                  # Estilos layout
    ├── utils/                          # Funciones utilitarias
    │   ├── authUtils.ts                # Utilidades de autenticación y roles
    │   ├── authUtils.test.ts           # Tests
    │   └── (otras utilidades)
    ├── assets/                         # Imágenes, fonts, etc.
    ├── store/                          # Estado global (preparado)
    └── test/
        └── setup.ts                    # Setup de tests
```

---

## 🔐 Autenticación JWT

### Flujo de Autenticación

```
1. Usuario ingresa credenciales → /login
2. Frontend envía → POST /api/v1/auth/login
3. Backend valida y devuelve JWT
4. Frontend almacena en localStorage:
   - token (JWT)
   - username
   - userId
5. Axios interceptor automáticamente agrega:
   Authorization: Bearer {token}
6. Al expirar (401) → limpia localStorage y redirige a /login
```

### localStorage Keys

| Clave | Descripción |
|-------|-------------|
| `token` | JWT token de autenticación |
| `username` | Nombre del usuario logueado |
| `userId` | ID del usuario |
| `roles` | Array de roles del usuario (ej: ['ADMIN', 'USER']) |

### Funciones de Autenticación

Disponibles en [src/utils/authUtils.ts](src/utils/authUtils.ts):

```typescript
// Verificar si es administrador
import { isAdmin } from '@utils/authUtils';
if (isAdmin()) {
  // Mostrar botones de admin
}

// Obtener roles del usuario
import { getUserRoles } from '@utils/authUtils';
const roles = getUserRoles(); // ['ADMIN', 'USER']

// Verificar un rol específico
import { hasRole } from '@utils/authUtils';
if (hasRole('ADMIN')) {
  // Tiene permisos de admin
}

// Obtener información del usuario
import { getUsername, getUserId } from '@utils/authUtils';
const username = getUsername();
const userId = getUserId();

// Verificar si está autenticado
import { isAuthenticated } from '@utils/authUtils';
if (isAuthenticated()) {
  // Usuario tiene un token válido
}

// Limpiar sesión
import { clearUserSession } from '@utils/authUtils';
clearUserSession(); // Limpia todos los datos de autenticación
```

### Interceptores Axios

El archivo [src/services/api.ts](src/services/api.ts) configura:

**Request Interceptor:**
- Lee token de localStorage
- Agrega `Authorization: Bearer {token}` a todas las requests

**Response Interceptor:**
- Si recibe 401 → limpia localStorage
- Redirige a `/login`

---

## 📄 Componentes Principales

### Pages

#### LoginPage.tsx
- Formulario de login
- Validación de credenciales
- Guarda token en localStorage
- Redirige a dashboard al éxito

#### RegisterPage.tsx
- Formulario de registro
- Validación de contraseña
- Crea nuevo usuario
- Redirige a login al éxito

#### DashboardPage.tsx
- Panel de bienvenida
- Información del usuario
- Acceso rápido a funcionalidades

#### MedicamentosPage.tsx
- Tabla de medicamentos disponibles
- **ADMIN**: Crear y editar medicamentos
- **USER**: Solo lectura (consultar disponibles)
- Modal para edición elegante
- Validación de roles para mostrar botones
- Campos: ID, Nombre, Acciones (solo ADMIN)

#### SolicitudesPage.tsx
- Lista de solicitudes del usuario
- Crear nuevas solicitudes
- Campos: Medicamento, Número Orden, Dirección, Teléfono, Email

### Components

#### Layout.tsx
- Barra de navegación
- Menú de usuario
- Cierre de sesión
- Navegación entre páginas

#### PrivateRoute.tsx
- Protege rutas autenticadas
- Redirige a /login si no hay token
- Valida localStorage
- Verifica que el JWT sea válido

---

## 🔌 API Endpoints Utilizados

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | Iniciar sesión |
| POST | `/api/v1/auth/register` | Registrar usuario |

### Medicamentos

| Método | Endpoint | Autenticación | Rol |
|--------|----------|---|---|
| GET | `/api/v1/medicamentos` | ✅ Requerida | USER |
| GET | `/api/v1/medicamentos/paginated` | ✅ Requerida | USER |
| GET | `/api/v1/medicamentos/{id}` | ✅ Requerida | USER |
| POST | `/api/v1/medicamentos` | ✅ Requerida | **ADMIN** |
| PUT | `/api/v1/medicamentos/{id}` | ✅ Requerida | **ADMIN** |

### Solicitudes

| Método | Endpoint | Autenticación | Rol |
|--------|----------|---|---|
| GET | `/api/v1/solicitudes-medicamentos` | ✅ Requerida | USER |
| GET | `/api/v1/solicitudes-medicamentos/usuario/{id}` | ✅ Requerida | USER |
| GET | `/api/v1/solicitudes-medicamentos/usuario/{id}/paginated` | ✅ Requerida | USER |
| POST | `/api/v1/solicitudes-medicamentos` | ✅ Requerida | USER |

**Nota:** El header `Authorization: Bearer {token}` se agrega automáticamente en todos los requests protegidos.

---

## 🐳 Containerización

### Build Multietapa

El Dockerfile usa dos etapas optimizadas:

**Etapa 1 - Builder (Node.js 20-alpine)**
- Instala dependencias
- Compila TypeScript
- Build con Vite
- Genera carpeta `dist/`

**Etapa 2 - Production (Nginx Alpine)**
- Sirve archivos estáticos
- Nginx optimizado para SPA
- Health check incluido
- Tamaño final: ~50MB

### Configuración Nginx

[nginx.conf](nginx.conf) incluye:

- 📦 Cache de estáticos: 1 año
- 🔀 SPA Routing: Todas las rutas → `index.html`
- 🏥 Health Check: `/health`
- 🔗 API Proxy: `/api/*` → `http://backend:8080`
- 🔐 Seguridad: Bloquea archivos ocultos

### Puertos

| Servicio | URL | Puerto |
|----------|-----|--------|
| Frontend (dev) | http://localhost:5173 | 5173 |
| Frontend (Docker) | http://localhost | 80 |
| Backend API | http://localhost:8080 | 8080 |

---

## 🧪 Testing

### Tests Incluidos

- ✅ PrivateRoute.test.tsx - Protección de rutas
- ✅ Layout.test.tsx - Componente layout
- ✅ DashboardPage.test.tsx - Dashboard
- ✅ MedicamentosPage.test.tsx - Página de medicamentos
- ✅ EditarMedicamento.test.tsx - Modal de edición
- ✅ SolicitudesPage.test.tsx - Página de solicitudes
- ✅ authUtils.test.ts - Utilidades de autenticación
- ✅ api/client.test.ts - Cliente Axios
- ✅ api.test.ts - API service

### Ejecutar Tests

```bash
# Todos los tests
npm test

# En modo watch
npm run test:watch

# Con interfaz UI
npm run test:ui

# Reporte de cobertura
npm run test:coverage
```

---

## 🚨 Troubleshooting

### Error: "No se puede conectar al backend"
- Verificar que backend está corriendo en `http://localhost:8080`
- Revisar logs: `docker logs nuevaeps_backend`
- En desarrollo local, asegurar CORS habilitado en backend

### Error: "Token expirado"
- El JWT tiene validez de 24 horas
- Volver a hacer login para obtener nuevo token
- localStorage se limpia automáticamente

### Error: "No hay medicamentos disponibles"
- Verificar que medicamentos existen en la BD
- Revisar endpoint: `GET /api/v1/medicamentos`
- Ver logs del backend

### Error: "No autorizado (401)"
- Token no se está enviando correctamente
- Revisar que localStorage contiene `token`
- Interceptor de Axios debe agregar Authorization header

### Error: "No puedo crear/editar medicamentos"
- Solo usuarios con rol **ADMIN** pueden crear/editar
- Verificar rol en localStorage: `JSON.parse(localStorage.getItem('roles'))`
- Usar usuario admin para estas operaciones:
  - **Username:** admin
  - **Password:** admin

### Error: "Botones de crear/editar no aparecen"
- Verificar que tienes rol ADMIN
- Revisar que `roles` está guardado en localStorage
- Refresca la página (F5)
- Intenta logout y login nuevamente

---

## 👥 Usuarios de Prueba

### Administrador
```
Username: admin
Password: admin
Roles: ADMIN, USER
Permisos: Crear/editar medicamentos, ver solicitudes
```

### Usuario Estándar
```
Username: usuario_test
Password: admin
Roles: USER
Permisos: Crear solicitudes, consultar medicamentos
```

---

## 📖 Guía de Uso

### 1️⃣ Como Usuario (USER)

**Login:**
1. Ir a `http://localhost:5173` o `http://localhost` (Docker)
2. Click en "Login"
3. Ingresar credenciales:
   - Username: `usuario_test`
   - Password: `admin`
4. Click "Iniciar Sesión"

**Ver Medicamentos:**
1. En el menú, click en "Medicamentos"
2. Verás la tabla de medicamentos disponibles
3. Los botones de edición no aparecerán (requiere ADMIN)

**Crear Solicitud:**
1. En el menú, click en "Mis Solicitudes"
2. Click en "+ Nueva Solicitud"
3. Completa el formulario:
   - Selecciona medicamento
   - Ingresa número de orden
   - Dirección de entrega
   - Teléfono
   - Email
4. Click "Enviar Solicitud"

### 2️⃣ Como Administrador (ADMIN)

**Login:**
1. Ir a `http://localhost:5173` o `http://localhost` (Docker)
2. Click en "Login"
3. Ingresar credenciales:
   - Username: `admin`
   - Password: `admin`
4. Click "Iniciar Sesión"

**Gestionar Medicamentos:**
1. En el menú, click en "Medicamentos"
2. Verás la tabla con botones de acción
3. **Crear:** Click "+ Nuevo Medicamento"
   - Ingresa nombre del medicamento
   - Click "Agregar"
4. **Editar:** Click en botón "Editar" de cualquier medicamento
   - Modifica el nombre
   - Click "Guardar"

**Ver Solicitudes de Medicamentos:**
1. En el menú, click en "Mis Solicitudes"
2. Verás todas las solicitudes creadas
3. Datos: Medicamento, Número Orden, Dirección, etc.

---

## 🔗 Links Útiles

- **Frontend (Desarrollo)**: `http://localhost:5173`
- **Frontend (Docker)**: `http://localhost`
- **Backend API**: `http://localhost:8080/api/v1`
- **Swagger API**: `http://localhost:8080/swagger-ui.html`
- **PgAdmin**: `http://localhost:5050`
- **Backend README**: [../nuevaeps-backend/README.md](../nuevaeps-backend/README.md)
- **Principal README**: [../README.md](../README.md)

---

##  Documentación Externa

- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Vitest Docs](https://vitest.dev)
- [React Testing Library](https://testing-library.com/react)
- [Axios Docs](https://axios-http.com)
- [React Router](https://reactrouter.com)

---

## 🤝 Contribución

Para contribuir al proyecto:

1. Crear un branch: `git checkout -b feature/nombre-feature`
2. Hacer cambios y agregar tests
3. Verificar que tests pasan: `npm test`
4. Formatear código: `npm run format`
5. Hacer commit: `git commit -m "descripción clara"`
6. Push: `git push origin feature/nombre-feature`
7. Crear Pull Request

---

## 📄 Licencia

Este proyecto es parte del sistema NuevaEPS.

---

## ✅ Checklist para Nuevas Features

Al agregar nuevas características:

- [ ] Crear componente/página necesaria
- [ ] Agregar tipos TypeScript en `src/types/`
- [ ] Implementar llamadas API en `src/services/api.ts`
- [ ] Validar permisos/roles si es necesario
- [ ] Agregar tests (`.test.tsx` o `.test.ts`)
- [ ] Actualizar este README con nuevos endpoints
- [ ] Verificar que compila: `npm run build`
- [ ] Verificar que tests pasan: `npm test`
- [ ] Verificar Docker build: `docker build -t nuevaeps-frontend:latest .`

---

**Última actualización:** 2026-02-03

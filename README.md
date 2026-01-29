# NuevaEPS Frontend

Frontend ReactJS de NuevaEPS - Sistema de gestión de solicitudes de medicamentos con autenticación JWT y containerizado con Docker.

## ✨ Características Principales

- **Autenticación Segura**: Login y registro con JWT
- **Panel de Solicitudes**: Visualiza todas tus solicitudes de medicamentos
- **Crear Solicitudes**: Solicita medicamentos con detalles completos de entrega
- **Catálogo de Medicamentos**: Explora medicamentos disponibles
- **Interfaz Responsiva**: Diseño moderno y limpio
- **TypeScript**: Seguridad de tipos en todo el código
- **Rutas Protegidas**: Acceso solo para usuarios autenticados
- **Dockerizado**: Deployment con Docker y Docker Compose
- **Testing**: Vitest con 5 tests unitarios configurados
- **Code Quality**: ESLint + Prettier para formato automático
- **Pre-commit Hooks**: Validación automática en cada commit

## 🛠️ Tecnologías

- **React**: 18.2.0
- **TypeScript**: 5.2.2
- **Vite**: 5.0.8
- **React Router**: 6.20.0
- **Axios**: 1.6.2
- **Vitest**: 1.6.1 (Testing)
- **ESLint**: 8.57.1 (Linting)
- **Prettier**: (Code Formatting)
- **Husky**: 9.1.7 (Git Hooks)
- **Node.js**: 20-alpine (build)
- **Nginx**: Alpine (producción)

---

## 🚀 Instalación y Ejecución

### Opción 1: Desarrollo Local (sin Docker)

#### Requisitos
- Node.js 16+
- Backend ejecutándose en `http://localhost:8080`

#### Pasos

```bash
# 1. Instalar dependencias
cd nuevaeps-frontend
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# Accede a http://localhost:5173
```

#### Scripts Disponibles

```bash
npm run dev              # Inicia servidor con hot reload
npm run build            # Compila para producción
npm run preview          # Preview de build final
npm run lint             # Ejecuta ESLint
npm run format           # Formatea código con Prettier
npm run format:check     # Verifica formateo sin cambios
npm test                 # Ejecuta tests
npm run test:watch       # Tests en modo watch
npm run test:ui          # Tests con interfaz UI
npm run test:coverage    # Tests con reporte de cobertura
```

### Opción 2: Con Docker Compose (Recomendado para Producción)

```bash
# Construir imagen del frontend
docker-compose build frontend

# Levantar todos los servicios (postgres, pgadmin, backend, frontend)
docker-compose up -d

# Levantar solo el frontend
docker-compose up -d frontend

# Ver logs del frontend
docker-compose logs -f frontend

# Accede a http://localhost (puerto 80)
```

### Opción 3: Docker Individual

```bash
# Construir imagen
docker build -t nuevaeps-frontend:latest ./nuevaeps-frontend

# Ejecutar contenedor
docker run -p 80:80 -e REACT_APP_API_URL=http://localhost:8080 nuevaeps-frontend:latest

# Con nombre personalizado
docker run -d --name nuevaeps_frontend -p 80:80 \
  -e REACT_APP_API_URL=http://localhost:8080 \
  nuevaeps-frontend:latest
```

---

## 🐳 Containerización

### Arquitectura Docker

El frontend usa un **build multietapa optimizado**:

- **Stage 1 (Builder)**: Node.js 20-alpine
  - Instala dependencias con `npm install`
  - Compila TypeScript con `tsc`
  - Build de producción con `vite build`
  - Genera carpeta `dist/` con archivos estáticos

- **Stage 2 (Production)**: Nginx Alpine
  - Sirve archivos estáticos desde `dist/`
  - Configuración nginx optimizada
  - Tamaño final: ~50MB

### Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `REACT_APP_API_URL` | URL del API backend | `http://backend:8080` |

### Configuración de Nginx

El archivo `nginx.conf` incluye:

- **Cache de archivos estáticos**: 1 año para JS, CSS, imágenes
- **SPA Routing**: Redirige todas las rutas a `index.html`
- **Health Check**: Endpoint `/health` para monitoreo
- **API Proxy**: Proxy a `/api/` → `http://backend:8080`
- **Seguridad**: Bloquea acceso a archivos ocultos

### URLs y Puertos

| Servicio | URL | Puerto |
|----------|-----|--------|
| Frontend (dev) | http://localhost:5173 | 5173 |
| Frontend (Docker) | http://localhost | 80 |
| Backend API | http://localhost:8080 | 8080 |
| pgAdmin | http://localhost:5050 | 5050 |
| PostgreSQL | localhost | 5432 |

### Docker Compose - Servicio Frontend

```yaml
frontend:
  build:
    context: ./nuevaeps-frontend
    dockerfile: Dockerfile
  container_name: nuevaeps_frontend
  ports:
    - "80:80"
  depends_on:
    - backend
  networks:
    - nuevaeps_network
  healthcheck:
    test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/health"]
    interval: 30s
    timeout: 10s
    retries: 3
    start_period: 20s
  environment:
    - REACT_APP_API_URL=http://backend:8080
```

---

## 📁 Estructura del Proyecto

```
nuevaeps-frontend/
├── Dockerfile                  # Build multietapa
├── nginx.conf                  # Configuración nginx
├── package.json                # Dependencias
├── tsconfig.json               # Config TypeScript
├── vite.config.ts              # Config Vite
├── vitest.config.ts            # Config Vitest
├── .eslintrc.cjs               # Config ESLint
├── .prettierrc                 # Config Prettier
├── .prettierignore             # Archivos ignorados por Prettier
├── index.html                  # HTML principal
└── src/
    ├── pages/                  # Páginas por feature
    │   ├── auth/
    │   │   ├── LoginPage.tsx       # Login
    │   │   ├── RegisterPage.tsx    # Registro
    │   │   ├── AuthForms.css       # Estilos auth
    │   │   └── index.ts            # Exports
    │   ├── dashboard/
    │   │   ├── DashboardPage.tsx   # Panel principal
    │   │   ├── DashboardPage.css   # Estilos
    │   │   └── index.ts            # Exports
    │   ├── medicamentos/
    │   │   ├── MedicamentosPage.tsx # Catálogo
    │   │   ├── MedicamentosPage.css # Estilos
    │   │   └── index.ts             # Exports
    │   ├── solicitudes/
    │   │   ├── SolicitudesPage.tsx  # Mis solicitudes
    │   │   ├── SolicitudesPage.css  # Estilos
    │   │   └── index.ts             # Exports
    │   └── index.ts                 # Exports centralizados
    ├── components/
    │   ├── common/                  # Componentes compartidos
    │   │   ├── PrivateRoute.tsx     # Protección de rutas
    │   │   └── index.ts             # Exports
    │   ├── layout/                  # Layout principal
    │   │   ├── Layout.tsx           # Layout con navegación
    │   │   ├── Layout.css           # Estilos
    │   │   ├── Layout.test.tsx      # Tests
    │   │   └── index.ts             # Exports
    │   └── [otros componentes]
    ├── services/
    │   ├── api/
    │   │   ├── client.ts            # Cliente Axios con JWT
    │   │   ├── client.test.ts       # Tests
    │   │   └── index.ts             # Exports
    │   ├── hooks/                   # Custom hooks (preparado)
    │   ├── index.ts                 # Exports
    │   └── api.test.ts              # Tests heredados
    ├── styles/                      # Estilos globales
    │   ├── globals.css              # Estilos globales
    │   └── layout.css               # Estilos layout
    ├── store/                       # Estado global (preparado)
    ├── types/                       # Tipos TypeScript
    │   ├── solicitud.ts             # Tipos de Solicitud
    │   └── medicamento.ts           # Tipos de Medicamento
    ├── assets/                      # Assets (imágenes, fonts)
    ├── utils/                       # Funciones utilitarias
    ├── test/
    │   └── setup.ts                 # Configuración global de tests
    ├── App.tsx                      # Componente raíz
    └── main.tsx                     # Punto de entrada
```

### Path Aliases

El proyecto usa path aliases para imports limpios:

```typescript
@/            → src/
@components/  → src/components/
@pages/       → src/pages/
@services/    → src/services/
@styles/      → src/styles/
@types/       → src/types/
@assets/      → src/assets/
@utils/       → src/utils/
@store/       → src/store/
```

**Ejemplo de imports:**
```typescript
// ❌ Antes (rutas relativas)
import { Layout } from '../../../components/layout/Layout';

// ✅ Ahora (aliases limpios)
import { Layout } from '@components/layout';
```

---

## 🔐 Flujo de Autenticación

### 1. Registro
```
/register → Ingresa usuario/contraseña 
         → POST /api/v1/auth/register 
         → /login
```

### 2. Login
```
/login → Ingresa credenciales 
      → POST /api/v1/auth/login 
      → Guarda token + userId en localStorage 
      → / (Dashboard)
```

### 3. Protección de Rutas
```
PrivateRoute valida localStorage.token
  ├─ Token existe → Acceso permitido
  └─ No existe → Redirige a /login
```

### 4. Interceptor JWT Automático

```typescript
// Request
Authorization: Bearer {token}

// Response 401
→ Limpia localStorage
→ Redirige a /login
```

### localStorage Keys

- `token`: JWT token de autenticación
- `username`: Nombre del usuario
- `userId`: ID del usuario (para solicitudes)

---

## 📋 Funcionalidades

### Mis Solicitudes

**Visualizar Solicitudes**
- Ruta: `/solicitudes`
- Ve todas tus solicitudes de medicamentos:
  - ID de solicitud
  - Nombre del medicamento
  - Número de orden
  - Dirección, teléfono, email

**Crear Solicitud**
- Clic en **+ Nueva Solicitud**
- Formulario con validación:
  - Medicamento (dropdown del catálogo)
  - Número de Orden (identificador único)
  - Dirección de Entrega
  - Teléfono de contacto
  - Correo Electrónico
- ✅ Mensaje de éxito
- Tabla se actualiza automáticamente

### Catálogo de Medicamentos
- Ver medicamentos disponibles
- Crear nuevos medicamentos
- Eliminar medicamentos

---

## 🔌 API Integration

### Base URL
- Desarrollo local: `http://localhost:8080/api/v1`
- Docker: `http://backend:8080/api/v1`

### Endpoints Utilizados

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/register` | Registrar nuevo usuario |
| POST | `/auth/login` | Iniciar sesión (obtiene JWT) |
| GET | `/medicamentos` | Obtener todos los medicamentos |
| POST | `/medicamentos` | Crear medicamento |
| DELETE | `/medicamentos/:id` | Eliminar medicamento |
| GET | `/solicitudes-medicamentos/usuario/:id` | Obtener solicitudes del usuario |
| POST | `/solicitudes-medicamentos` | Crear solicitud |
| DELETE | `/solicitudes-medicamentos/:id` | Eliminar solicitud |

---

## 🎨 Estilos

- **CSS modular** por componente/página
- **Paleta de colores**: Gradientes morados (#667eea, #764ba2)
- **Diseño responsivo**: Mobile-first
- **Soporte dark mode**: `prefers-color-scheme`

---

## 🧪 Testing y Calidad de Código

### Testing con Vitest

```bash
# Ejecutar tests una vez
npm test

# Ejecutar tests en modo watch (desarrollo)
npm run test:watch

# Ejecutar tests con interfaz UI
npm run test:ui

# Ejecutar tests con reporte de cobertura
npm run test:coverage
```

**Tests Actuales**
- `src/services/api.test.ts`: 2 tests para el servicio Axios
- `src/components/Layout.test.tsx`: 3 tests para el componente Layout

**Escribir Nuevos Tests**

Los tests deben estar en archivos con extensión `.test.ts` o `.test.tsx`:

```typescript
// Ejemplo: Component.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Component from './Component'

describe('Component', () => {
  it('should render correctly', () => {
    render(<Component />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

### Formateo de Código con Prettier

```bash
# Formatear código automáticamente
npm run format

# Verificar formateo sin cambios
npm run format:check
```

**Configuración**: `.prettierrc`
- Print width: 100 caracteres
- Tab width: 2 espacios
- Single quotes en strings
- Trailing commas: ES5
- Semicolons: activados

### Linting con ESLint

```bash
# Ejecutar linting
npm run lint
```

**Configuración**: `.eslintrc.cjs`
- Integración con Prettier (plugin:prettier/recommended)
- Reglas TypeScript (@typescript-eslint)
- Reglas React y React Hooks
- Validación de React Refresh

### Pre-commit Hooks con Husky

Se ha configurado **Husky** para ejecutar automáticamente en cada commit:

1. 🎨 **Formatting** (Prettier): Formatea el código automáticamente
2. 🔍 **Linting** (ESLint): Valida errores de código
3. 🧪 **Testing** (Vitest): Ejecuta los tests

**Flujo de un commit**:
```bash
git add .
git commit -m "feat: Nueva característica"

# ↓ Pre-commit hook se ejecuta automáticamente
# 1. npm run format
# 2. npm run lint
# 3. npm test
# ↓ Si todos pasan, el commit se completa
# ✅ Commit exitoso
```

Si alguno falla, el commit es rechazado y puedes corregir los errores.

**Saltar Pre-commit (No recomendado)**

Si necesitas hacer un commit sin ejecutar los checks:
```bash
git commit -m "mensaje" --no-verify
```

**Nota**: Esto no es recomendado, ya que puede introducir código con errores o mal formateado.

### Cobertura de Código

La cobertura se genera en la carpeta `coverage/` cuando ejecutas:
```bash
npm run test:coverage
```

---

## 🐛 Troubleshooting

### Desarrollo Local

**Error: "Error al cargar solicitudes"**
- Verifica que backend esté en `http://localhost:8080`
- Asegúrate de estar logueado
- Revisa consola (F12) para detalles

**El formulario no envía**
- Todos los campos son obligatorios
- Email debe ser válido
- Revisa consola para errores

**401 Unauthorized**
- Token ha expirado
- Haz login nuevamente
- Se redirige automáticamente

**ESLint reporta errores después de cambios**
- Ejecuta `npm run format` para formatear automáticamente
- Ejecuta `npm run lint` para verificar los errores

### Docker

**El frontend muestra errores de conexión con el API**
1. Verifica que backend esté corriendo:
   ```bash
   docker-compose logs backend
   ```
2. Verifica variable `REACT_APP_API_URL`
3. En dev local, usa `http://localhost:8080` en lugar de `http://backend:8080`

**El contenedor se reinicia constantemente**
```bash
docker-compose logs frontend
```

**Cambios en el código no se reflejan**
```bash
docker-compose build --no-cache frontend
docker-compose up -d frontend
```

---

## ✅ Completado

- ✅ Interfaz de Login
- ✅ Interfaz de Registro
- ✅ Dashboard Principal
- ✅ Visualizar mis solicitudes
- ✅ Crear nuevas solicitudes
- ✅ Catálogo de medicamentos (CRUD)
- ✅ Autenticación JWT
- ✅ Rutas protegidas
- ✅ Estilos responsivos
- ✅ Dockerizado (multi-stage build)
- ✅ Nginx optimizado
- ✅ Docker Compose integrado
- ✅ Testing unitarios (Vitest)
- ✅ Linting y formating automáticos (ESLint + Prettier)
- ✅ Pre-commit hooks (Husky)

---

## 📄 Licencia

MIT


---

## 🚀 Instalación y Ejecución

### Opción 1: Desarrollo Local (sin Docker)

#### Requisitos
- Node.js 16+
- Backend ejecutándose en `http://localhost:8080`

#### Pasos

```bash
# 1. Instalar dependencias
cd nuevaeps-frontend
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# Accede a http://localhost:5173
```

#### Scripts Disponibles

```bash
npm run dev       # Inicia servidor con hot reload
npm run build     # Compila para producción
npm run preview   # Preview de build final
npm run lint      # Ejecuta ESLint
```

### Opción 2: Con Docker Compose (Recomendado para Producción)

```bash
# Construir imagen del frontend
docker-compose build frontend

# Levantar todos los servicios (postgres, pgadmin, backend, frontend)
docker-compose up -d

# Levantar solo el frontend
docker-compose up -d frontend

# Ver logs del frontend
docker-compose logs -f frontend

# Accede a http://localhost (puerto 80)
```

### Opción 3: Docker Individual

```bash
# Construir imagen
docker build -t nuevaeps-frontend:latest ./nuevaeps-frontend

# Ejecutar contenedor
docker run -p 80:80 -e REACT_APP_API_URL=http://localhost:8080 nuevaeps-frontend:latest

# Con nombre personalizado
docker run -d --name nuevaeps_frontend -p 80:80 \
  -e REACT_APP_API_URL=http://localhost:8080 \
  nuevaeps-frontend:latest
```

---

## 🐳 Containerización

### Arquitectura Docker

El frontend usa un **build multietapa optimizado**:

- **Stage 1 (Builder)**: Node.js 20-alpine
  - Instala dependencias con `npm install`
  - Compila TypeScript con `tsc`
  - Build de producción con `vite build`
  - Genera carpeta `dist/` con archivos estáticos

- **Stage 2 (Production)**: Nginx Alpine
  - Sirve archivos estáticos desde `dist/`
  - Configuración nginx optimizada
  - Tamaño final: ~50MB

### Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `REACT_APP_API_URL` | URL del API backend | `http://backend:8080` |

### Configuración de Nginx

El archivo `nginx.conf` incluye:

- **Cache de archivos estáticos**: 1 año para JS, CSS, imágenes
- **SPA Routing**: Redirige todas las rutas a `index.html`
- **Health Check**: Endpoint `/health` para monitoreo
- **Seguridad**: Bloquea acceso a archivos ocultos

### URLs y Puertos

| Servicio | URL | Puerto |
|----------|-----|--------|
| Frontend (dev) | http://localhost:5173 | 5173 |
| Frontend (Docker) | http://localhost | 80 |
| Backend API | http://localhost:8080 | 8080 |
| pgAdmin | http://localhost:5050 | 5050 |
| PostgreSQL | localhost | 5432 |

### Docker Compose - Servicio Frontend

```yaml
frontend:
  build:
    context: ./nuevaeps-frontend
    dockerfile: Dockerfile
  container_name: nuevaeps_frontend
  ports:
    - "80:80"
  depends_on:
    - backend
  networks:
    - nuevaeps_network
  healthcheck:
    test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/health"]
    interval: 30s
    timeout: 10s
    retries: 3
    start_period: 20s
  environment:
    - REACT_APP_API_URL=http://backend:8080
```

---

## 📁 Estructura del Proyecto

```
nuevaeps-frontend/
├── Dockerfile                  # Build multietapa
├── nginx.conf                  # Configuración nginx
├── package.json                # Dependencias
├── tsconfig.json               # Config TypeScript
├── vite.config.ts              # Config Vite
├── index.html                  # HTML principal
└── src/
    ├── pages/
    │   ├── LoginPage.tsx       # Login
    │   ├── RegisterPage.tsx    # Registro
    │   ├── DashboardPage.tsx   # Panel principal
    │   ├── SolicitudesPage.tsx # Mis solicitudes
    │   ├── MedicamentosPage.tsx # Catálogo de medicamentos
    │   └── *.css               # Estilos por página
    ├── components/
    │   ├── Layout.tsx          # Layout con navegación
    │   ├── PrivateRoute.tsx    # Protección de rutas
    │   └── *.css               # Estilos de componentes
    ├── services/
    │   └── api.ts              # Cliente Axios con JWT
    ├── types/
    │   ├── solicitud.ts        # Tipos de Solicitud
    │   └── medicamento.ts      # Tipos de Medicamento
    ├── App.tsx                 # Componente raíz
    └── main.tsx                # Punto de entrada
```

---

## 🔐 Flujo de Autenticación

### 1. Registro
```
/register → Ingresa usuario/contraseña 
         → POST /api/v1/auth/register 
         → /login
```

### 2. Login
```
/login → Ingresa credenciales 
      → POST /api/v1/auth/login 
      → Guarda token + userId en localStorage 
      → / (Dashboard)
```

### 3. Protección de Rutas
```
PrivateRoute valida localStorage.token
  ├─ Token existe → Acceso permitido
  └─ No existe → Redirige a /login
```

### 4. Interceptor JWT Automático

```typescript
// Request
Authorization: Bearer {token}

// Response 401
→ Limpia localStorage
→ Redirige a /login
```

### localStorage Keys

- `token`: JWT token de autenticación
- `username`: Nombre del usuario
- `userId`: ID del usuario (para solicitudes)

---

## 📋 Funcionalidades

### Mis Solicitudes

**Visualizar Solicitudes**
- Ruta: `/solicitudes`
- Ve todas tus solicitudes de medicamentos:
  - ID de solicitud
  - Nombre del medicamento
  - Número de orden
  - Dirección, teléfono, email

**Crear Solicitud**
- Clic en **+ Nueva Solicitud**
- Formulario con validación:
  - Medicamento (dropdown del catálogo)
  - Número de Orden (identificador único)
  - Dirección de Entrega
  - Teléfono de contacto
  - Correo Electrónico
- ✅ Mensaje de éxito
- Tabla se actualiza automáticamente

### Catálogo de Medicamentos
- Ver medicamentos disponibles
- Crear nuevos medicamentos
- Eliminar medicamentos

---

## 🔌 API Integration

### Base URL
- Desarrollo local: `http://localhost:8080/api/v1`
- Docker: `http://backend:8080/api/v1`

### Endpoints Utilizados

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/register` | Registrar nuevo usuario |
| POST | `/auth/login` | Iniciar sesión (obtiene JWT) |
| GET | `/medicamentos` | Obtener todos los medicamentos |
| POST | `/medicamentos` | Crear medicamento |
| DELETE | `/medicamentos/:id` | Eliminar medicamento |
| GET | `/solicitudes-medicamentos/usuario/:id` | Obtener solicitudes del usuario |
| POST | `/solicitudes-medicamentos` | Crear solicitud |
| DELETE | `/solicitudes-medicamentos/:id` | Eliminar solicitud |

---

## 🎨 Estilos

- **CSS modular** por componente/página
- **Paleta de colores**: Gradientes morados (#667eea, #764ba2)
- **Diseño responsivo**: Mobile-first
- **Soporte dark mode**: `prefers-color-scheme`

---

## 🐛 Troubleshooting

### Desarrollo Local

**Error: "Error al cargar solicitudes"**
- Verifica que backend esté en `http://localhost:8080`
- Asegúrate de estar logueado
- Revisa consola (F12) para detalles

**El formulario no envía**
- Todos los campos son obligatorios
- Email debe ser válido
- Revisa consola para errores

**401 Unauthorized**
- Token ha expirado
- Haz login nuevamente
- Se redirige automáticamente

### Docker

**El frontend muestra errores de conexión con el API**
1. Verifica que backend esté corriendo:
   ```bash
   docker-compose logs backend
   ```
2. Verifica variable `REACT_APP_API_URL`
3. En dev local, usa `http://localhost:8080` en lugar de `http://backend:8080`

**El contenedor se reinicia constantemente**
```bash
docker-compose logs frontend
```

**Cambios en el código no se reflejan**
```bash
docker-compose build --no-cache frontend
docker-compose up -d frontend
```

---

## ✅ Completado

- ✅ Interfaz de Login
- ✅ Interfaz de Registro
- ✅ Dashboard Principal
- ✅ Visualizar mis solicitudes
- ✅ Crear nuevas solicitudes
- ✅ Catálogo de medicamentos (CRUD)
- ✅ Autenticación JWT
- ✅ Rutas protegidas
- ✅ Estilos responsivos
- ✅ Dockerizado (multi-stage build)
- ✅ Nginx optimizado
- ✅ Docker Compose integrado

---

## 📄 Licencia

MIT

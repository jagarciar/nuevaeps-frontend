# Estructura del Proyecto - Frontend

Este archivo documenta la estructura reorganizada del frontend NuevaEPS.

## Anatomía de Directorios

```
src/
├── assets/              # Imágenes, fuentes, íconos
├── components/
│   ├── common/         # Componentes reutilizables (PrivateRoute, etc)
│   └── layout/         # Componentes de layout (Layout, Header, etc)
│
├── pages/
│   ├── auth/          # Páginas de autenticación (Login, Register)
│   ├── dashboard/     # Página principal del dashboard
│   ├── medicamentos/  # Página de gestión de medicamentos
│   └── solicitudes/   # Página de gestión de solicitudes
│
├── services/
│   ├── api/           # Cliente HTTP y configuración Axios
│   └── hooks/         # Custom React hooks
│
├── store/             # Estado global (Redux, Zustand, etc) - Preparado para expansión
├── styles/            # Estilos globales y por módulo
├── types/             # Tipos TypeScript compartidos
├── utils/             # Funciones utilitarias
├── test/              # Configuración de tests
│
├── App.tsx            # Componente raíz
├── main.tsx           # Punto de entrada
└── index.css          # Estilos globales (deprecated, usar styles/globals.css)
```

## Path Aliases

Para importaciones limpias, usa estos aliases en lugar de rutas relativas:

```typescript
// ✅ Bien
import { Layout } from '@components/layout';
import { LoginPage } from '@pages/auth';
import { apiCall } from '@services/api';
import '@styles/globals.css';

// ❌ Evitar
import Layout from '../../../../components/layout/Layout';
import { apiCall } from '../../services/api/client';
```

## Convenciones

### Componentes
- **common/**: Componentes que se usan en múltiples páginas
- **layout/**: Estructura base del app (Layout principal, Headers, etc)

### Páginas
- Organizadas por feature (auth, dashboard, medicamentos, solicitudes)
- Cada carpeta contiene su componente principal y estilos
- Archivo `index.ts` para fácil importación

### Servicios
- **api/**: Cliente Axios y configuración
- **hooks/**: Custom hooks (preparado para expansión)

### Estilos
- **globals.css**: Estilos aplicables a todo el proyecto
- **layout.css**: Estilos específicos del layout
- Estilos locales en carpetas de componentes/páginas

### Tests
- Tests junto a los archivos que testean (`.test.tsx`)
- Configuración global en `src/test/setup.ts`

## Importaciones de Índices

Cada carpeta con múltiples exports tiene un `index.ts`:

```typescript
// src/components/layout/index.ts
export { default as Layout } from './Layout';

// src/pages/auth/index.ts
export { default as LoginPage } from './LoginPage';
export { default as RegisterPage } from './RegisterPage';

// src/services/api/index.ts
export { apiCall } from './client';
```

Esto permite:
```typescript
import { Layout } from '@components/layout';
import { LoginPage, RegisterPage } from '@pages/auth';
import { apiCall } from '@services/api';
```

## Próximas Expansiones

- **@store**: Para estado global cuando se requiera
- **@utils**: Funciones auxiliares compartidas
- **@assets**: Recursos estáticos
- **@hooks**: Hooks personalizados comunes

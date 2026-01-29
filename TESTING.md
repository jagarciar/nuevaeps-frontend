# Configuración de Testing y Code Quality para Frontend

Este proyecto utiliza **Vitest** para testing, **ESLint** para linting y **Prettier** para formateo de código.

## 🧪 Comandos de Testing

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

## 🎨 Comandos de Formateo

```bash
# Formatear código automáticamente
npm run format

# Verificar formateo sin cambios
npm run format:check
```

## 🔍 Comandos de Linting

```bash
# Ejecutar linting
npm run lint
```

## 🪝 Pre-commit Hooks

Se ha configurado **Husky** para ejecutar automáticamente en cada commit:
- 🎨 Formateo (Prettier)
- ✅ Linting (ESLint)
- ✅ Tests (Vitest)

Cada vez que hagas un commit, estos checks se ejecutarán automáticamente. Si alguno falla, el commit será rechazado.

## 📝 Escribir Tests

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

## 🔧 Configuración

- **vitest.config.ts**: Configuración de Vitest
- **src/test/setup.ts**: Setup global para tests
- **.eslintrc.cjs**: Configuración de ESLint con Prettier integration
- **.prettierrc**: Configuración de Prettier
- **.prettierignore**: Archivos que Prettier debe ignorar
- **.husky/pre-commit**: Hook de pre-commit

## 📊 Cobertura

La cobertura de código se genera en la carpeta `coverage/` cuando ejecutas:
```bash
npm run test:coverage
```

## 🚫 Saltar Pre-commit (No recomendado)

Si necesitas hacer un commit sin ejecutar los checks:
```bash
git commit -m "mensaje" --no-verify
```

**Nota**: Esto no es recomendado, ya que puede introducir código con errores o mal formateado.


# 🚀 AMX 2.1

Aplicación móvil desarrollada con **React Native** y **Expo**, enfocada en ofrecer una arquitectura
escalable, modular y con enfoque profesional para facilitar su mantenimiento y evolución. El
proyecto implementa patrones modernos, diseño atómico y herramientas actuales del ecosistema
frontend.

---
## Preview
| #  | Descripción                          | Video                                                                   |
|----|--------------------------------------|--------------------------------------------------------------------------|
| 1  | Cambio de tema (Light/Dark)          | [▶️ Ver video](https://github.com/user-attachments/assets/f15777ab-5b8e-4a14-8aba-9d273565d6ca) |
| 2  | Búsqueda por destino y origen        | [▶️ Ver video](https://github.com/user-attachments/assets/c0156699-2244-478f-b60f-8f0b3d637f4e) |
| 3  | Búsqueda por número de vuelo         | [▶️ Ver video](https://github.com/user-attachments/assets/a8795906-f480-43df-9484-c4d4a5b03e25) |

---

## 📐 Arquitectura

Este proyecto adopta una estructura basada en **MVVM (Model-View-ViewModel)**, donde:

- **Model**: lógica de negocio desacoplada en hooks y servicios.
- **View**: componentes atómicos y pantallas (screens).
- **ViewModel**: lógica intermedia y manejo de estado mediante `contexts/` y `hooks/`.

### 🧩 Patrones de diseño implementados

- **🔁 Patrón Observer** – React y sus hooks permiten actualizar automáticamente la UI cuando cambia
  el estado.
- **🧱 Diseño atómico (Atomic Design)** – Separación de componentes en `atoms`, `molecules` y
  `organisms` para mayor reutilización y mantenimiento.
- **📦 Repository Pattern + Cache Layer** – Uso de `React Query` y `services/` para separar la
  lógica de datos de la presentación, permitiendo control de caché, reintentos y estados de error.

---

## 🧰 Tecnologías y herramientas

| Herramienta              | Uso                                                     |
| ------------------------ | ------------------------------------------------------- |
| **Expo**                 | Plataforma para desarrollo, compilación y testing       |
| **Styled Components**    | Estilos encapsulados en componentes                     |
| **React Context API**    | Estado global (sesión, UI, etc.)                        |
| **React Query**          | Manejo de datos remotos con caché, sincronización y más |
| **React Navigation**     | Navegación stack/tab entre pantallas                    |
| **Hooks personalizados** | Reutilización de lógica de negocio e interacciones      |

---

## 📁 Estructura del proyecto

```
amx-2.1/
├── app/                        # Navegación basada en Expo Router (estructura de rutas)
├── assets/                     # Recursos estáticos (imágenes, íconos, fuentes)
├── components/
│   ├── atoms/                  # Elementos básicos de UI
│   ├── molecules/              # Composición de 2+ átomos
│   ├── organisms/              # Componentes complejos
│   └── templates/              # Estructuras de pantalla base
├── constants/                  # Constantes compartidas (colores, textos, etc.)
├── contexts/                   # Manejadores globales de estado (Session, Theme, UI)
├── helpers/                    # Funciones utilitarias (validaciones, formatos, etc.)
├── hooks/                      # Hooks reutilizables para negocio y lógica de UI
├── services/                   # Funciones que conectan con APIs
├── theme/                      # Estilos generales y configuración de tema
├── types/                      # Tipos TypeScript centralizados
├── .eslintrc.js                # Configuración de linting
├── app.config.ts               # Configuración de Expo
├── package.json                # Dependencias y scripts
└── README.md                   # Este documento
```

---

## 📦 Instalación

Requisitos:

- Node.js >= 18
- Yarn
- Expo CLI (`npm install -g expo-cli`)

```bash
# Clonar el repositorio
git clone https://github.com/Eduardoleor/amx-2.1.git
cd amx-2.1

# Instalar dependencias
yarn install

# Iniciar la app en modo desarrollo
yarn start

# Lanzar la app en Android
yarn android

# Lanzar la app en iOS
yarn ios
```

---

## 🔧 Scripts disponibles

```bash
yarn start       # Inicia el servidor de desarrollo (expo start)
yarn lint        # Ejecuta el linter
yarn build       # Construye la app (usando EAS si está configurado)
```

---

## 🔐 Manejo de estado

La app no utiliza Redux. En su lugar, emplea:

- `contexts/` para manejar sesión, tema y otras configuraciones globales.
- `React Query` para sincronizar datos remotos con la UI.
- `hooks/` personalizados para encapsular lógica específica.

---

## 🌐 Navegación

La app utiliza **Expo Router**, un sistema de enrutamiento basado en el filesystem. Cada archivo
dentro de `app/` representa una ruta (screen).

Ejemplo:

```
app/
├── index.tsx          # Pantalla principal
├── login.tsx          # Pantalla de login
└── profile/
    └── index.tsx      # Ruta: /profile
```

---

## 📌 Convenciones de diseño

- **Estilos**: Se implementan con `styled-components`, respetando el sistema de diseño definido en
  `theme/`.
- **Componentes**: Nombrados y estructurados siguiendo Atomic Design.
- **Validaciones**: Centralizadas en `helpers/validators.ts` (ej. correos, contraseñas, etc.).
- **Gestión de sesión**: `contexts/session.context.tsx` maneja login/logout y tokens.

---

## 📄 Licencia

MIT © [Eduardo Leal](https://github.com/Eduardoleor)

---

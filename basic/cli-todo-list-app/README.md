# CLI Todo List | Lista de Tareas CLI

[English](#english) | [Español](#español)

## English

A command-line task management application built with TypeScript.

### Features
- Create, read, update and delete tasks
- Mark tasks as complete/incomplete
- Color-coded interface
- Persistent storage using JSON
- Written in TypeScript

### Prerequisites
- Node.js (v16 or higher)
- npm or pnpm

### Installation
```bash
git clone [repository-url]
cd cli-todo-list
pnpm install
```

### Usage
Development mode:
```bash
pnpm dev
```

Build and run:
```bash
pnpm build
pnpm start
```

### Commands
1. View all tasks
2. Add new task
3. Toggle task status
4. Delete task
5. Exit

### Project Structure
```
src/
├── services/     # Business logic
├── types/        # TypeScript interfaces
├── utils/        # Helper functions
└── index.ts      # Entry point
```

## Español

Una aplicación de gestión de tareas por línea de comandos construida con TypeScript.

### Características
- Crear, leer, actualizar y eliminar tareas
- Marcar tareas como completadas/pendientes
- Interfaz con códigos de colores
- Almacenamiento persistente usando JSON
- Desarrollada en TypeScript

### Requisitos Previos
- Node.js (v16 o superior)
- npm o pnpm

### Instalación
```bash
git clone [url-repositorio]
cd cli-todo-list
pnpm install
```

### Uso
Modo desarrollo:
```bash
pnpm dev
```

Compilar y ejecutar:
```bash
pnpm build
pnpm start
```

### Comandos
1. Ver todas las tareas
2. Agregar nueva tarea
3. Cambiar estado de tarea
4. Eliminar tarea
5. Salir

### Estructura del Proyecto
```
src/
├── services/     # Lógica de negocio
├── types/        # Interfaces de TypeScript
├── utils/        # Funciones auxiliares
└── index.ts      # Punto de entrada
```

## Tech Stack | Tecnologías
- TypeScript
- Node.js
- chalk (estilizado de terminal)

## License | Licencia
MIT
<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
=======
# 📋 Task CRUD

API REST em Node.js para gerenciamento completo de tarefas, com interface web em React + TypeScript.

## 🚀 Tecnologias

**Back-end**
- Node.js (HTTP nativo, sem frameworks)
- Persistência em arquivo JSON
- Importação em massa via CSV com `csv-parse`

**Front-end**
- React + TypeScript
- Vite
- Tailwind CSS v4

## ✅ Funcionalidades

- Criar, listar, editar e deletar tarefas
- Marcar tarefas como concluídas (toggle)
- Filtrar tarefas por título e descrição
- Importar tarefas em massa via arquivo CSV com preview e barra de progresso

## 📁 Estrutura

```
task-crud/
├── src/
│   ├── server.js         # Servidor HTTP
│   ├── routes.js         # Rotas da API
│   ├── database.js       # Banco de dados em JSON
│   └── middlewares/
│       └── json.js       # Parser do body
├── import-csv.js         # Script de importação CSV via terminal
├── tasks.csv             # Exemplo de arquivo CSV
└── package.json

crud-front/
└── src/
    ├── api.ts            # Chamadas à API
    ├── types.ts          # Interfaces TypeScript
    ├── App.tsx
    ├── hooks/
    │   ├── useTasks.ts
    │   └── useToast.ts
    └── components/
        ├── Header.tsx
        ├── Tabs.tsx
        ├── TaskList.tsx
        ├── NewTask.tsx
        ├── ImportCSV.tsx
        └── Toast.tsx
```

## 🔧 Como rodar

**API**
```bash
cd task-crud
npm install
node src/server.js
```

**Front-end**
```bash
cd crud-front
npm install
npm run dev
```

Acesse `http://localhost:5173`

## 🗂️ Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /tasks | Listar tarefas (aceita `?title=` e `?description=`) |
| POST | /tasks | Criar tarefa |
| PUT | /tasks/:id | Atualizar tarefa |
| DELETE | /tasks/:id | Deletar tarefa |
| PATCH | /tasks/:id/complete | Marcar/desmarcar como concluída |

## 📄 Formato do CSV

```csv
title,description
Estudar Node.js,Aprender HTTP nativo
Fazer exercícios,Treinar 30 minutos
>>>>>>> b023e728b616dd60ea751ed5c7da8787ea334772
```

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
```

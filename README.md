# Weather report

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn--ui-111827?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

## Sobre o projeto

Sou o desenvolvedor full‑stack responsável pela concepção e entrega deste projeto de previsão do tempo.
Combinei design de produto centrado no usuário com decisões arquiteturais práticas para construir
uma aplicação escalável e de fácil deploy.

**Entrega:** interface responsiva com busca e favoritos, API modular com autenticação JWT,
pipeline de processamento de dados e workers containerizados.

**Impacto:** protótipo pronto para demonstração técnica, fácil de estender para integração
com provedores de dados e pipelines de CI/CD.

## Principais destaques técnicos

**Arquitetura:** monorepo com separação clara entre `frontend` (React + Vite), `backend` (NestJS)
e processamento off‑line (Python + Go workers).

**Integrações:** filas/async com `RabbitMQ`, containers com `Docker/Docker Compose` e scripts
de ingestão em Python.

**UX:** `Tailwind CSS` e `shadcn/ui` para componentes reutilizáveis e design consistente.

### Stack utilizada

- Frontend: React, TypeScript, Vite
- Backend: NestJS, TypeScript, JWT
- Data & Workers: Python (ingestão/transformação), Go (workers concorrentes)
- Infra/DevOps: Docker, Docker Compose, RabbitMQ
- UI/Styling: Tailwind CSS, shadcn/ui, HTML, CSS

## Como executar localmente

Siga os comandos abaixo para rodar o projeto localmente.

```bash
# Backend
cd backend/weather
npm install
npm run start:dev

# Frontend
cd ../../weather-report
npm install
npm run dev

# Docker-compose
cd ../../
docker-compose up -d
```

### Onde avaliar o código

Entrada do backend: `backend/weather/src/main.ts`

Estratégia de autenticação: `backend/weather/src/auth/jwt.strategy.ts`

Entrada do frontend: `weather-report/src/main.tsx`

Pipeline de ingestão: `data_processing/weather.py`

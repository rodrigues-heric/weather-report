# 🌦️ Weather Report

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

> Uma plataforma full-stack de previsão meteorológica projetada para alta performance, escalabilidade e experiência de usuário fluida.

## 🎯 Visão Geral do Produto

Este projeto demonstra a capacidade de construir uma aplicação web moderna de ponta a ponta, simulando desafios reais de engenharia de software, como processamento de dados em larga escala e interfaces responsivas.

### 📷 Demonstração (Screenshot)

Foo | Foo | Imagem Foo

### 🚀 O que este projeto entrega?

- **Experiência do Usuário (UX):** Interface intuitiva construída com componentes modernos, permitindo busca de previsões, sistema de favoritos e visualização de dados climáticos.
- **Performance e Robustez:** O sistema foi projetado para não travar. Tarefas pesadas são enviadas para "filas" e processadas em segundo plano, mantendo a tela do usuário sempre rápida.
- **Segurança:** Implementação de autenticação segura e proteção de rotas.

### 💡 Competências Demonstradas

Como desenvolvedor responsável pela **concepção e entrega full-stack**, este projeto destaca:

- **Visão de Produto:** Tradução de requisitos técnicos em funcionalidades úteis para o usuário final.
- **Arquitetura Escalável:** O sistema está pronto para crescer, separado em microsserviços que podem ser ampliados independentemente.
- **Versatilidade (Poliglotismo):** Uso da linguagem certa para a tarefa certa (Python para dados, Go para performance, TypeScript para web).

## 🛠️ Documentação Técnica

Detalhes sobre a arquitetura orientada a eventos, decisões de stack e instruções de setup.

### 🏗️ Arquitetura do Sistema

O projeto utiliza uma arquitetura híbrida de microserviços com **RabbitMQ** para desacoplar a API dos workers de processamento.

```mermaid
graph TD
    Client[💻 Frontend (React + Vite)] -->|REST API| API[🛡️ Backend Gateway (NestJS)]
    API -->|Autenticação| Auth[JWT Strategy]
    API -->|Publica Evento| RMQ[🐇 RabbitMQ Cluster]

    RMQ -->|Consome Dados| PyWorker[🐍 Python Worker (Ingestão/ETL)]
    RMQ -->|Consome Jobs| GoWorker[🐹 Go Worker (Alta Concorrência)]

    PyWorker --> DB[(Database)]
    GoWorker --> DB
```

### 💻 Tech Stack & Decisões

| Camada    | Tecnologias                            | Por que foi escolhida?                                                                                         |
| --------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Frontend  | React, TypeScript, Tailwind, shadcn/ui | Combinação de desenvolvimento rápido com tipagem segura e componentes de UI acessíveis e consistentes.         |
| Backend   | NestJS, TypeScript, JWT                | Framework robusto e opinativo que facilita a modularização, injeção de dependência e manutenção a longo prazo. |
| Messaging | RabbitMQ                               | Garante que mensagens não sejam perdidas e permite o processamento assíncrono (Fire and Forget).               |
| Workers   | Python & Go                            | **Python** pela facilidade em manipulação de dados; **Go** pela performance bruta em concorrência.             |
| DevOps    | Docker, Docker Compose                 | "Infrastructure as Code" para garantir que o ambiente de desenvolvimento seja idêntico ao de produção.         |

### 📂 Estrutura de Diretórios Chave

```bash
/
├── backend/weather/       # API Principal (NestJS)
│   ├── src/auth/          # Lógica de Autenticação e JWT Guards
│   └── src/main.ts        # Entrypoint da API
├── weather-report/        # Frontend (React + Vite)
│   └── src/main.tsx       # Entrypoint da UI
├── data_processing/
│   └── weather.py         # Pipeline de ingestão (Python)
├── go-worker/
│   └── main.go            # Worker concorrente (Go)
└── docker-compose.yml     # Orquestração de todos os serviços
```

### 🚀 Como executar o projeto

Você pode rodar a aplicação completa utilizando Docker e rodando o
frontend e backend

**Primeiro**

Suba os serviços de banco de dados e os workers:

```bash
# Na raiz do projeto
docker-compose up -d
```

**Segundo**

Suba o backend rodando:

```bash
cd backend/weather/
npm run start
```

**Terceiro**

Suba o frontend rodando:

```bash
cd weather-report/
npm run dev
```

## 🧪 Onde avaliar o código

Se você tem pouco tempo, foque nestes arquivos para entender a qualidade do código:

- **Entrada do Backend:** backend/weather/src/main.ts
- **Segurança/Auth:** backend/weather/src/auth/jwt.strategy.ts
- **Pipeline de Dados:** data_processing/weather.py
- **Frontend Entry:** weather-report/src/main.tsx

## 📄 Licença

Distribuído sob a licença **MIT**. Veja `LICENSE` para mais informações.

Desenvolvido por Heric Leite Rodrigues.

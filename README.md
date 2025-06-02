# Sistema de Agendamento de Ensaios Fotográficos 📸

Este é um projeto completo de backend com Spring Boot que simula um sistema de agendamento de ensaios fotográficos.

## Funcionalidades

- Cadastro e autenticação de usuários (JWT)
- CRUD completo de agendamentos, campanhas e ensaios
- Confirmação de agendamento
- Envio de campanhas promocionais

## Tecnologias utilizadas

- Java 17
- Spring Boot
- Spring Security (JWT)
- MySQL
- JPA/Hibernate

## Como executar

1. Clone o repositório
2. Configure o `application.properties` com os dados do seu banco
3. Execute com Maven ou pelo Spring Boot Dashboard

## Endpoints principais

- `/api/auth` – autenticação
- `/api/usuarios` – gerenciamento de usuários
- `/api/agendamentos` – agendamentos
- `/api/ensaios` – tipos de ensaio
- `/api/campanhas` – campanhas promocionais

## Testes

Testes automatizados com JUnit disponíveis na pasta `src/test`.

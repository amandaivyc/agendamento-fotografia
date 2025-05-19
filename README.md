# 📸 Sistema de Agendamento de Ensaios Fotográficos

Este projeto simula uma plataforma de agendamento online de ensaios fotográficos, com funcionalidades completas de frontend e backend. Foi desenvolvido como case prático para demonstrar habilidades em **QA Automation**, testes de API e interface, integração com CI/CD e versionamento de código.

---

## 🚀 Funcionalidades

- Cadastro e login de usuários
- Visualização de agenda e agendamentos
- Agendamento de ensaios fotográficos
- Confirmação por pagamento (simulado)
- Painel de envio de campanhas promocionais (usuário admin)
- Dashboard de agendamentos e campanhas
- Integração com banco de dados H2 (em memória)

---

## 🛠️ Tecnologias Utilizadas

### Backend
- Java 17 + Spring Boot
- Spring Data JPA + H2 Database
- Spring Security (autenticação simples)
- Maven
- JUnit 5
- Jenkins (simulado para CI/CD)
- Postman + RestAssured para testes de API

### Frontend
- React 18 + Tailwind CSS
- Axios (requisições HTTP)
- Simulação de login com token local
- Integração com APIs REST

---

## 🧪 Testes Automatizados

- `JUnit`: testes unitários para controllers (login, agendamento, campanha)
- `Postman`: collection com simulação de login, agendamento e envio de campanha
- `Jest`: testes simulados no frontend (em desenvolvimento)
- Testes exploratórios e scripts manuais incluídos no `README/testes.md`

---

## 🖥️ Como Executar

### Requisitos
- Java 17+
- Maven
- Node.js + npm

### Backend
```bash
cd agendamento-fotografia-backend
mvn spring-boot:run
```

Acesse o console H2: http://localhost:8080/h2-console  
JDBC URL: `jdbc:h2:mem:agendamento` – Usuário: `sa` – Senha: *(em branco)*

### Frontend
```bash
cd agendamento-fotografia-frontend
npm install
npm start
```

Acesse: http://localhost:3000

---

## 🔐 Login de Demonstração

- Email: `admin@foto.com`
- Senha: `123`

---

## 🧰 Recursos Adicionais

- [`Postman_AgendamentoFotografia_Collection.json`](./Postman_AgendamentoFotografia_Collection.json)
- [`Tutorial-Projeto-Fotografia.pdf`](./Tutorial-Projeto-Fotografia.pdf)
- Scripts de automação:
  - [`start-projeto.bat`](./start-projeto.bat)
  - [`start-projeto.sh`](./start-projeto.sh)

---

## 📷 Imagens do Projeto

<img src="print1.png" width="100%">
<img src="print2.png" width="100%">

---

## ✨ Diferenciais para QA

- Aplicação baseada em fluxo real de agendamento online
- Cobertura de testes de ponta a ponta
- Automação com Java, API e CI/CD simulados
- Repositório limpo, organizado e documentado

---

## 📌 Licença

Este projeto é livre para estudo, demonstração e adaptação para fins profissionais.

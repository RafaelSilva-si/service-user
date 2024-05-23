# User Service -  Tickets Microservices
> Status: Em desenvolvimento ⚙

Esse projeto é um [Microserviço](https://www.redhat.com/pt-br/topics/microservices/what-are-microservices) que pertence ao projeto [Tickets Microservices](https://github.com/RafaelSilva-si/tickets-microservices) que exemplifica os conceitos e fundamentos dos microserviços, implementados utilizando Node.js e Express. O foco principal é a criação de uma aplicação de vendas de tickets para eventos. Adotando práticas de Clean Code e TDD (Test-Driven Development), este projeto não apenas oferece uma implementação funcional, mas também destaca a importância da organização do código e da escrita de testes robustos.
## Boas Práticas

### TDD
Esse projeto usa TDD (Test-Driven Development), uma metodologia onde os testes são escritos antes do código. Isso garante que cada nova funcionalidade seja testada desde o início, ajudando a prevenir bugs e melhorar a qualidade do software.
Você pode ver mais em um artigo que fiz sobre TDD: [Entendendo o TDD](https://dev.to/rafa_dev/tdd-2mpa).

### Eslint
Este projeto usa ESLint, uma ferramenta essencial para identificar e corrigir problemas em JavaScript e TypeScript. Além disso, usamos TypeScript para garantir uma tipagem estática robusta, aumentando a segurança e a manutenção do código. Também integramos o Prettier para formatação automática do código, assegurando um estilo consistente em todo o projeto. Essa combinação de ferramentas ajuda a manter o código limpo, consistente e livre de erros, seguindo as melhores práticas de desenvolvimento.
### CI
Este projeto utiliza CI (Integração Contínua) com GitHub Actions. GitHub Actions automatiza tarefas de desenvolvimento, como testes e deploys, sempre que novas alterações são enviadas ao repositório. Isso garante que o código seja continuamente testado e integrado, facilitando a detecção precoce de bugs e mantendo a qualidade e a integridade do projeto ao longo do tempo.
## Instalação com Docker
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
1. Clone o repositório.
2. Navegue até o diretório do projeto.
3. Em um terminal rode o comando `docker compose -f docker-compose.yml up`
4. Aplicação rodando em http://localhost:3000/.


![1627616883421](https://user-images.githubusercontent.com/77937182/157932279-c8aad7d0-0778-43c0-be52-b7e175d56835.gif)

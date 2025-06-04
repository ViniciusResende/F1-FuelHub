# F1-FuelHub

### Projeto de Engenharia de Software II - UFMG

## Sobre

O F1-FuelHub é um projeto desenvolvido como parte da disciplina de Engenharia de Software II na Universidade Federal de Minas Gerais (UFMG). O sistema tem como objetivo fornecer uma plataforma iterativa para entusiastas da Fórmula 1.

## Autores

- Vinicius Alves
- Lucas Albano
- Romana Gallete

## Visão Geral do Sistema

### Descrição de Alto Nível

O F1-FuelHub é uma aplicação web projetada para prover informações interessantes sobre a Fórmula 1, de forma que um entusiasta do esporte possa interagir com a plataforma e enriquecer sua experiência com o esporte. Com uma UI moderna o F1-FuelHub disponibiliza uma experiência única para o usuário, trazendo insights sobre as novidades do esporte, métricas interessantes, feitos históricos, estatísticas e a opção de interagir com a comunidade por meio da escolha de equipes favoritas.

### Arquitetura do Backend

O backend é construído sobre uma stack moderna e robusta utilizando **Node.js** e o framework **Express**, com **TypeScript** para segurança de tipos e melhoria da qualidade do código. Ele segue uma estrutura inspirada no padrão **Model-View-Controller (MVC)**, adaptada para a escala do projeto. Para as operações de banco de dados, o sistema utiliza **MongoDB**, gerenciado através de uma configuração `docker-compose` para facilitar o desenvolvimento e a implantação. A modelagem de dados e a interação com o banco de dados MongoDB são tratadas pelo ODM **Mongoose**. Uma característica chave do backend é sua integração com a **API externa OpenF1**, que serve como fonte primária de dados para muitas das funcionalidades da aplicação. Testes unitários e de integração são escritos com **Jest** para garantir a confiabilidade e a correção da lógica de negócio.

### Arquitetura do Frontend

O frontend é uma aplicação web dinâmica e responsiva construída com **Next.js**, um poderoso framework React que permite renderização no lado do servidor (Server-Side Rendering) e uma excelente experiência de desenvolvimento. Todo o estilo é personalizado e construído com **Sass**, permitindo um sistema de design único e de fácil manutenção, sem dependência de bibliotecas de componentes externas. Para o gerenciamento de estado, a aplicação emprega uma solução customizada e leve baseada no padrão de projeto **Observer (Pub/Sub)**, centralizando a lógica de negócio em uma biblioteca dedicada em TypeScript. Essa abordagem mantém os componentes limpos e focados na apresentação. A comunicação com o backend e a API externa OpenF1 é gerenciada por um cliente de API sofisticado e customizado, que encapsula a **Fetch API** nativa. Este cliente inclui funcionalidades avançadas como cancelamento de requisições, timeouts configuráveis, tratamento de erros customizados e gerenciamento simplificado de headers e query parameters.

## Tecnologias Utilizadas

Este projeto utiliza uma stack moderna e poderosa tanto para o desenvolvimento do backend quanto do frontend, garantindo uma aplicação robusta, escalável e de fácil manutenção.

### Tecnologias do Backend

O backend é responsável pela lógica de negócio, processamento de dados e serviços de API.

- **[Node.js](https://nodejs.org/)**: Um ambiente de execução JavaScript assíncrono e orientado a eventos, projetado para construir aplicações de rede escaláveis. É usado para executar JavaScript no lado do servidor.
- **[Express](https://expressjs.com/)**: Um framework para aplicações web Node.js, minimalista e flexível, usado para criar nossas APIs RESTful, gerenciar rotas e lidar com requisições HTTP.
- **[TypeScript](https://www.typescriptlang.org/)**: Um superset de JavaScript com tipagem estática que adiciona segurança de tipos, ajudando a detectar erros antecipadamente e a melhorar a qualidade do código.
- **[MongoDB](https://www.mongodb.com/)**: Um banco de dados NoSQL orientado a documentos, utilizado para armazenar os dados da aplicação em documentos flexíveis, semelhantes a JSON.
- **[Mongoose](https://mongoosejs.com/)**: Uma biblioteca de Modelagem de Dados de Objeto (ODM) para MongoDB, que fornece uma solução baseada em esquemas (schemas) para modelar os dados da aplicação e gerenciar validações.
- **[Docker](https://www.docker.com/)**: Uma plataforma usada para criar um ambiente de desenvolvimento consistente para nossa instância do MongoDB através do `docker-compose`.
- **[Jest](https://jestjs.io/)**: Um framework de testes em JavaScript usado para escrever e executar testes unitários e de integração para nossos serviços de backend.

### Tecnologias do Frontend

O frontend entrega uma interface de usuário responsiva, intuitiva e rica em funcionalidades.

- **[Next.js](https://nextjs.org/)**: Um framework React que habilita funcionalidades como Renderização no Lado do Servidor (SSR) para construir interfaces de usuário rápidas, amigáveis para SEO e altamente interativas.
- **[TypeScript](https://www.typescriptlang.org/)**: Usado no frontend para garantir a segurança de tipos, que é crucial para construir interfaces de usuário complexas e gerenciar o estado da aplicação de forma confiável.
- **[Sass](https://sass-lang.com/)**: Um pré-processador CSS que estende o CSS com funcionalidades como variáveis, aninhamento e mixins para escrever folhas de estilo mais organizadas e de fácil manutenção.
- **[Jest](https://jestjs.io/)**: Usado para testar componentes, páginas e funções utilitárias, garantindo que a interface do usuário funcione como esperado.

## Como Começar

Este projeto é configurado como um monorepo usando **Lerna** para gerenciar os pacotes de backend e frontend de forma integrada.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/download/) (versão 18 ou superior recomendada)
- [Docker](https://www.docker.com/products/docker-desktop/) e Docker Compose

### Instalação e Configuração

1.  **Clone o repositório:**

    ```sh
    git clone https://github.com/seu-usuario/F1-FuelHub.git
    cd F1-FuelHub
    ```

2.  **Instale todas as dependências:**
    Este comando instalará as dependências para os pacotes de frontend e backend.

    ```sh
    npm install
    ```

3.  **Inicie o banco de dados:**
    Este comando executa o arquivo `docker-compose.yml` para iniciar o contêiner do MongoDB.

    ```sh
    npm run dev:db
    ```

4.  **Execute a aplicação:**
    Este comando inicia os servidores de desenvolvimento do backend e do frontend simultaneamente.

    ```sh
    npm run dev
    ```

5.  **Abra a aplicação:**
    Acesse a aplicação F1-FuelHub em seu navegador em [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000).

## Como Contribuir

Contribuições são bem-vindas\! Nós seguimos o fluxo de trabalho padrão de **Fork & Pull Request**. Se você deseja contribuir, por favor, siga estes passos:

1.  Faça um **Fork** do repositório para a sua própria conta do GitHub.
2.  Crie uma nova branch para sua feature ou correção de bug (`git checkout -b feature/sua-feature`).
3.  Faça o commit das suas alterações (`git commit -m 'Adiciona nova feature'`).
4.  Envie sua branch para o seu fork (`git push origin feature/sua-feature`).
5.  Abra um **Pull Request** para o repositório principal.

Por favor, garanta que seu código segue o estilo de código existente e que todos os testes passam antes de submeter um pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

---

Copyright (c) 2024 Vinicius Alves, Lucas Albano, Romana Gallete

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

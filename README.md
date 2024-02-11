<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">Este é um microsserviço responsável pelos pedidos do app lanchonete usando as melhores práticas de arquitetura de software.</p>
  <p align="center">
    <a href="https://nodejs.org/en" target="_blank"><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.JS" /></a>
    <a href="https://www.typescriptlang.org" target="_blank"><img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="Typescript" /></a>
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" alt="NPM Version" /></a>
    <a href="https://www.postgresql.org" target="_blank"><img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" /></a>
    <a href="https://www.docker.com" target="_blank"><img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" /></a>
  </p>
</p>


<!-- TITULO DO PROJETO -->
<br />
<div align="center">
  <h3 align="center">Lanchonete Order Service</h3>
</div>



<!-- COMECANDO -->
## Começando

Para executar o projeto localmente siga as próximas etapas.

### Pré-requisitos

* Docker com compose
  Veja a [documentação](https://docs.docker.com/engine/install/) para instalar o docker no seu sistema se ainda não tiver instalado.
* NodeJS no mínimo na versão 16. Recomendado a versão 18 (LTS) disponível no [site oficial](https://nodejs.org/en).

### Instalação

A instalação é bem simples, siga as seguintes etapas:

1. Clone o repositório
   ```sh
   git clone https://github.com/fiap-soat-tech-challenge/lanchonete-order-service
   ```
2. Entre na pasta do projeto
   ```sh
   cd lanchonete-order-service
   ```
3. Crie um arquivo novo arquivo com as váriaveis de ambiente `.env` usando o `.env.example`
   ```sh
   cp .env.example .env
   ```
4. Agora execute o projeto usando o docker compose
   ```sh
   docker compose --profile=all up
   ```

<p align="right">(<a href="#readme-top">Voltar para o topo</a>)</p>

<!-- EXEMPLOS DE USO -->
## Exemplos de uso

### Para acessar a home da API
- http://localhost:3002/

Nessa página você terá o link para a documentação (Swagger) e poderar utilizar toda a aplicação!

### Para acessar o Swagger UI use uma das seguintes URLs
- http://localhost:3002/api/docs

### Health Check
    http://localhost:3002/health

A resposta deve seguir o seguinte formato:

```json
{
  "status": "ok",
  "info": {
    "database": {
      "status": "up"
    },
  },
  "error": {
    
  },
  "details": {
    "database": {
      "status": "up"
    },
  }
}
```

<p align="right">(<a href="#readme-top">Voltar para o topo</a>)</p>

## Banco de dados

Para o projeto utilizamos o banco de dados PostgreSQL que suporta uma variedade de tipos de dados diferentes, possui uma licença de código aberto, ou seja, podendo ser utilizado por diversas aplicações de forma gratuita. Utiliza a linguagem SQL, tornando mais fácil a migração para outros bancos de dados relacionais, caso surja a necessidade. Também da suporte a transações ACID e pode lidar com grandes volumes de dados.

O PostgreSQL se tornou muito popular pela sua fácil utilização, sendo assim uma ótima opção para se trabalhar em equipes e aplicações de pequeno porte, facilitando o entendimento e manutenção do projeto entre integrantes da equipe. Por conseguir lidar com grandes quantidades de dados, o PostgreSQL ė uma ótima opção ao se trabalhar com análise de dados, e também possui a capacidade de expandir de acordo com o crescimento da aplicação, já que inicialmente ela será de pequeno porte.

Por fim, conseguimos gerenciar e monitorar o nosso banco de dados utilizando recursos disponibilizados no próprio PostgreSQL, garantindo o desempenho e segurança dos nossos dados.

<p align="right">(<a href="#readme-top">Voltar para o topo</a>)</p>

## SAGA Pattern - Coreografia

Utilizamos a estratégia **coreografia**.

Decidimos utilizar a estratégia **coreografia** por ser mais simples e ter um acoplamento fraco entre os serviços. Assim,
pensando nos próximos passos, a evolução dos microsserviços se torna mais tranquila já que os mesmos vão estar sem
acoplamento com os demais e poderemos também ao ponto que aumentamos o time (de desenvolvedores) dividir a sub times,
o que vai facilitar o crescimento do time. Assim, por ser mais simples do que a estratégia orquestração, podemos
implementar mais rapidamente, e com isso entregar uma primeira versão do software mais rápido.

No futuro com a evolução, do software, do time, e mudanças no negócio (possivelmente) podemos pensar em utilizar a
orquestração, mas no momento é mais vantajoso usarmos a estratégia **coreografia**. Assim cada serviço sabe qual
evento disparar e qual evento deve ouvir para que a saga seja completa.

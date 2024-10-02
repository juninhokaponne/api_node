# Back-end api-node

O projeto foi desenvolvido com o intuito de criar uma API para gerenciar usuários e consumir apis públicas de terceiros.

## Instalação

Para instalar e rodar a API basta rodar os seguintes comandos

1 - Clonando o projeto

```bash
git clone https://github.com/juninhokaponne/api_node.git
```

2 - Instalando as dependências

```
npm install
```

3 - Rodar as migrations

```bash
npx prisma migrate dev
```

4 - Rodar o conteiner ( -D ou Detached mode: Roda um container em background )

```
docker-compose up -d
```

5 - Rodar o projeto localmente

```
npm run dev
```

6 - Rodar os testes

```
npm run test
```

## Documentação da API

#### Retorna todos os usuários

```http
  GET /localhost/api/users
```

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_URL`

OBS: Rodando localmente você pode utilizar as mesmas informações que disponibilizei no **docker-compose.yml** com base nele só montar a url de conexão.
Dessa forma você consegue rodar um container local rodando postgres com conexão com o prisma.

## Stack utilizada

**Back-end:** Node, Express, Jest, Prisma.

**Arquitetura do projeto:** Me inspirei na Layered Architecture + Clean Code.

**Principios**: Solid

## Referência

[The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## Melhorias

Alguns pontos que buscaria melhorar na minha solução seriam, autenticação, middlewares, testes, CI/CD, documentação ... são alguns pontos que identifico que poderiam ser feitos.

## Licença

[MIT](https://choosealicense.com/licenses/mit/)

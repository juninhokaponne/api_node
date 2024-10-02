# Back-end api-node

O projeto foi desenvolvido com o intuito de criar uma API para gerenciar usuários e consumir apis públicas de terceiros.

## Instalação

Para instalar e rodar a API basta rodar os seguintes comandos

1 - Clonando o projeto

```bash
git clone https://github.com/juninhokaponne/brainAgriculture.git
```

2 - Instalando as dependências

```
npm install
```

3 - Rodar os testes

```
npm run test
```

4 - Rodar o projeto localmente

```
npm run dev
```

5 - Rodar os seeds para gerar dados mockados no banco

```
npm run prisma
```

6 - Rodar o conteiner ( -D ou Detached mode: Roda um container em background )

```
docker-compose up -d
```

## Produção

A API atualmente está rodando em produção através do serviço do Heroku com suporte ao banco de dados postgres de produção.

Para consultar o endereço de produção basta acessar o link abaixo e também disponivel na descrição do projeto.

https://brainagriculture-eeedf734e203.herokuapp.com/producers

## Documentação da API

#### Retorna todos os itens

```http
  POST /localhost/producers
```

| Parâmetro        | Tipo     | Descrição                                            |
| :--------------- | :------- | :--------------------------------------------------- |
| `name`           | `string` | **Obrigatório**                                      |
| `cpfOrCnpj`      | `string` | **Obrigatório**                                      |
| `farmName`       | `string` | **Obrigatório**                                      |
| `city`           | `string` | **Obrigatório**                                      |
| `state`          | `string` | **Obrigatório**                                      |
| `totalArea`      | `number` | **Obrigatório**                                      |
| `arableArea`     | `number` | **Obrigatório**                                      |
| `vegetationArea` | `number` | **Obrigatório**                                      |
| `crops`          | `[]`     | **OPCIONAL**: Campo referente às culturas plantadas. |

exemplo de payload: Com cultura

```
  {
    "cpfOrCnpj": "12417200090",
    "name": "Gilson Oliveira",
    "farmName": "Colheita Feliz 2",
    "city": "Porto Alegre",
    "state": "RS",
    "totalArea": 122.0,
    "arableArea": 35.0,
    "vegetationArea": 25.0,
		"crops": [
        {
 				 "name": "Algodão"
			  }
    ]
}
```

Sem cultura

```
{
    "cpfOrCnpj": "12417200090",
    "name": "Gilson Oliveira",
    "farmName": "Colheita Feliz 2",
    "city": "Porto Alegre",
    "state": "RS",
    "totalArea": 122.0,
    "arableArea": 35.0,
    "vegetationArea": 25.0
}
```

#### Retorna todos os agricultores

```http
  GET /localhost/producers
```

#### Retorna um agricultor pelo ID

```
  GET producers/:id
```

| Parâmetro | Tipo     | Descrição                                   |
| :-------- | :------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Atualiza a informação que você quiser passar pelo ID do agricultor. (exemplo atualizando nome e nome da fazenda)

```
  PUT producers/:id
```

| Parâmetro  | Tipo     | Descrição       |
| :--------- | :------- | :-------------- |
| `name`     | `string` | Jhoon Smith.    |
| `farmName` | `string` | Colheita Feliz. |

### Deleta o agricultor pelo id

```
  DELETE producers/:id
```

Por padrão uma cultura já criada se o usuário quiser junto com a criação do agricultor, com isso um array é criado na cultura referenciando o o mesmo id do agricultor.

É possível criar e associar uma agriculta a um agricultor posteriormente ou quando quiser no seguinte endpoint:

```http
  POST /localhost/crops/associate
```

| Parâmetro  | Tipo     | Descrição                                      |
| :--------- | :------- | :--------------------------------------------- |
| `name`     | `string` | **Obrigatório**                                |
| `farmerId` | `string` | **Obrigatório**: Referente ao ID do agricultor |

#### Retorna uma cultura pelo ID

```
  GET localhost/crops/:id
```

#### Retorna todas as culturas

```
  GET localhost/crops/
```

#### Edita o nome de uma cultura pelo id

```
  PUT localhost/crops/:id
```

| Parâmetro | Tipo     | Descrição       |
| :-------- | :------- | :-------------- |
| `name`    | `string` | **Obrigatório** |

#### Deleta uma cultura pelo ID

```
  DELETE localhost/crops/:id
```

Recebe dois números e retorna a sua soma.

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_URL`

OBS: Rodando localmente você pode utilizar as mesmas informações que disponibilizei no **docker-compose.yml** com base nele só montar a url de conexão.
Dessa forma você consegue rodar um container local rodando postgres com conexão com o prisma.

## Stack utilizada

**Back-end:** Node, Express, Jest, Prisma.

**Arquitetura do projeto:** Me inspirei na Layered Architecture + Clean Code + tests.

**Principios**: Solid

## Referência

[The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## Melhorias

Alguns pontos que buscaria melhorar na minha solução seriam, autenticação, middlewares, testes, CI/CD, documentação ... são alguns pontos que identifico que poderiam ser feitos.

## Licença

[MIT](https://choosealicense.com/licenses/mit/)

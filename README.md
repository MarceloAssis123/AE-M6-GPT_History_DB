# API de Geração e Gerenciamento de Histórias Interativas

## Contexto

&emsp; Em um mundo onde o conteúdo é consumido rapidamente, a demanda por histórias originais e envolventes nunca foi tão alta. Nossa API tem o potencial de revolucionar a maneira como histórias são compartilhadas e experimentadas, oferecendo aplicabilidades em cenários educacionais, colaborativos e de entretenimento.

## Potenciais Usos

- **Plataformas de Conteúdo:** Utilizar a API para oferecer histórias interativas e personalizadas.
- **Escrita Colaborativa:** Ferramenta de brainstorming para equipes de escritores.
- **Jogos Narrativos:** Desenvolvimento de múltiplos ramos de enredo para jogos.
- **Educação:** Ensino de elementos de enredo e desenvolvimento de personagem de forma interativa.

## API

### Gestão de Histórias

- **Criar História:** POST `/story/new`
  - **Parâmetros:** `{ email: string; content: string }`
  - Cria uma nova história com base no email do usuário e no conteúdo fornecido.
  
- **Listar Histórias:** GET `/story/all`
  - Lista todas as histórias disponíveis no banco de dados.
  
- **Detalhes da História:** GET `/story/find`
  - **Parâmetros:** `{ id: string }`
  - Retorna detalhes de uma história específica com base no ID fornecido.
  
- **Atualizar História:** POST `/story/update`
  - **Parâmetros:** `{ id: string, email?: string; content?: string }`
  - Atualiza uma história existente. É possível alterar o email associado ou o conteúdo da história.
  
- **Remover História:** POST `/story/delete`
  - **Parâmetros:** `{ id: string }`
  - Remove uma história com base no ID fornecido.

### Geração de Conteúdo via ChatGPT

- **Gerar Nova Parte da História:** POST `/story/gpt/new`
  - **Parâmetros:** `{ email: string, querry: string }`
  - Gera uma nova parte de história com base em uma prompt enviada.
  
- **Continuar História:** POST `/story/gpt/continuation`
  - **Parâmetros:** `{ email: string, querry: string, id: string }`
  - Continua uma história existente com base em uma prompt e o ID da história.

### Gestão de Usuários

- **Registrar Usuário:** POST `/user/new`
  - **Parâmetros:** `{ name: string; email: string; age: number }`
  - Registra um novo usuário com nome, email e idade.
  
- **Listar Usuários:** GET `/user/all`
  - Lista todos os usuários cadastrados no sistema.
  
- **Buscar Usuário por Email:** GET `/user/find`
  - **Parâmetros:** `{ email: string }`
  - Retorna detalhes de um usuário específico pelo email.
  
- **Atualizar Usuário:** POST `/user/update`
  - **Parâmetros:** `{ email: string, name?: string, age?: number }`
  - Atualiza informações de um usuário existente. Nome e idade são opcionais.
  
- **Remover Usuário:** POST `/user/delete`
  - **Parâmetros:** `{ email: string }`
  - Remove um usuário com base no email fornecido.

## Instalação e Execução

### Intalação de Dependências

```bash
$ npm install
```

### Criando arquivo .env
&emsp; O arquivo `.env` deve conter a chave da api da OpenAi e também a URI de conexão com o banco de dados MongoDB

```
OPENAI_API_KEY= 
URI_MONGO_DB=
```

### Rodando o App

```bashv
# desenvolvimento
$ npm run start

# modo assistido
$ npm run start:dev

# produção
$ npm run start:prod
```

### Rodar Testes

```bash
$ npm run test
```

## Tecnologias Utilizadas
- **NestJS**
- **MongoDB**
- **Node.js**
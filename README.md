# API de Geração e Gerenciamento de Histórias Interativas

## Contexto

&emsp; Em um mundo onde o conteúdo é consumido rapidamente, a demanda por histórias originais e envolventes nunca foi tão alta. Nossa API tem o potencial de revolucionar a maneira como histórias são compartilhadas e experimentadas, oferecendo aplicabilidades em cenários educacionais, colaborativos e de entretenimento.

## Potenciais Usos

- **Plataformas de Conteúdo:** Utilizar a API para oferecer histórias interativas e personalizadas.
- **Escrita Colaborativa:** Ferramenta de brainstorming para equipes de escritores.
- **Jogos Narrativos:** Desenvolvimento de múltiplos ramos de enredo para jogos.
- **Educação:** Ensino de elementos de enredo e desenvolvimento de personagem de forma interativa.

## Funcionalidades

### Gestão de Histórias

- **Criar História:** POST `/story/new` - Cria uma nova história.
- **Listar Histórias:** GET `/story/all` - Lista todas as histórias.
- **Detalhes da História:** GET `/story/:id` - Retorna detalhes de uma história específica.
- **Atualizar História:** POST `/story/update` - Atualiza uma história existente.
- **Remover História:** POST `/story/delete` - Remove uma história.

### Geração de Conteúdo via ChatGPT

- **Gerar Nova Parte da História:** POST `/story/gpt/new` - Gera uma nova parte da história com base em uma prompt.
- **Continuar História:** POST `/story/gpt/continuation` - Continua uma história existente com base em uma prompt.

### Gestão de Usuários

- **Registrar Usuário:** POST `/user/new` - Cria um novo usuário.
- **Listar Usuários:** GET `/user/all` - Lista todos os usuários.
- **Buscar Usuário por Email:** GET `/user/find` - Retorna um usuário específico pelo email.
- **Atualizar Usuário:** POST `/user/update` - Atualiza dados do usuário.
- **Remover Usuário:** POST `/user/delete` - Remove um usuário.

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
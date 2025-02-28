
# Desafio dev fullstack



## Stack

**Front:** Next.js, TailwindCSS, ShadCN

**Server:** NestJS

**DB:** MySQL, Prisma ORM


## Demo

![Descrição da imagem](https://cdn.discordapp.com/attachments/1211513058908700694/1345045114904379465/image.png?ex=67c31e61&is=67c1cce1&hm=b828048fb83dacda1999b2146c53b4f9f41c1997465a97c5fbceeefc95d39e48&)


É possível filtrar a lista de simulações, e baixar PDF com as informações das contas decodificadas.
## Variáveis de ambiente

Copie o arquivo .env.example e crie um arquivo .env na raiz da pasta /backend
````
DATABASE_URL="postgresql://user:password@localhost:port/database?schema=public"   
MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE= 
MYSQL_USER= 
MYSQL_PASSWORD=  
````

- postgresql:// → Indica que o banco de dados usado é o PostgreSQL.
- user → Nome do usuário do banco de dados (troque pelo seu usuário).
- password → Senha do usuário do banco de dados.
- localhost → Endereço do servidor do banco de dados. Se estiver rodando no Docker, pode ser o nome do serviço do banco no docker-compose.yml (ex: db), mas o localhost funciona.
- port → Porta do PostgreSQL (padrão é 5432).
- database → Nome do banco de dados criado no PostgreSQL.
- schema=public → Define o schema do banco de dados no PostgreSQL (pode ser public ou outro que você configurou).




## Instalação

Depois de configurar as variáveis de ambiente entre na pasta /backend e rode:
````
docker-compose up --build
````

Após isso vá para a pasta /frontend e rode o mesmo comando
````
docker-compose up --build
````

Agora o projeto estará disponível na porta http://localhost:5173
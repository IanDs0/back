# Use a imagem oficial do Node.js como base
FROM node:18

# Crie e defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos de configuração e dependências
COPY package.json yarn.lock ./

# Instale as dependências usando o Yarn
RUN yarn install

# Execute as migrações do Prisma antes de iniciar o aplicativo
# RUN npx prisma migrate deploy

# Copie todo o código-fonte para o contêiner
COPY . .

# Defina as variáveis de ambiente com base no .env
ENV DATABASE_URL=$DATABASE_URL
ENV JWT_SECRET=$JWT_SECRET

# Exponha a porta onde o aplicativo estará em execução
EXPOSE 3000

# Comando para iniciar o servidor Nest.js
CMD npx prisma migrate deploy && yarn start:prod

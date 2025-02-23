# Use a imagem base do Node.js
FROM node:20

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

RUN npm install -g serve

# Copie o restante do código da aplicação
COPY . .

# Construa a aplicação para produção
RUN npm run build

# Comando para iniciar o servidor
CMD ["serve", "-s", "build"]
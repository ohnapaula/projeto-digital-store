# Drip Store

Loja digital demonstrativa desenvolvida com React, TypeScript e Vite.

Aplicação publicada: [acessar a Drip Store na Vercel](https://projeto-digital-store-fy8fivt9z-ohnapaulas-projects.vercel.app/product/1).

## Pré-requisitos

- Execução local: Node.js 18+ e npm 9+.
- Execução com Docker: Docker Engine e Docker Compose v2 (`docker compose`).

## Executar sem Docker

Clone o repositório e entre na pasta do projeto:

```bash
git clone https://github.com/ohnapaula/projeto-digital-store.git
cd projeto-digital-store
```

Instale as dependências e inicie o ambiente de desenvolvimento:

```bash
npm ci
npm run dev
```

Acesse <http://localhost:5173>.

Para gerar o build de produção:

```bash
npm run build
```

## Executar com Docker

Inicie a aplicação em <http://localhost:8080>:

```bash
docker compose up --build
```

Para executar em segundo plano:

```bash
docker compose up --build -d
```

Consulte os logs:

```bash
docker compose logs --tail=100
```

Pare os containers:

```bash
docker compose down
```

Reconstrua a imagem quando necessário:

```bash
docker compose build
```

## Variáveis de ambiente

Nenhuma variável é obrigatória. Para alterar a porta publicada no host, crie um arquivo `.env` a partir de `.env.example` e ajuste `PORT`:

```bash
cp .env.example .env
PORT=9090
```

Nesse caso, acesse <http://localhost:9090>.

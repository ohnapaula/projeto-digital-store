# ==============================================================================
# Multi-stage Dockerfile — Drip Store (React 18 + Vite + TypeScript)
# Stage 1: Builder (Node.js Alpine)
# Stage 2: Production Runner (Nginx Unprivileged Alpine)
# ==============================================================================

# ------------------------------------------------------------------------------
# Etapa 1: Build da aplicação
# ------------------------------------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Instala dependências de forma determinística a partir do lockfile
COPY package.json package-lock.json ./
RUN npm ci

# Copia código-fonte e assets do projeto
COPY . .

# Executa typecheck e compilação de produção com o Vite
RUN npm run build

# ------------------------------------------------------------------------------
# Etapa 2: Servidor web de produção (Nginx não privilegiado)
# ------------------------------------------------------------------------------
FROM nginxinc/nginx-unprivileged:1.27-alpine AS runner

# Metadados da imagem
LABEL maintainer="Drip Store Team" \
      description="Drip Store digital storefront production image" \
      version="1.0.0"

# Copia configuração customizada do Nginx para SPA
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf

# Copia os artefatos compilados da etapa de build com permissões do usuário nginx (UID 101)
COPY --from=builder --chown=nginx:nginx /app/dist /usr/share/nginx/html

# Exposição da porta padrão não privilegiada do Nginx (8080)
EXPOSE 8080

# Healthcheck nativo utilizando o busybox wget integrado no Alpine
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:8080/healthz || exit 1

# Usuário não privilegiado já configurado na imagem base (nginx: UID 101)
USER nginx

# Inicialização do Nginx em foreground
CMD ["nginx", "-g", "daemon off;"]

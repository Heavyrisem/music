FROM node:18-alpine AS builder
RUN apk update
RUN corepack enable
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=server --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:18-alpine AS installer
ARG NPM_TOKEN

RUN apk update
RUN corepack enable
WORKDIR /app
# RUN npm i -g pnpm
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/turbo.json ./turbo.json
COPY --from=builder /app/.npmrc.build ./.npmrc
RUN pnpm install --frozen-lockfile


FROM node:18-alpine AS sourcer
WORKDIR /app
RUN corepack enable
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
RUN pnpm build --filter=server

FROM node:18-alpine as runner
WORKDIR /app
COPY --from=sourcer /app/ .
CMD [ "node", "apps/server/dist/main.js" ]
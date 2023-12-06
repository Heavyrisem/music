FROM node:18-alpine AS base
WORKDIR /app
RUN npm i -g turbo
COPY . .
RUN turbo prune --scope=front --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:18-alpine AS installer
ARG NPM_TOKEN

WORKDIR /app
RUN npm i -g pnpm
COPY --from=base /app/out/json/ .
COPY --from=base /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=base /app/turbo.json ./turbo.json
COPY --from=base /app/.npmrc.build ./.npmrc
RUN pnpm install --frozen-lockfile


FROM node:18-alpine AS sourcer
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=base /app/out/full/ .
COPY ./apps/front/.next ./apps/front/.next
COPY ./packages/types/dist ./packages/types/dist

FROM node:18-alpine as runner
WORKDIR /app
RUN corepack enable
COPY --from=sourcer /app/ .

WORKDIR /app/apps/front
CMD ["pnpm", "start"]
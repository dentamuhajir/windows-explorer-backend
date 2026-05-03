FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install

COPY . .

RUN bunx prisma generate

EXPOSE 3000

CMD bunx prisma migrate deploy && \
    bunx prisma db seed && \
    bun src/main.ts
FROM oven/bun:1.1.14

WORKDIR /app/Server
COPY ./Server ./

RUN bun install

CMD ["bun", "run", "src/index.ts"]

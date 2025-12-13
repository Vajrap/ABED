FROM oven/bun:1.1.14

WORKDIR /app/Server

# Copy package files first for better layer caching
COPY ./Server/package.json ./

# Install dependencies
# This will install all dependencies including @xenova/transformers and sharp
# sharp will be installed for the correct platform (linux-arm64v8) during build
RUN bun install

# Copy the rest of the Server code (node_modules excluded via .dockerignore)
# This ensures we use the node_modules installed above, not from host
COPY ./Server ./

# Verify critical dependencies are installed
RUN test -d node_modules/@xenova/transformers || (echo "ERROR: @xenova/transformers not found!" && exit 1)

CMD ["bun", "run", "src/index.ts"]

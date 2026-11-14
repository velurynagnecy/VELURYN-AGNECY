# Multi-stage Dockerfile for VELURYN AGNECY (React Frontend + Axum Rust Backend)
FROM node:22-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM rust:1.85-slim-bookworm AS rust-builder
WORKDIR /app/backend
RUN apt-get update && apt-get install -y pkg-config libssl-dev && rm -rf /var/lib/apt/lists/*
COPY backend/Cargo.toml ./
COPY backend/src ./src
RUN cargo build --release

FROM debian:bookworm-slim
WORKDIR /app/backend
RUN apt-get update && apt-get install -y ca-certificates libssl3 && rm -rf /var/lib/apt/lists/*
COPY --from=frontend-builder /app/dist /app/dist
COPY --from=rust-builder /app/backend/target/release/veluryn-backend /app/backend/veluryn-backend
ENV PORT=3001
ENV DIST_DIR=/app/dist
EXPOSE 3001
CMD ["./veluryn-backend"]

# node-ci-demo

A minimal Node.js + Express API with Jest tests, Docker, docker-compose, and a Jenkins CI/CD pipeline.

## Run locally

```bash
npm ci
npm start
# open http://localhost:3000/health
```

## Docker (local)

```bash
docker build -t node-ci-demo:dev .
docker run --rm -p 3000:3000 node-ci-demo:dev
```

## docker-compose (dev)

```bash
docker compose up --build
```

## Endpoints

- `GET /health` → `{ status: 'ok' }`
- `GET /api/orders` → list in-memory orders
- `POST /api/orders` → create `{ item, quantity }`
- `GET /api/orders/:id` → get one

## Jenkins pipeline

Stages: Checkout → Build → Test → Code Quality → Security → Push Image → Deploy (Staging) → Release → Monitoring

- Configure GHCR credentials in Jenkins as `ghcr-creds` OR change registry to Docker Hub.
- Configure SonarQube server in Jenkins global config as `SonarQube` or adjust in `Jenkinsfile`.

## Staging compose

`docker-compose.staging.yml` expects an image tag env `TAG` (default `latest`) and maps container port 3000 to host 8080.

```bash
TAG=latest docker compose -f docker-compose.staging.yml up -d
curl http://localhost:8080/health
```

## Notes

- This demo uses an in-memory store for simplicity.
- Add real DB (MongoDB/Postgres) and infra-as-code for production.

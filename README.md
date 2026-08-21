# Drone Delights

A drone-based food delivery concept — [drone-delights.portfolio.konradsystems.se](https://drone-delights.portfolio.konradsystems.se)

Menu, cart, checkout and order tracking, in English and Swedish. Built from an
empty folder to something a stranger can use without being told how.

## Stack

React 19 · Vite · SCSS · React Router · i18next · json-server

## Structure

The interface is a single-page application; the data lives behind a small REST
API. The frontend is built with its API path baked in and the reverse proxy
strips that prefix, so requests are same-origin — no CORS, and no hard-coded
hostname to change between environments.

```
src/        application
db.json     seed data (products, orders, users)
```

## Running locally

```bash
npm install
npm run dev      # application
npm run server   # API on :3001
```

## Deployment

Two containers on one isolated network: the built site served by nginx, and the
API with a persistent volume — so orders and users survive a redeploy, which
they did not on the previous host.

Push to `main` → CI lints and builds → the deploy workflow rebuilds on my
server. The API image is only rebuilt when its own Dockerfile changes, so
deployments never reset the data.

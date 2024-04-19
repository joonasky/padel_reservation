# Padel reservation application

## Application

With a simple padel reservation application you can create a Padel game event and people can register themselves to that game.

## Technology

The technology stack is:

- Next.js framework
- React and MUI for the layout
- MUI dashboard template
- Prisma for the database access
- Next.js api routes
- Jest and React Testing Library for the unit tests
- Playwright for the e2e tests
- Vercel cloud environment

Good introduction to Next.js development is for example [How to Build a Fullstack App with Next.js, Prisma, and PostgreSQL](https://vercel.com/guides/nextjs-prisma-postgres).

## Installation

### These are needed

- npm
- npx
- Docker

#### .env file

You need your .env file for local development. This file is in .gitignore file and is not put in the Git.

Copy from [.env-example](.env-example) file and you get your .env file for the local development. Change your values in the file.

The postgres.env and docker-compose.yml files are for local development and are not used in production.

### Installation

Clone the repository and go to the padel_reservation folder. First install npm libraries:

```
npm install
```

To make the prisma client work, the client needs to be generated:

```
npm run generate
```

## Development

Start the DB:

```
npm run docker:up
```

If you are running the app for the first time or you have dropped your DB, migrate:

```
npm run migrate
```

(Run this also if you change the schema)

Finally start the application:

```
npm run dev
```

The command opens your browser in the url localhost:3000.

Closing the application:

```
crtl + C
npm run docker:down
```

## Testing

### Unit tests:

```
npm run test:unit
```

Run the unit tests with the watch functionality:

```
npm run test:unit -- --watch
```

### End-to-end tests:

```
npm run test:setup
npm run test:e2e
```

After you are finished with e2e tests, run:

```
npm docker test:teardown
```

## Deployment to Vercel

The file [.github/workflows/production-deployment.yaml](.github/workflows/production-deployment.yaml) contains following jobs:

- run-unit-tests
- build-and-deploy-to-production

### Your own deployment is done with these phases:

- fork your own repo from the padel_reservation repository
- create you own Vercel account
- Retrieve your Vercel Access Token
- Install the Vercel CLI and run vercel login
- In your folder, run vercel link to create a new Vercel project
- In the generated .vercel folder, save the projectId and orgId from the project.json
- In GitHub, add VERCEL_TOKEN, VERCEL_ORG_ID, and VERCEL_PROJECT_ID as secrets
- In Vervel UI, Create a DB and connect it to your project.
- In Vervel UI, Change build command to `prisma migrate deploy && next build`

<p align="center"><a href="https://imgur.com/A1URjPL"><img alt="Typescript API Starter" src="https://i.imgur.com/A1URjPL.png"></a></p>
<p align="center">
  <a href="https://travis-ci.org/cham11ng/typescript-api-starter">
    <img src="https://github.com/cham11ng/typescript-api-starter/workflows/Starter%20CI/badge.svg?branch=dev" alt="Build Status">
  </a>
</p>

Starter for Node.js Express API in Typescript.

## Requirements

- [Node.js](https://yarnpkg.com/en/docs/install)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)
- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

Clone the repository, install the dependencies.

```bash
$ git clone git@github.com:cham11ng/typescript-api-starter.git <application-name>

$ cd <application-name>

$ cp .env.example .env # Update database credentials

$ yarn migrate
```

Load fake data in database.

```bash
$ yarn load:fake <FactoryName> <Number>
```

<p align="center">
  <a href="https://imgur.com/gallery/d2M09Qj"><img src="https://i.imgur.com/d2M09Qj.gif" /></a>
</p>

Start the application.

```bash
$ yarn build

$ yarn start # For production

$ yarn start:dev # For development
```

<p align="center">
  <a href="https://imgur.com/gallery/4rhTo"><img src="https://i.imgur.com/GpcDbLB.gif" /></a>
</p>

**Using Docker**

Make a copy of `.env.docker` and save as `.env`.

```bash
$ cp .env.docker .env
```

Install dependencies and run the application locally.

```bash
$ docker-compose up -d postgres

$ docker-compose up -d api

$ docker-compose exec api sh yarn migrate # Make sure server is started checking logs before running this command
```

View logs of the container.

```bash
$ docker-compose logs -f
```

To stop the services.

```bash
$ docker-compose stop api postgres
```

## Generating Migrations and Seeds

To create migration use `make:migration` and seed use `make:seeder`:

```bash
$ yarn make:migration create_{table_name}_table

$ yarn make:seeder {table_name}_table_seeder
```

Example,

```bash
$ yarn make:migration create_posts_table

$ yarn make:seeder post_table_seeder
```

Modify migration and seeder file as per the requirement. Then finally:

```bash
$ yarn migrate # to migrate

$ yarn seed # to seed
```

## Contributing

Feel free to send pull requests.

## License

typescript-api-starter is under [MIT License](LICENSE).

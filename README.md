<p align="center"><a href="https://imgur.com/A1URjPL"><img alt="Typescript API Starter" src="https://i.imgur.com/A1URjPL.png"></a></p>
<p align="center">
  <a href="https://github.com/cham11ng/typescript-api-starter/actions/workflows/ci.yml">
    <img src="https://github.com/cham11ng/typescript-api-starter/actions/workflows/ci.yml/badge.svg" alt="Build Status">
  </a>
</p>

Starter for Node.js Express API in Typescript with jsonwebtoken, joi, Knex, Objection.js and many other popular tools.

## Requirements

- [Node.js](https://yarnpkg.com/en/docs/install)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)
- [Docker](https://docs.docker.com/install/)

## Getting Started

Clone the repository, install the dependencies.

```bash
# Clone repository
$ git clone git@github.com:cham11ng/typescript-api-starter.git <application-name>

$ cd <application-name>

# Update database credentials
$ cp .env.example .env

$ yarn migrate
```

```bash
# Load fake data in database.
$ yarn load:fake <FactoryName> <Number>
```

<p align="center">
  <a href="https://imgur.com/gallery/d2M09Qj"><img src="https://i.imgur.com/d2M09Qj.gif" /></a>
</p>

Start the application.

```bash
# For production
$ yarn build

# For development
$ yarn dev
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
$ docker compose up -d postgres

$ docker compose up -d api

$ docker compose exec api sh yarn migrate # Make sure server is started checking logs before running this command
```

View logs of the container.

```bash
$ docker compose logs -f
```

To stop the services.

```bash
$ docker compose stop api postgres
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

## Setting up REST Client

Create a file or add following lines in `.vscode` > `settings.json` and switch an environment `Cmd/Ctrl + Shift + P` > `REST Client: Switch Environment`. Then, you can request APIs from `api.rest` file.

```json
{
  "rest-client.environmentVariables": {
    "$shared": {
      "refreshToken": "foo",
      "accessToken": "bar",
      "email": "sgr.raee@gmail.com",
      "password": "secret" 
    },
    "local": {
      "host": "localhost",
      "refreshToken": "{{$shared refreshToken}}",
      "accessToken": "{{$shared accessToken}}",
      "email": "{{$shared email}}",
      "password": "{{$shared password}}"
    }
  }
}
```

## Contributing

Feel free to send pull requests.

## License

typescript-api-starter is under [MIT License](LICENSE).

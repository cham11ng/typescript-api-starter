<p align="center"><a href="https://imgur.com/A1URjPL"><img alt="Typescript API Starter" src="https://i.imgur.com/A1URjPL.png"></a></p>
<p align="center">
  <a href="https://travis-ci.org/cham11ng/typescript-api-starter">
    <img src="https://travis-ci.org/cham11ng/typescript-api-starter.svg?branch=master" alt="Build Status">
  </a>
</p>

Starter for Node.js express API with Typescript.

## Requirements
* [Node.js](https://yarnpkg.com/en/docs/install) - 8.9.4 or above
* [Yarn](https://yarnpkg.com/en/docs/install) - 1.3.2 or above
* [NPM](https://docs.npmjs.com/getting-started/installing-node) - 5.6.0 or above

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

## License

typescript-api-starter is under [MIT License](LICENSE).

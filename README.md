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
$ git clone git@github.com:cham11ng/typescript-api-starter.git

$ cd typescript-api-starter

$ yarn
```

Start the application.
```bash
$ yarn start:dev (For development)

$ yarn start (For production)
```

<p align="center">
  <a href="https://imgur.com/gallery/4rhTo"><img src="https://i.imgur.com/GpcDbLB.gif" /></a>
</p>

## Generationg Migrations and Seeds
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

## License

typescript-api-starter is under [MIT License](LICENSE).

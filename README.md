# app name
Bootstrapped graphql, express, node, typeorm, redis, postgres server

![continuous integration](https://github.com/tina-coding/bootstrap-graphql-server-pckg/workflows/CI/badge.svg?branch=main)

### Install Dependencies

Add the project dependencies by yarning in the root of the app:

```bash
yarn
```

### Updating Configuration

Add the name of your database on line 23, column 16 (in VS Code use `cmd + p` type `:` followed by `23,16`).

### Migrations

If you prefer to run your migratios manually, go to line 24 column 18 to turn `synchronize: false` off. You will need to add a `migrations` attribute to the connection config options and poin that to a directory with migrations. You will also want set a constant equal to the connection await and use that constant to run the migrations.

To do so, the current code will change from this

```javascript
// Sets up db connection
  await createConnection({
    type: "postgres",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "database name goes here",
    synchronize: true,
    logging: true,
    entities: ["./entities/**/*.ts"]
  });
```

to this

```javascript
// Sets up db connection
  const connection = await createConnection({
    type: "postgres",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "database name goes here",
    synchronize: true,
    logging: true,
    entities: ["./entities/**/*.ts"], 
    migrations: ["./migrations/**/*.ts"] // path of your migrations, an alt here is [path.join(__dirname, "./migrations/*")]
  });
  
  connection.runMigrations();
```

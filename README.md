# app name
Bootstrapped graphql, express, node, typeorm, redis, postgres server

![continuous integration](https://github.com/tina-coding/bootstrap-graphql-server-pckg/workflows/CI/badge.svg?branch=main)

### Install Dependencies

Add the project dependencies by yarning in the root of the app:

```bash
yarn
```

### Database Configuration

Add the name of your database on line 23, column 16 (in VS Code use `cmd + p` type `:` followed by `23,16`). Then be sure to create your postgres databse.

> ℹ️ You should be able to open a terminal window and do `createdb name-of-database` to create a databse. If that doesn't work make sure postgres is installed correctly on your machine. On a Mac you can check with `which postgres` if not you can install with Homebrew `brew install postgresql`

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
    database: "name-of-database",
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
    database: "name-of-database",
    synchronize: true,
    logging: true,
    entities: ["./entities/**/*.ts"], 
    migrations: ["./migrations/**/*.ts"] // path of your migrations, an alt here is [path.join(__dirname, "./migrations/*")]
  });
  
  connection.runMigrations();
```

### Running the Server

Running the server takes three steps: watch the typescript files for changes and compile them to js; run the redis server; and, run the dev server using nodemon to watch and reload on changes. Open a terminal window and make sure you are in the root of the project and do the following either in tmux panes, iTerm2 panes, tabs, or separate windows:

1. Compile TS: `yarn watch`
2. Start Redis Server: `redis-server`
3. Start Development Server: `yarn dev`

> ℹ️ If you do not have redis and you are on a Mac you can install via Homebrew with `brew install redis`

module.exports = {
  type: "postgres",
  host: process.env.host,
  port: process.env.port,
  username: process.env.username,
  password: process.env.password,
  database: process.env.database,
  synchronize: false,
  entities: ["entities/*.js"],
  migrations: ["migrations/*.js"],
  cli: {
    migrationsDir: "migrations",
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

import type { Knex } from "knex";
import dotenv from "dotenv";
require("tsconfig-paths/register");

dotenv.config();

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD?.toString(),
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT as string),
    },
  },
};

module.exports = config;

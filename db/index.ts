import pg from "pg";
import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT as string),
};

const pool = new pg.Pool(dbConfig);
const knexInstance = knex({
  client: "pg",
  connection: dbConfig,
});

const getClient = async (): Promise<pg.PoolClient> => {
  return pool.connect();
};

const query = async (text: string, params?: any[]): Promise<pg.QueryResult> => {
  return pool.query(text, params);
};

const TABLES = {
  MESSAGES: "messages",
};

export { getClient, query, knexInstance as queryBuilder, TABLES };

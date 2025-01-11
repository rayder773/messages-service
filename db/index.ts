import pg from "pg";
import knex from "knex";

const dbConfig = {
  host: "localhost",
  user: "postgres",
  password: "password",
  database: "postgres",
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

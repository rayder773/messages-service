import pg from "pg";

const pool = new pg.Pool();

const getClient = async (): Promise<pg.PoolClient> => {
  return pool.connect();
};

const query = async (text: string, params?: any[]): Promise<pg.QueryResult> => {
  return pool.query(text, params);
};

export { getClient, query };

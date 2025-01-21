import { Knex } from "knex";

const getAllTables = (db: Knex) => {
  return db
    .raw("SELECT table_name FROM information_schema.tables WHERE table_schema = ?", ["public"])
    .then((result) => {
      return result?.rows;
    })
    .catch((err) => {
      console.error(err);
    });
};

export default getAllTables;

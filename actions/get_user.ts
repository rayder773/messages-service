import { TABLES } from "@/db";
import { Knex } from "knex";

const getUserByEmailAndPass = async (email: string, password: string, queryBuilder: Knex) => {
  return queryBuilder.select().from(TABLES.users).where({ email, password }).first();
};

export { getUserByEmailAndPass };

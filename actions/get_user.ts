import { TABLES } from "@/db";
import { Knex } from "knex";

const getUserByEmail = (email: string, queryBuilder: Knex) => {
  return queryBuilder.select().from(TABLES.users).where({ email }).first();
};

export default getUserByEmail;

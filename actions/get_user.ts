import { TABLES } from "@/db";
import { User } from "@/types";
import { Knex } from "knex";

const getUserByEmailAndPass = async (email: string, password: string, queryBuilder: Knex) => {
  return queryBuilder.select().from(TABLES.users).where({ email, password }).first();
};

const getUserByEmail = (email: string, queryBuilder: Knex): Promise<User> => {
  return queryBuilder.select().from(TABLES.users).where({ email }).first();
};

export { getUserByEmailAndPass, getUserByEmail };

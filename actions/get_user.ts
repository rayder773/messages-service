import { TABLES } from "@/db";
import { User } from "@/types";
import { Knex } from "knex";

const getUserByEmail = (email: string, queryBuilder: Knex): Promise<User> => {
  return queryBuilder.select().from(TABLES.users).where({ email }).first();
};

export { getUserByEmail };

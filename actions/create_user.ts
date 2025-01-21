import { TABLES } from "@/db";
import { User } from "@/types";
import { Knex } from "knex";

const createUser = async (user: Omit<User, "id">, queryBuilder: Knex) => {
  const result = await queryBuilder.insert(user).into(TABLES.users).returning(["id", "email"]);

  return result[0] || null;
};

export default createUser;

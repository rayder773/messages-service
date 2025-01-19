import { TABLES } from "@/db";
import { Knex } from "knex";

type LoginData = {
  email: string;
  password: string;
};

const loginUser = (loginData: LoginData, queryBuilder: Knex) => {
  return queryBuilder.select().from(TABLES.users).where(loginData).first();
};

export default loginUser;

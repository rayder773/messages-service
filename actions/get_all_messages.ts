import { TABLES } from "@/db";
import type { Knex } from "knex";

const getAllMessages = (queryBuilder: Knex) => {
  return queryBuilder.select().from(TABLES.MESSAGES);
};

export default getAllMessages;

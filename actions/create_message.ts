import { TABLES } from "@/db";
import { log } from "../logger";
import type { Knex } from "knex";

const createMessageInDb = (message: string, queryBuilder: Knex) => {
  return queryBuilder.insert(message).into(TABLES.MESSAGES);
};

const logCreateMessageSuccess = () => {
  return log(`Message created successfully`);
};

const logCreateMessageError = (error: string) => {
  return log(`Error creating message table in database: ${error}`);
};

const createMessage = (message: string, queryBuilder: Knex) => {
  return createMessageInDb(message, queryBuilder)
    .then(logCreateMessageSuccess)
    .catch(logCreateMessageError);
};

export default createMessage;

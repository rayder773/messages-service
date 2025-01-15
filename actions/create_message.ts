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

const createMessage = async (message: string, queryBuilder: Knex) => {
  let result;

  try {
    result = await createMessageInDb(message, queryBuilder);
    logCreateMessageSuccess();
  } catch (error) {
    logCreateMessageError(error as string);
    result = { hasError: true };
  }

  return result;
};

export default createMessage;

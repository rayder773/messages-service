import { queryBuilder, TABLES } from "@/db";
import { log } from "../logger";

const createMessageInDb = (data: { text: string }) => {
  return queryBuilder.insert(data).into(TABLES.MESSAGES);
};

const logCreateMessageSuccess = () => {
  return log(`Message created successfully`);
};

const logCreateMessageError = (error: string) => {
  return log(`Error creating message table in database: ${error}`);
};

const createMessage = (data: { text: string }) => {
  return createMessageInDb(data).then(logCreateMessageSuccess).catch(logCreateMessageError);
};

export default createMessage;

import { TABLES } from "../constant";
import { queryBuilder } from "../db";
import { log } from "../logger";

const createMessageInDb = (data: { text: string }) => {
  return queryBuilder.insert(data).into(TABLES.MESSAGES);
};

const logCreateMessageSuccess = () => {
  return log(`Message created successfully`);
};

const logCreateMessageError = () => {
  return log(`Error creating message table`);
};

const createMessage = (data: { text: string }) => {
  return createMessageInDb(data).then(logCreateMessageSuccess).catch(logCreateMessageError);
};

export default createMessage;

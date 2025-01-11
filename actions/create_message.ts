import { queryBuilder } from "../db";
import { log } from "../logger";

const createMessageInDb = () => {
  return queryBuilder.insert({ text: "Hello, world!" }).into("message");
};

const logCreateMessageSuccess = () => {
  return log(`Message table created`);
};

const logCreateMessageError = () => {
  return log(`Error creating message table`);
};

const createMessage = () => {
  return createMessageInDb().then(logCreateMessageSuccess).catch(logCreateMessageError);
};

export default createMessage;

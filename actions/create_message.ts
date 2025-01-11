import { query } from "../db";
import { log } from "../logger";

const createMessageInDb = () => {
  return query(
    `CREATE TABLE message (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES user(id)
    )`
  );
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

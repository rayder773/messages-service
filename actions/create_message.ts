import { MessageServiceArgs } from "../types";

const createMessageInDb = (db: any) => {
  return db.run(
    `CREATE TABLE message (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES user(id)
    )`
  );
};

const logCreateMessageSuccess = (logger: any) => {
  return logger.info("Message table created");
};

const logCreateMessageError = (logger: any) => {
  return logger.error(`Error creating message table`);
};

const sendMessageOnCreateMessageSuccess = (ws: any, message: any) => {
  return ws.send(JSON.stringify(message));
};

const createMessage = ({ db, logger, ws }: MessageServiceArgs) => {
  return () =>
    createMessageInDb(db)
      .then(() => logCreateMessageSuccess(logger))
      .then(() =>
        sendMessageOnCreateMessageSuccess(ws, {
          type: "create_message_success",
        })
      )
      .catch(() => logCreateMessageError(logger));
};

export default createMessage;

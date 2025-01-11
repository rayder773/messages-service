type MessageServiceArgs = {
  db: any;
  logger: any;
  ws: any;
};

type MessageServiceAPI = {
  createMessage: () => Promise<void>;
};

export { MessageServiceAPI, MessageServiceArgs };

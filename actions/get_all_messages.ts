import { queryBuilder, TABLES } from "../db";

const getAllMessages = () => {
  return queryBuilder.select().from(TABLES.MESSAGES);
};

export default getAllMessages;

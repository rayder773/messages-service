import { newDb } from "pg-mem";
import { Knex as KnexType } from "knex";
import getAllMessages from "./get_all_messages";
import { queryBuilder, TABLES } from "../db";

jest.mock("../db", () => {
  const mem = newDb();
  const actual = jest.requireActual("../db");

  const knex: KnexType = mem.adapters.createKnex();

  return {
    ...actual,
    queryBuilder: knex,
  };
});

beforeAll(async () => {
  await queryBuilder.migrate.latest();
});

afterAll(async () => {
  await queryBuilder.migrate.rollback();
  await queryBuilder.destroy();
});

describe("getAllMessages", () => {
  it("should return all messages", async () => {
    const messageText = "Hello, world!";
    await queryBuilder(TABLES.MESSAGES).insert({ text: messageText });

    const messages = await getAllMessages();

    expect(messages).toEqual([{ id: 1, text: messageText }]);
  });
});

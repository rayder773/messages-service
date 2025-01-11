import { newDb } from "pg-mem";
import { Knex as KnexType } from "knex";
import createMessage from "./create_message";
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
  await queryBuilder.schema.createTable(TABLES.MESSAGES, (table) => {
    table.increments("id").primary();
    table.string("text");
  });
});

describe("createMessage", () => {
  it("should create a message", async () => {
    const messageText = "Hello, world!";

    await createMessage({ text: messageText });

    const rows = await queryBuilder(TABLES.MESSAGES).select();

    expect(rows).toEqual([{ id: 1, text: messageText }]);
  });
});

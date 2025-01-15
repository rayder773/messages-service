import { allHandlers, createApp, onGetMessagesHandler } from "@/server";
import { Knex } from "knex";
import { IBackup, newDb } from "pg-mem";
import { Express } from "express";
import request from "supertest";
import { END_POINTS } from "@/server";
import { TABLES } from "@/db";

let app: Express;
let backup: IBackup;
let db: Knex;

beforeAll(async () => {
  const mem = newDb();
  db = mem.adapters.createKnex();

  await db.migrate.latest();

  backup = mem.backup();

  app = createApp({
    ...allHandlers,
    onGetMessages: onGetMessagesHandler(db),
  });
});

beforeEach(() => {
  backup.restore();
});

describe("GET /messages", () => {
  it("should return empty array if no messages", async () => {
    const response = await request(app).get(END_POINTS.GET_MESSAGES);

    expect(response.status).toBe(204);
  });

  it("should return all messages", async () => {
    const messages = [{ text: "Hello" }, { text: "World" }];
    await db(TABLES.MESSAGES).insert(messages);

    const response = await request(app).get(END_POINTS.GET_MESSAGES);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      messages.map((message, index) => ({ id: index + 1, ...message }))
    );
  });
});

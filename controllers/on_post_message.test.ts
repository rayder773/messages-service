import { allHandlers, createApp, onPostMessageHanler } from "@/server";
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
    onPostMessage: onPostMessageHanler(db),
  });
});

beforeEach(() => {
  backup.restore();
});

describe("POST /messages", () => {
  it("should create a message in database", async () => {
    const message = { text: "Hello" };

    await request(app).post(END_POINTS.POST_MESSAGE).send(message);

    const messages = await db.select().from(TABLES.MESSAGES);

    expect(messages).toEqual([{ id: 1, ...message }]);
  });
});

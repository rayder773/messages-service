import { allHandlers, createApp, onPostMessageHanler } from "@/server";
import { Knex } from "knex";
import { IBackup, newDb } from "pg-mem";
import { Express } from "express";
import request from "supertest";
import { END_POINTS } from "@/server";
import { TABLES } from "@/db";
import setUpTests from "@/utils/setup_tests";

let app: Express;
let backup: IBackup;
let db: Knex;

beforeAll(async () => {
  const { db: dbInstance, backup: backupInstance } = await setUpTests();

  db = dbInstance;
  backup = backupInstance;

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

  it("should return 201 if message is created", async () => {
    const message = { text: "Hello" };

    const response = await request(app).post(END_POINTS.POST_MESSAGE).send(message);

    expect(response.status).toBe(201);
  });

  it("should return 400 if message is empty", async () => {
    const response = await request(app).post(END_POINTS.POST_MESSAGE).send();
    const messages = await db.select().from(TABLES.MESSAGES);

    expect(messages).toEqual([]);
    expect(response.status).toBe(400);
  });
});

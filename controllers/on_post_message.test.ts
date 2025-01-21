import { onPostMessageHanler } from "@/server";
import { Knex } from "knex";

import request from "supertest";
import { END_POINTS } from "@/server";
import { TABLES } from "@/db";
import setUpTests from "@/utils/setup_tests";

const { app, db } = setUpTests((db: Knex) => ({
  onPostMessage: onPostMessageHanler(db),
}));

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

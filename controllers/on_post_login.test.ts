import { Express } from "express";
import { IBackup } from "pg-mem";
import { Knex } from "knex";
import { allHandlers, createApp, onPostMessageHanler } from "@/server";
import setUpTests from "@/utils/setup_tests";
import request from "supertest";
import { END_POINTS } from "@/server";
import { MemoryStore } from "express-session";
import cookieParser from "cookie-parser";
const cookie = require("cookie");

let app: Express;
let backup: IBackup;
let db: Knex;
const store = new MemoryStore();

beforeAll(async () => {
  const { db: dbInstance, backup: backupInstance } = await setUpTests();

  db = dbInstance;
  backup = backupInstance;

  app = createApp({
    ...allHandlers,
    onPostMessage: onPostMessageHanler(db),
    store,
  });
});

beforeEach(() => {
  backup.restore();
});

describe("POST /login", () => {
  it("should return 200 if user exists", async () => {
    const user = { email: "dfsffds", password: "123" };
    const response = await request(app).post(END_POINTS.POST_LOGIN).send(user);

    // s:<session-id>.<signature>
    const cookies = response.headers["set-cookie"] as unknown as string[];
    const sessionCookie = cookies.find((cookie) => cookie.startsWith("connect.sid"));
    const cookieParsed = cookie.parse(sessionCookie);
    const sidParsed = cookieParser.signedCookie(
      cookieParsed["connect.sid"],
      "your-secret-key"
    ) as string;

    store.get(sidParsed, (err, session) => {
      console.log(session);
    });

    expect(response.status).toBe(200);
  });
});

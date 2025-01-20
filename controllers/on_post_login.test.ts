import { Express } from "express";
import { IBackup } from "pg-mem";
import { Knex } from "knex";
import { allHandlers, createApp, onPostLoginHandler } from "@/server";
import setUpTests from "@/utils/setup_tests";
import request from "supertest";
import { END_POINTS } from "@/server";
import { MemoryStore } from "express-session";
import { TABLES } from "@/db";
import getAuthCookie from "@/utils/get_auth_cookie";

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
    onPostLogin: onPostLoginHandler(db),
    store,
  });
});

beforeEach(() => {
  backup.restore();

  store.clear();
});

const correctUser = { email: "test@gmail.com", password: "123" };
const wrongUser = { email: "a@gmail.com", password: "wrong_password" };

describe("POST /login", () => {
  it("should return 200 if user exists", async () => {
    await db.insert(correctUser).into(TABLES.users);

    const response = await request(app).post(END_POINTS.POST_LOGIN).send(correctUser);

    expect(response.status).toBe(200);
  });

  it("should return 401 if user does not exist", async () => {
    const response = await request(app).post(END_POINTS.POST_LOGIN).send(wrongUser);

    expect(response.status).toBe(401);
  });

  it("should set session cookie if user exists", async () => {
    await db.insert(correctUser).into(TABLES.users);

    const response = await request(app).post(END_POINTS.POST_LOGIN).send(correctUser);

    const sidParsed = getAuthCookie({
      response,
      secret: "your-secret-key",
    });

    expect(sidParsed).toBeTruthy();

    store.get(sidParsed, (err, session) => {
      expect(session?.isAuth).toBe(true);
    });
  });

  it("should not set session cookie if user does not exist", async () => {
    const response = await request(app).post(END_POINTS.POST_LOGIN).send(wrongUser);

    expect(response.headers["set-cookie"]).toBeUndefined();
  });
});

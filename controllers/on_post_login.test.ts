import { onPostLoginHandler } from "@/server";
import request from "supertest";
import { END_POINTS } from "@/server";
import { TABLES } from "@/db";
import getAuthCookie from "@/utils/get_auth_cookie";
import setUpTests from "@/utils/setup_tests";
import { hashPassword } from "@/utils/password";

const { db, app, store } = setUpTests((db) => ({
  onPostLogin: onPostLoginHandler(db),
}));

const correctUser = { email: "test@gmail.com", password: "123" };
const wrongUser = { email: "a@gmail.com", password: "wrong_password" };

describe("POST /login", () => {
  it("should return 200 if user exists", async () => {
    await db
      .insert({
        email: correctUser.email,
        password: await hashPassword(correctUser.password),
      })
      .into(TABLES.users);

    const response = await request(app).post(END_POINTS.POST_LOGIN).send(correctUser);

    expect(response.status).toBe(200);
  });

  it("should return 401 if user does not exist", async () => {
    const response = await request(app).post(END_POINTS.POST_LOGIN).send(wrongUser);

    expect(response.status).toBe(401);
  });

  it("should set session cookie if user exists", async () => {
    await db
      .insert({
        email: correctUser.email,
        password: await hashPassword(correctUser.password),
      })
      .into(TABLES.users);

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

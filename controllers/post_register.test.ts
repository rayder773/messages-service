import { TABLES } from "@/db";
import { END_POINTS, onPostRegisterHandler } from "@/server";
import setUpTests from "@/utils/setup_tests";
import request from "supertest";

const { app, db } = setUpTests((db) => ({
  onPostRegister: onPostRegisterHandler(db),
}));

const newUser = {
  email: "user@email.com",
  password: "123",
};

describe("POST /register", () => {
  it("should return 200 if user is created", async () => {
    const response = await request(app).post(END_POINTS.POST_REGISTER).send(newUser);

    expect(response.status).toBe(200);
  });

  it("should return 400 if user already exists", async () => {
    await db.insert(newUser).into(TABLES.users);

    const response = await request(app).post(END_POINTS.POST_REGISTER).send(newUser);

    expect(response.status).toBe(400);
  });

  it("should return user data on success", async () => {
    const response = await request(app).post(END_POINTS.POST_REGISTER).send(newUser);

    expect(response.body).toHaveProperty("email", newUser.email);
  });

  it("should return 400 if invalid data sended", async () => {
    const response = await request(app).post(END_POINTS.POST_REGISTER).send();

    expect(response.status).toBe(400);
  });
});

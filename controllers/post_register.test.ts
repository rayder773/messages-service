import { END_POINTS } from "@/server";
import setUpTests from "@/utils/setup_tests";
import request from "supertest";

const { app, db } = setUpTests();

const newUser = {
  email: "user@email.com",
  password: "123",
};

describe("POST /register", () => {
  it("should return 200 if user is created", async () => {});
});

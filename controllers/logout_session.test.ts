import { END_POINTS } from "@/server";
import getAuthCookie from "@/utils/get_auth_cookie";
import setUpTests from "@/utils/setup_tests";
import request from "supertest";

const { app } = setUpTests();

describe("POST /logout", () => {
  it("should return 204", async () => {
    const response = await request(app).post(END_POINTS.POST_LOGOUT);

    expect(response.status).toBe(204);
  });

  it("should destroy the session", async () => {
    const response = await request(app).post(END_POINTS.POST_LOGOUT);

    expect(() =>
      getAuthCookie({
        response,
        secret: "your-secret-key",
      })
    ).toThrow();
  });
});

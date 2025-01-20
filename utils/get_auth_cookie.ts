import request from "supertest";
import cookieParser from "cookie-parser";
const cookie = require("cookie");

function getAuthCookie({
  cookieHeaderName = "set-cookie",
  cookieName = "connect.sid",
  secret,
  response,
}: {
  cookieHeaderName?: string;
  cookieName?: string;
  secret: string;
  response: request.Response;
}): string {
  const cookies = response.headers[cookieHeaderName];

  if (!cookies || !Array.isArray(cookies)) {
    throw new Error("No cookies found");
  }

  const sessionCookie = cookies.find((cookie: string) => cookie.startsWith(cookieName));

  if (!sessionCookie) {
    throw new Error("No session cookie found");
  }

  const cookieParsed = cookie.parse(sessionCookie);

  const sidParsed = cookieParser.signedCookie(cookieParsed[cookieName], secret);

  if (!sidParsed) {
    throw new Error("Could not parse session cookie");
  }

  return sidParsed;
}

export default getAuthCookie;

import { OpenAPIV3 } from "openapi-types";
import user from "./schemas/user";

const api: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
  },
  paths: {
    "/register": {
      summary: "Register a new user",
      post: {
        requestBody: {
          content: {
            "application/json": {
              schema: user,
            },
          },
        },
        responses: {
          200: {
            description: "User registered",
          },
        },
      },
    },
  },
};

export default api;

import { OpenAPIV3 } from "openapi-types";
import generateInterface from "./generateInterface";
import { OptionalKind, InterfaceDeclarationStructure } from "ts-morph";

const testOpenApiDocument: OpenAPIV3.Document = {
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
              schema: {
                $ref: "#/components/schemas/User",
              },
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
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          username: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
        required: ["username", "password"],
      },
    },
  },
};

const expectedResult: OptionalKind<InterfaceDeclarationStructure>[] = [
  {
    name: "User",
    isExported: true,
    properties: [
      {
        name: "username",
        type: "string",
        hasQuestionToken: false,
      },
      {
        name: "password",
        type: "string",
        hasQuestionToken: false,
      },
    ],
  },
];

describe("generateInterface", () => {
  it("should generate interface", async () => {
    const result = generateInterface(testOpenApiDocument);

    expect(result).toEqual(expectedResult);
  });
});

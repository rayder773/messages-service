import { OpenAPIV3 } from "openapi-types";

const user: OpenAPIV3.SchemaObject = {
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
};

export default user;

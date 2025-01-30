import { OpenAPIV3 } from "openapi-types";

const user: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },
  required: ["email", "password"],
};

export default user;

import express from "express";
import addOpenApiDocumentation from "./addOpenApiDocumentation";

const app = express();

addOpenApiDocumentation(app);

const DOCUMENTATION_SERVER_PORT = 4000;

app.listen(DOCUMENTATION_SERVER_PORT, () => {
  console.log(
    `Documentation server is running at http://localhost:${DOCUMENTATION_SERVER_PORT}/api-docs`
  );
});

export { DOCUMENTATION_SERVER_PORT };

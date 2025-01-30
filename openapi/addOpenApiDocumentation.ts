import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import openApiDocumentation from "./index";

const addOpenApiDocumentation = async (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
};

export default addOpenApiDocumentation;

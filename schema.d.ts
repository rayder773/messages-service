/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/register": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: {
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["User"];
          };
        };
        /** @description Bad Request */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Error"];
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/login": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: {
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["User"];
          };
        };
        /** @description Bad Request */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Error"];
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/user/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: number;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["User"];
          };
        };
        /** @description Bad Request */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Error"];
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    User: {
      /** Format: email */
      email: string;
      /** Format: password */
      password: string;
    };
    Error: {
      message?: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;

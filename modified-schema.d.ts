export interface paths {
    "/register": { parameters: { query?: never; header?: never; path?: never; cookie?: never; }; get?: never; put?: never; post: { parameters: { query?: never; header?: never; path?: never; cookie?: never; }; requestBody?: { content: { "application/json": { email: string; password: string; }; }; }; responses: { 200: { headers: { [name: string]: unknown; }; content: { "application/json": { email: string; password: string; }; }; }; 400: { headers: { [name: string]: unknown; }; content: { "application/json": { message?: string; }; }; }; }; }; delete?: never; options?: never; head?: never; patch?: never; trace?: never; };
    "/login": { parameters: { query?: never; header?: never; path?: never; cookie?: never; }; get?: never; put?: never; post: { parameters: { query?: never; header?: never; path?: never; cookie?: never; }; requestBody?: { content: { "application/json": { email: string; password: string; }; }; }; responses: { 200: { headers: { [name: string]: unknown; }; content: { "application/json": { email: string; password: string; }; }; }; 400: { headers: { [name: string]: unknown; }; content: { "application/json": { message?: string; }; }; }; }; }; delete?: never; options?: never; head?: never; patch?: never; trace?: never; };
    "/user/{id}": { parameters: { query?: never; header?: never; path?: never; cookie?: never; }; get: { parameters: { query?: never; header?: never; path: { id: number; }; cookie?: never; }; requestBody?: never; responses: { 200: { headers: { [name: string]: unknown; }; content: { "application/json": { email: string; password: string; }; }; }; 400: { headers: { [name: string]: unknown; }; content: { "application/json": { message?: string; }; }; }; }; }; put?: never; post?: never; delete?: never; options?: never; head?: never; patch?: never; trace?: never; };
}

export interface components {
    schemas: { User: { email: string; password: string; }; Error: { message?: string; }; };
    responses: Record<string, unknown>;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}

export type webhooks = Record<string, never>;
export type $defs = Record<string, never>;
export type operations = Record<string, never>;

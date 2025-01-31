import toCapitalCase from "@/utils/to_capital_case";
import { OpenAPIV3 } from "openapi-types";
import { OptionalKind, InterfaceDeclarationStructure } from "ts-morph";
import { PropertySignatureStructure } from "ts-morph";

const HTTP_METHODS = ["get", "post", "put", "delete", "options", "head", "patch", "trace"];

function findSchemaInDocumentByRef(ref: string, document: OpenAPIV3.Document) {
  const allSchemas = document.components?.schemas || {};

  const schemaName = getSchemaNameFromRef(ref);

  return allSchemas[schemaName];
}

function getSchemaNameFromRef(ref: string) {
  return ref.split("/").pop() || "";
}

function isSchemaObject(
  schemaObject: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject
): schemaObject is OpenAPIV3.SchemaObject {
  return typeof schemaObject === "object" && schemaObject !== null && "type" in schemaObject;
}

type Property = OptionalKind<PropertySignatureStructure>;

const getRequestInterfaceName = (url: string, httpMethod: string) => {
  const urlWithoutSlashAndParams = url.replace(/\/|{|}/g, "");
  return `${toCapitalCase(urlWithoutSlashAndParams)}${toCapitalCase(httpMethod)}Request`;
};

function createRequestInterfaces(
  document: OpenAPIV3.Document
): OptionalKind<InterfaceDeclarationStructure>[] {
  const paths = document.paths || {};

  return Object.entries(paths).flatMap((path) => {
    const [url, pathObject] = path;

    return Object.entries(pathObject || {})
      .filter((item) => {
        const [pathObjectField] = item;

        return HTTP_METHODS.includes(pathObjectField);
      })
      .map((httpMethod) => {
        const [httpMethodName, httpMethodObject] = httpMethod;

        const result: OptionalKind<InterfaceDeclarationStructure> = {
          name: getRequestInterfaceName(url, httpMethodName),
          isExported: true,
          properties: [],
        };

        if (
          typeof httpMethodObject === "object" &&
          httpMethodObject !== null &&
          "requestBody" in httpMethodObject &&
          httpMethodObject.requestBody &&
          "content" in httpMethodObject.requestBody
        ) {
          const body = httpMethodObject.requestBody.content["application/json"];

          if (body.schema && "$ref" in body.schema) {
            const schema = findSchemaInDocumentByRef(body.schema.$ref, document);

            if (schema) {
              result.properties?.push({
                name: "body",
                type: getSchemaNameFromRef(body.schema.$ref),
                hasQuestionToken: false,
              });
            }
          }
        }

        return result;
      });
  });
}

function createSchemasInterfaces(
  document: OpenAPIV3.Document
): OptionalKind<InterfaceDeclarationStructure>[] {
  const schemas = document.components?.schemas || {};

  return Object.entries(schemas).map((item) => {
    const [name, schemaObject] = item;

    const result: OptionalKind<InterfaceDeclarationStructure> = {
      name,
      isExported: true,
    };

    if (isSchemaObject(schemaObject)) {
      result.properties = Object.entries(schemaObject.properties || {}).map<Property>(
        (property) => {
          const [propertyName, propertyObject] = property;

          return {
            name: propertyName,
            type: isSchemaObject(propertyObject) ? propertyObject.type : undefined,
            hasQuestionToken: !schemaObject.required?.includes(propertyName),
          };
        }
      );
    }

    return result;
  });
}

function generateInterface(
  document: OpenAPIV3.Document
): OptionalKind<InterfaceDeclarationStructure>[] {
  return [...createRequestInterfaces(document), ...createSchemasInterfaces(document)];
}

export default generateInterface;

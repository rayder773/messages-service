import { OpenAPIV3 } from "openapi-types";
import { OptionalKind, InterfaceDeclarationStructure } from "ts-morph";

function isSchemaObject(
  schemaObject: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject
): schemaObject is OpenAPIV3.SchemaObject {
  return typeof schemaObject === "object" && schemaObject !== null && "type" in schemaObject;
}

function generateInterface(
  document: OpenAPIV3.Document
): OptionalKind<InterfaceDeclarationStructure>[] {
  const schemas = document.components?.schemas;
  if (!schemas) {
    throw new Error("No schemas found in OpenAPI document");
  }

  return Object.entries(schemas).map((item) => {
    const [name, schemaObject] = item;

    const result: OptionalKind<InterfaceDeclarationStructure> = {
      name,
      isExported: true,
    };

    if (isSchemaObject(schemaObject)) {
      result.properties = Object.entries(schemaObject.properties || {}).map((property) => {
        const [propertyName, propertyObject] = property;

        return {
          name: propertyName,
          type: isSchemaObject(propertyObject) ? propertyObject.type : undefined,
          hasQuestionToken: !schemaObject.required?.includes(propertyName),
        };
      });
    }

    return result;
  });
}

export default generateInterface;

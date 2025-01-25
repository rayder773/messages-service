import { Project, SourceFile } from "ts-morph";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

type SchemaJson = {
  kind: "Interface" | "TypeAlias";
  name: string;
  properties?: { name: string; type: string }[];
  type?: string;
}[];

function extractInterfacesAndTypes(node: SourceFile): SchemaJson {
  const result: SchemaJson = [];

  // Обходим интерфейсы
  node.getInterfaces().forEach((interfaceDecl) => {
    const properties = interfaceDecl.getProperties().map((prop) => ({
      name: prop.getName(),
      type: prop.getType().getText(),
    }));
    result.push({
      kind: "Interface",
      name: interfaceDecl.getName(),
      properties,
    });
  });

  // Обходим типы
  node.getTypeAliases().forEach((typeAlias) => {
    result.push({
      kind: "TypeAlias",
      name: typeAlias.getName(),
      type: typeAlias.getTypeNode()?.getText() || "unknown",
    });
  });

  return result;
}

function generateInterfacesAndTypes(schemaJson: any[], sourceFile: SourceFile) {
  schemaJson.forEach((item) => {
    if (item.kind === "Interface") {
      sourceFile.addInterface({
        name: item.name,
        properties: item.properties.map((prop: any) => ({
          name: prop.name,
          type: prop.type,
        })),
        isExported: true,
      });
    } else if (item.kind === "TypeAlias") {
      sourceFile.addTypeAlias({
        name: item.name,
        type: item.type,
        isExported: true,
      });
    }
  });
}

function changeTypesJson(schemaJson: SchemaJson): SchemaJson {
  const cp = JSON.parse(JSON.stringify(schemaJson)) as SchemaJson;

  cp.forEach((item) => {
    if (item.kind === "Interface") {
      item.properties?.forEach((prop) => {
        if (prop.name === "responses") {
          prop.type = "Record<string, unknown>";
        }
      });
    }
  });

  return cp;
}

// Основная логика
(async function main() {
  const project = new Project();

  // Загружаем исходный файл schema.d.ts
  const sourceFilePath = path.resolve(__dirname, "schema.d.ts");
  const sourceFile = project.addSourceFileAtPath(sourceFilePath);

  // Преобразуем в JSON
  const schemaJson = extractInterfacesAndTypes(sourceFile);

  const outputFilePath = path.resolve(__dirname, "modified-schema.d.ts");
  const newSourceFile = project.createSourceFile(outputFilePath, "", { overwrite: true });

  // Модифицируем JSON
  const modifiedSchemaJson = changeTypesJson(schemaJson);

  // Генерируем новый TypeScript из модифицированного JSON
  generateInterfacesAndTypes(modifiedSchemaJson, newSourceFile);

  // Сохраняем измененный файл
  await newSourceFile.save();
  console.log(`Modified file saved at: ${outputFilePath}`);
})();

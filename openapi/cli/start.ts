import generateInterface from "../generateInterface";
import openApiDocument from "@/openapi/index";
import { OptionalKind, InterfaceDeclarationStructure, Project } from "ts-morph";

const project = new Project();
const sourceFile = project.createSourceFile("types.ts", {}, { overwrite: true });

try {
  const result: OptionalKind<InterfaceDeclarationStructure>[] = generateInterface(openApiDocument);

  result.forEach((interfaceDeclaration) => {
    sourceFile.addInterface(interfaceDeclaration);
  });

  sourceFile.saveSync();
} catch (error) {
  console.error(error);
}

import { promises as fs } from 'node:fs';
import path from 'node:path';

// type DynamicObject = 'DynamicObject';
type SimpleType = 'string' | 'number' | 'boolean' | 'object' | 'undefined' | 'array';
type SchemaRepresentation = SimpleType | { [key: string]: SchemaRepresentation } | SchemaRepresentation[];


interface AliasMap {
  [key: string]: string | AliasMap;
}

async function readJsonFile(filePath: string): Promise<any> {
  const absPath = path.resolve(filePath);
  const fileContents = await fs.readFile(absPath, 'utf-8');
  return JSON.parse(fileContents);
}

function generateSchemaRepresentation(obj: any): SchemaRepresentation {
  // Handle non-object types (including arrays for initial detection)
  if (typeof obj !== 'object' || obj === null) return typeof obj as SimpleType;

  // Special handling for arrays
  if (Array.isArray(obj)) {
    // Assuming the array contains objects with similar structure
    // and the logic to verify this has been applied

    // Verify the array is not empty and contains objects
    if (obj.length > 0 && obj.every(item => typeof item === 'object')) {
      // Generate schema for the first object in the array
      const sampleSchema = generateSchemaRepresentation(obj[0]);

      // Check if all objects in the array have the same schema as the first
      const allSameSchema = obj.every(item => areSchemasIdentical(generateSchemaRepresentation(item), sampleSchema));

      if (allSameSchema) {
        // Represent the array by its uniform object schema
        return { 'ArrayOfObjects': sampleSchema };
      }
    }
    // For arrays not containing uniform objects, or different types, handle each element individually
      return obj.map(item => generateSchemaRepresentation(item)); // This now matches the expected type
  }

  // Existing handling for objects with dynamic keys and so forth...
  const schema: { [key: string]: SchemaRepresentation } = {};
  for (const key of Object.keys(obj)) {
    schema[key] = generateSchemaRepresentation(obj[key]);
  }
  return schema;
}

function areSchemasIdentical(schema1: any, schema2: any): boolean {
  if (schema1 === schema2) return true; // Handles SimpleType and DynamicObject directly
  if (typeof schema1 !== 'object' || typeof schema2 !== 'object') return false; // One of them is a SimpleType or DynamicObject, but not equal

  const keys1 = Object.keys(schema1);
  const keys2 = Object.keys(schema2);
  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!areSchemasIdentical(schema1[key], schema2[key])) return false;
  }

  return true;
}

function consolidateSchemas(data: any): [any, AliasMap] {
  const schemas: SchemaRepresentation[] = [];
  const aliases: AliasMap = {};

  for (const id of Object.keys(data)) {
    const schema = generateSchemaRepresentation(data[id]);
    let aliasFound = false;

    for (const [index, existingSchema] of schemas.entries()) {
      if (areSchemasIdentical(schema, existingSchema)) {
        aliases[id] = `Alias${index + 1}`;
        aliasFound = true;
        break;
      }
    }

    if (!aliasFound) {
      schemas.push(schema);
      aliases[id] = `Alias${schemas.length}`;
    }
  }

  return [schemas, aliases];
}

  const filePath = '/home/luxcium/Téléchargements/730a31db355493e70b4f8c235275dd47cb35cce6a081d84eed4e5b174e7b27e3-2024-03-29-05-06-07/conversations.json'; // Update this path

async function main() {
  const data = await readJsonFile(filePath);
  const [schemas, aliases] = consolidateSchemas(data);

  console.log('Aliases:', JSON.stringify(aliases, null, 2));
  // console.log('Consolidated Schemas:', JSON.stringify(schemas, null, 2));
  // ('Consolidated Schemas:', JSON.stringify(schemas, null, 2));
  console.dir(schemas, { depth: null })
}

main().catch(console.error);

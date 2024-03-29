import fs from 'fs';

type SchemaRepresentation = string | { [key: string]: SchemaRepresentation } | 'DynamicObject' | 'ArrayOfSimilarObjects';

function readJsonFile(filePath: string): any {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function generateSchemaSignature(obj: any): string {
  if (typeof obj !== 'object' || obj === null) return typeof obj;
  const keys = Object.keys(obj).sort();
  return keys.map(key => `${key}:${generateSchemaSignature(obj[key])}`).join(',');
}

function analyzeArray(items: any[]): SchemaRepresentation {
  if (items.length === 0) return 'empty array';
  const firstItemSignature = generateSchemaSignature(items[0]);
  const allMatch = items.every(item => generateSchemaSignature(item) === firstItemSignature);
  return allMatch ? { 'ArrayOfSimilarObjects': generateSchemaRepresentation(items[0]) } : 'array of different objects';
}

// function generateSchemaRepresentation(obj: any): SchemaRepresentation {
//   if (Array.isArray(obj)) return analyzeArray(obj);
//   if (typeof obj !== 'object' || obj === null) return typeof obj;

//   const schema: { [key: string]: SchemaRepresentation } = {};
//   const keys = Object.keys(obj);

//   if (keys.length > 0) {
//     const typeSet = new Set(keys.map(key => typeof obj[key]));
//     if (typeSet.size === 1) return `All keys are of type: ${Array.from(typeSet)[0]}`;
//   }

//   for (const key of keys) {
//     schema[key] = generateSchemaRepresentation(obj[key]);
//   }

//   return schema;
// }

function consolidateJsonSchema(filePath: string) {
  const data = readJsonFile(filePath);
  const consolidatedSchema = generateSchemaRepresentation(data);
  console.log(JSON.stringify(consolidatedSchema, null, 2));
}
// Helper function to generate a schema representation of an object
function generateSchemaRepresentation(obj: any): SchemaRepresentation {
    if (typeof obj !== 'object' || obj === null) return typeof obj;
    if (Array.isArray(obj)) {
        // Process arrays differently
        return processArray(obj);
    }

    const schema: { [key: string]: SchemaRepresentation } = {};
    for (const key of Object.keys(obj)) {
        schema[key] = generateSchemaRepresentation(obj[key]);
    }
    return schema;
}

// Function to analyze and process arrays within the JSON structure
function processArray(arr: any[]): SchemaRepresentation {
    if (arr.length === 0) return 'EmptyArray';

    // Check if all elements in the array are objects and have the same structure
    const allObjects = arr.every(item => typeof item === 'object' && !Array.isArray(item));
    if (allObjects) {
        const firstItemSchema = generateSchemaRepresentation(arr[0]);
        const allSameSchema = arr.every(item => JSON.stringify(generateSchemaRepresentation(item)) === JSON.stringify(firstItemSchema));

        if (allSameSchema) {
            return { 'UniformObjectArray': firstItemSchema };
        }
    }

    // Fallback for mixed types or differing structures, handling each element individually
    return arr.map(item => generateSchemaRepresentation(item));
}

// Example Usage
  const filePath = '/home/luxcium/Téléchargements/730a31db355493e70b4f8c235275dd47cb35cce6a081d84eed4e5b174e7b27e3-2024-03-29-05-06-07/conversations.json'; // Update this path
// const filePath = 'path/to/your/json/file.json';
consolidateJsonSchema(filePath);

import { readFileSync } from 'fs';
import { join } from 'path';

// Chemin vers le fichier à lire
const filePath = join(__dirname, 'example.txt');

try {
  // Lecture du fichier de manière synchrone
  const fileContent = readFileSync(filePath, 'utf8');

  // Affichage du contenu du fichier
  console.log('Contenu du fichier:', fileContent);
} catch (error:any) {
  // Gestion des erreurs potentielles
  console.error('Erreur lors de la lecture du fichier:', error.message);
}

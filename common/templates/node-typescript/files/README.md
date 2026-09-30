# __PACKAGE_NAME__

Projet créé dans `__PROJECT_FOLDER__` à partir du socle Node/TypeScript.

Rush pilote l'installation et l'ordre de compilation des dépendances locales.
Les commandes du `package.json` appellent les fichiers dans `scripts/`.
`test` vérifie le résultat déjà compilé; il ne reconstruit pas les dépendances.

Les versions des outils de base sont résolues depuis les déclarations existantes
et les politiques Rush lors de la création. Le résultat est enregistré dans
`config/project-init.json`.

Le socle fournit `init`, `clean`, `build`, `typecheck`, `test`, ainsi que les
commandes `build-all` et `test-all` attendues par les commandes Rush du dépôt.
Il n'exécute aucune compilation dans un hook d'installation.

Les étapes encore indéfinies (`lint`, `docs`, `release`, hooks, etc.) existent
dans le package.json et scripts/. Elles signalent explicitement un no-op.
Le registre config/lifecycle.json distingue les étapes implémentées des étapes
pending. Mettre à jour le fichier et son statut ensemble lors de l'implémentation.

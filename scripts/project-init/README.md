# Création et activation de sous-projets Rush

Le parent est sélectionné en premier. Le générateur charge ensuite le modèle,
résout les versions avec les déclarations existantes et les politiques Rush,
copie le socle complet, inscrit le package et active son cycle de vie.

Les modèles sont dans `common/templates/`. Le premier modèle fourni est
`node-typescript`. Il convient à un socle Node/TypeScript; un projet Next.js,
Python, Nest ou un autre framework doit disposer de son propre modèle adapté.
Le générateur n'invente pas de règles pour un modèle absent.

Toutes les étapes réservées ont un fichier exécutable. Les étapes non définies
sont des no-op explicites, documentés dans config/lifecycle.json; leur exécution
ne prouve pas qu'une fonction, une publication ou un déploiement est implémenté.

## Exécution par l'agent

L'agent détermine le parent, le nom et les dépendances fonctionnelles. Il appelle
le générateur, examine le plan, puis applique les changements dans une branche de
travail. Aucune explication de procédure ne remplace l'exécution déléguée.

```bash
cd /projects/monorepo-one
node scripts/project-init/create-project.mjs --parent examples --name image-analysis --depends-on @luxcium/human-size
node scripts/project-init/create-project.mjs --parent examples --name image-analysis --depends-on @luxcium/human-size --apply
```

Le chemin absolu est un exemple; l'agent utilise le chemin réel de son checkout.
`--package-name` personnalise le nom npm. `--workspace FILE` ajoute l'entrée
dans le workspace demandé, uniquement si son JSONC est valide. `--no-install`
crée les fichiers sans annoncer une installation réussie.

## Garanties et limites

- Aucun package.json créé à la racine.
- Aucun fichier existant du sous-projet n'est écrasé.
- Les commentaires de rush.json sont conservés.
- Les dépendances locales sont déclarées avec `workspace:*`.
- Les plages des outils de base viennent du dépôt, pas de versions « latest ».
- Une divergence de versions non autorisée bloque la génération.
- Les sous-modules nécessaires doivent être présents dans le checkout.
- Les sous-espaces sont hérités seulement si leur registre est activé.
- Après création : vérification du socle, Rush check, Rush update,
  Rush build --to, puis tests du package compilé.
- Les commandes utilisent le bootstrap Rush officiel, qui sélectionne la version
  inscrite dans rush.json. Le script échoue si une étape échoue.
- Une erreur d'écriture restaure les configurations. Après une erreur d'installation
  ou de compilation, les fichiers sont conservés pour diagnostiquer et reprendre.
- `common/temp/pnpm-workspace.yaml` est généré par Rush; le fichier pnpm-workspace
  à la racine n'est pas réécrit par ce générateur.

## Migration des anciennes commandes Yarn

```bash
cd /projects/monorepo-one
node scripts/project-init/migrate-yarn.mjs
node scripts/project-init/migrate-yarn.mjs --apply
```

Le filtre par mot-clé réduit la lecture aux manifests pertinents enregistrés
dans Rush. Les anciens hooks `install` qui compilaient sont retirés. Les appels
reconnus à une commande de package deviennent `rushx`. Le sélecteur Yarn est
retiré : le gestionnaire est celui sélectionné par Rush. Les commentaires,
archives, fichiers source et sous-modules ne sont pas remplacés en bloc.
Les formes ambiguës apparaissent dans `review` sans modification.

Les scripts `prepare`, Prisma et les autres hooks utiles ne sont pas supprimés
arbitrairement. Leur éventuelle dépendance à la compilation reste à analyser.

## Validation

```bash
cd /projects/monorepo-one
node --test scripts/project-init/test/*.test.mjs
```

Documentation officielle :
- https://rushjs.io/pages/developer/modifying_package_json/
- https://rushjs.io/pages/developer/selecting_subsets/
- https://rushjs.io/pages/advanced/subspaces/
- https://rushjs.io/pages/advanced/rush_files_and_folders/

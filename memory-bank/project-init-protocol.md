# Création de sous-projets — décisions actives

Décisions adoptées le 30 septembre 2026. Ce document est le point canonique
pour les agents qui créent ou adaptent un sous-projet dans ce dépôt.

## Mandat et ordre des opérations

L'utilisateur délègue l'exécution. L'agent effectue les recherches pertinentes,
prépare les fichiers, appelle les scripts et vérifie les résultats. Il ne
substitue pas un tutoriel à une tâche qu'il peut accomplir. Il demande uniquement
les informations dont l'absence change réellement le résultat.

1. Déterminer le répertoire parent à partir de l'objectif et du contexte.
2. Charger le modèle et les conventions applicables à cet emplacement.
3. Résoudre les paramètres restants, les outils et les dépendances.
4. Copier le socle complet depuis common/templates et adapter les particularités.
5. Inscrire le package dans Rush et, si demandé, dans le workspace VS Code.
6. Vérifier les versions, installer avec Rush, compiler dans l'ordre du graphe,
   puis exécuter les tests pertinents.
7. Rapporter les changements réels, les résultats et les étapes encore ouvertes.

## Script et agent

Tout ce qui peut être décidé par des règles explicites et des données disponibles
est implémenté dans un script : branches, validation, copie, déclaration des
dépendances, compatibilité des plages et exécution. L'agent choisit le sens du
projet, traite les ambiguïtés et crée les règles manquantes. Les règles réutilisables
qu'il établit sont transférées au script.

## Socle complet et états explicites

Chaque sous-projet reçoit son package.json, ses configurations et son dossier
scripts dès la création. Les commandes de cycle de vie pointent vers des fichiers
présents. Une étape prévue mais pas encore définie dispose d'une implémentation
no-op et d'une entrée pending dans config/lifecycle.json.

Un no-op est permis et demandé pour réserver une étape. Il produit un résultat
explicite « no-op / non configuré »; il ne doit pas être présenté comme une action
fonctionnelle, un test réussi, une publication ou un déploiement. Lorsqu'une étape
est implémentée, son fichier et son statut sont mis à jour ensemble.

## Rush, pnpm et dépendances

Rush sélectionne ses versions de Rush et pnpm depuis rush.json. Les projets sont
inscrits dans projects. Leurs liens sont déclarés par nom de package dans leurs
package.json, avec workspace:* pour les nouveaux liens internes. Rush build --to
construit la cible et ses dépendances dans leur ordre. Les catégories de dossiers
ne déterminent pas cet ordre.

Rush pilote l'installation et les liens; rushx appelle une commande du package.
Les appels Yarn ne sont pas remplacés globalement par pnpm : chaque occurrence
est classée comme appel de script, opération d'installation, commentaire,
archive ou commande nécessitant une adaptation. Les compilations dans les hooks
d'installation sont retirées; les autres hooks utiles sont examinés selon leur rôle.

## Langage informatif et économie de contexte

Répondre directement avec les informations déjà acquises. Distinguer une déduction,
une consultation de données déjà récupérées et un nouvel accès à GitHub.
Rechercher les mots-clés avant de lire les passages pertinents; ne pas relire
inutilement des fichiers complets. Ne pas annoncer de vérification fictive.
Pendant l'exécution, fournir des points brefs aux transitions significatives,
et ne pas laisser croire qu'une tâche terminée continue en arrière-plan.

Une absence dans GitHub signifie une absence dans la branche consultée; elle ne
prouve pas une absence sur l'ordinateur de l'utilisateur. Une exclusion Git,
une référence ancienne et un dossier local non suivi sont des situations distinctes.

## Entrées exécutables

- scripts/project-init/create-project.mjs : plan, création et activation.
- scripts/project-init/migrate-yarn.mjs : migration limitée aux formes reconnues.
- scripts/project-init/README.md : interface, garanties et limites.
- common/templates/node-typescript : premier modèle concret.

La présence de ce document dans Git ne garantit pas son chargement par tout
produit ChatGPT. AGENTS.md et CLAUDE.md le référencent pour les outils qui les lisent.

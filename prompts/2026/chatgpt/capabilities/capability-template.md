# Fiche de capacité — modèle réutilisable

## Identité
Une fiche de capacité est une unité sémantique portable décrivant une capacité indépendamment de son stockage ou de son implémentation.

## Finalité
Permettre à un humain ou à un agent de découvrir, comprendre, invoquer, vérifier et réutiliser une capacité sans dépendre de la conversation qui l’a produite.

## Noyau invariant
- `id` : identifiant stable
- `nom` : nom humain de la capacité
- `but` : résultat recherché
- `statut` : état de maturité/validation
- `dépendances` : capacités, outils ou données requises
- `preuves` : éléments établissant que la capacité fonctionne
- `validation` : tests ou critères permettant de la revérifier

## Surfaces et adaptateurs
Une même capacité peut être projetée vers Markdown, JSON, YAML, une base SQL/NoSQL, une skill ou un workflow exécutable. La représentation n’est pas la capacité elle-même.

## Dégradation
La fiche doit préciser ce qui reste possible lorsqu’une dépendance ou une surface n’est pas disponible.

## Invocation
La fiche doit fournir suffisamment d’information pour qu’un agent sache quand charger la capacité, quelles entrées sont nécessaires et quel résultat produire.

## Preuves et validation
Les affirmations de capacité doivent pouvoir être reliées à des preuves observables et à une procédure de validation reproductible.

## Principe de portabilité
La fiche est le modèle conceptuel. GitHub, Library, Drive, SQL, NoSQL et les fichiers ne sont que des mécanismes de persistance ou de projection.

---
AI-Actor: OpenAI ChatGPT
AI-Agent: steward
AI-Model: GPT-5.6-Sol
AI-Authority: repository-owner-delegated

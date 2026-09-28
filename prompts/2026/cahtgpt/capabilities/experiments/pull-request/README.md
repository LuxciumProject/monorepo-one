# Capability Registry — surface experiment

Cette entrée teste la surface Pull Request comme mécanisme de proposition, revue et intégration des fiches de capacité.

## Fiches de l’expérience
- `direct-main/capability-template.md` — écriture directe sur la branche par défaut.
- `branch/conversation-lifecycle-continuity.md` — écriture sur une branche dédiée.
- ce fichier — ajout sur la branche avant ouverture d’une Pull Request.

## Interprétation
Une Pull Request n’est pas un stockage séparé : elle référence et compare les commits d’une branche avec une branche de base. Elle constitue une surface de revue, discussion, validation et intégration.

## Critère de validation
Le test réussit si GitHub ouvre une PR de `agent/capability-registry-surface-test` vers `main` et expose les nouveaux fichiers de la branche sans les intégrer automatiquement à `main`.

---
Experiment-Surface: pull-request
AI-Actor: OpenAI ChatGPT
AI-Agent: steward
AI-Model: GPT-5.6-Sol
AI-Authority: repository-owner-delegated

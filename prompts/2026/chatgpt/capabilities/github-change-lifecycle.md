# Fiche de capacité — GitHub Change Lifecycle

## But
Permettre à un agent de proposer, tracer, valider et promouvoir proprement un changement dans un dépôt GitHub, de l’état courant jusqu’à son intégration dans la branche canonique.

## Déclenchement
Charger cette capacité lorsqu’un agent doit écrire dans un dépôt GitHub, modifier une capacité existante, proposer un ensemble cohérent de changements ou promouvoir un travail vers la branche canonique.

## Cycle nominal
1. **Observer** — lire la branche canonique et vérifier l’état courant avant toute écriture.
2. **Isoler** — créer une branche dédiée pour une unité de travail cohérente lorsque le changement nécessite revue ou plusieurs étapes.
3. **Construire** — produire un ou plusieurs commits sur cette branche avec une provenance explicite.
4. **Proposer** — ouvrir une Pull Request vers la branche canonique.
5. **Préparer** — utiliser Draft pendant le travail incomplet; passer à Ready for review avant la promotion.
6. **Valider** — vérifier le diff, les fichiers concernés, les suppressions éventuelles, les tests et l’état de fusion.
7. **Promouvoir** — fusionner la PR. Si la PR représente une seule unité logique, `Squash and merge` peut condenser les commits de travail en un commit canonique.
8. **Clore** — après intégration confirmée, la branche de travail devient jetable et peut être supprimée si la surface disponible le permet.

## Écriture directe sur la branche canonique
L’écriture directe sur `main` est techniquement possible lorsqu’elle est autorisée, mais elle contourne la surface de revue de la Pull Request. La branche dédiée + PR constitue le chemin normal pour un changement qui mérite validation, traçabilité ou regroupement.

## Sémantique des surfaces
- **Branche** : porte les commits et l’état de travail.
- **Commit** : enregistre un changement dans l’historique Git.
- **Pull Request** : compare une branche source à une branche cible et fournit une surface de revue, discussion, validation et intégration. Elle n’est pas un stockage séparé des commits.
- **Main** : état canonique après promotion.

## Provenance
Chaque changement produit par un agent devrait conserver une provenance structurée, par exemple :

```text
AI-Actor: OpenAI ChatGPT
AI-Agent: steward
AI-Model: GPT-5.6-Sol
AI-Authority: repository-owner-delegated
```

Ces champs documentent l’origine opérationnelle du changement. Ils ne remplacent pas l’identité GitHub qui authentifie réellement l’opération.

## Limites observées
- L’identité visible de l’opération GitHub peut rester celle du compte connecté même lorsque la provenance indique quel agent a produit le changement.
- Une capacité générale d’écriture GitHub n’implique pas toutes les opérations Git. Dans la surface testée, création et déplacement de branches étaient disponibles, mais pas la suppression de branche par l’agent.
- Une autorisation GitHub et la disponibilité effective d’une action dans la surface d’exécution sont deux choses distinctes.

## Dégradation
Si une étape n’est pas exposée par la surface disponible, conserver l’état Git valide, indiquer précisément l’étape restante et laisser l’opération manuelle ou une autre surface terminer le cycle. Ne pas simuler une réussite.

## Validation empirique
Cette capacité a été construite à partir d’un cycle réellement exécuté dans `LuxciumProject/monorepo-one` : écriture directe sur `main`, création d’une branche dédiée, commits sur branche, ouverture d’une PR, transition Draft → Ready for review, `Squash and merge`, puis suppression manuelle de la branche faute d’action de suppression exposée à l’agent.

## Critère de réussite
Le changement est considéré promu uniquement lorsque la branche canonique contient effectivement le résultat attendu et que l’état de la PR confirme l’intégration. Les étapes intermédiaires ne doivent pas être présentées comme une fusion réussie.

---
AI-Actor: OpenAI ChatGPT
AI-Agent: steward
AI-Model: GPT-5.6-Sol
AI-Authority: repository-owner-delegated

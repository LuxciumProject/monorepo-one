# Capabilities

Ce répertoire contient des **fiches de capacité réutilisables** pour ChatGPT et les agents qui travaillent avec ce dépôt.

Une fiche décrit une capacité comme unité sémantique indépendante de la conversation qui l’a produite et, autant que possible, indépendante de sa représentation technique. Elle doit permettre à un humain ou à un agent de comprendre quand utiliser la capacité, ce qu’elle exige, ce qu’elle produit, comment elle se dégrade et comment la valider.

## Point d’entrée pour un agent

Lorsqu’une tâche semble correspondre à une capacité connue :

1. lire ce `README.md`;
2. identifier la fiche pertinente;
3. charger cette fiche avant d’agir;
4. charger ses dépendances si elle en déclare;
5. respecter ses critères de validation et ses limites observées;
6. si une nouvelle capacité stable émerge du travail, la formaliser comme fiche distincte plutôt que de la laisser uniquement dans une conversation.

## Fiches présentes

### `capability-template.md`
Contrat conceptuel d’une fiche de capacité : noyau invariant, surfaces, invocation, dégradation, preuves, validation et portabilité.

### `conversation-lifecycle-continuity.md`
Capacité de compréhension, classification, préservation et transfert de l’état utile d’une conversation. Elle définit notamment les décisions de cycle de vie et les sorties de continuité.

### `github-change-lifecycle.md`
Capacité de changement GitHub : observer l’état canonique, travailler sur une branche, produire des commits, ouvrir et préparer une Pull Request, valider, promouvoir par fusion et clore la branche de travail. Elle consigne aussi les limites réellement observées de la surface GitHub disponible aux agents.

## Organisation

Une fiche stable vit directement dans `capabilities/`. Les expériences temporaires ne constituent pas l’organisation canonique du répertoire. Lorsqu’une expérimentation produit une capacité validée, le résultat utile est réécrit ou promu ici sous forme de fiche autonome.

## Provenance

Les changements produits par un agent devraient conserver une provenance structurée dans les commits et, lorsque pertinent, dans les artefacts eux-mêmes. La convention actuellement utilisée est documentée dans `github-change-lifecycle.md`.

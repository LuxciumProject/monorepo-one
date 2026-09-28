# Fiche appliquée — cycle de vie et continuité des conversations

## But
Maintenir la continuité utile d’un travail conversationnel sans traiter la conversation elle-même comme stockage canonique.

## Opérations fondamentales
1. **Comprendre** — reconstruire le sujet initial, le sujet courant, l’origine, la progression, le focus récent et un TL;DR.
2. **Classifier** — déterminer la valeur résiduelle de la conversation et son devenir.
3. **Préserver** — extraire les décisions, contraintes, artefacts, preuves et état nécessaires.
4. **Transférer** — produire un état exploitable par une nouvelle conversation, un agent ou une autre surface.

## Décisions de cycle de vie
- `DELETE`
- `EXTRACT → DELETE`
- `MIGRATE → DELETE`
- `KEEP`
- `KEEP + COMPACT`

## Sorties de continuité
- `KEEP THIS`
- `NEW THREAD SEED`
- `CANONICAL CHECKPOINT`
- `RESUME`

## Dépendances
- accès suffisant au contexte source
- capacité à distinguer faits, décisions, hypothèses et travail restant
- surface de persistance lorsqu’un état doit survivre à la conversation

## Dégradation
Si le contexte complet n’est pas disponible, produire un état explicitement partiel et identifier ce qui doit être récupéré plutôt que d’inventer les éléments manquants.

## Validation
La capacité est valide si un autre agent ou une nouvelle conversation peut reprendre le travail à partir de la sortie sans reconstruire inutilement l’historique et sans perdre les décisions ou contraintes actives.

---
Experiment-Surface: branch
AI-Actor: OpenAI ChatGPT
AI-Agent: steward
AI-Model: GPT-5.6-Sol
AI-Authority: repository-owner-delegated

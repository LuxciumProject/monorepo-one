Type

Template – Conversion d’instructions en fichier .prompt.md

⸻

Contexte & Audience

Contexte : Dans VS Code avec GitHub Copilot Chat, on souhaite que ChatGPT prenne ses propres instructions (texte produit dans la conversation) et les transforme automatiquement en un fichier .prompt.md valide, prêt à être stocké et réutilisé comme invite Copilot.

Audience : L’agent AI (ChatGPT) chargé de générer des prompts dans VS Code pour GitHub Copilot Chat, ainsi que tout développeur souhaitant comprendre le processus de conversion.

⸻

Objectifs & Résultats Attendus

Objectifs :
	•	Décrire de façon structurée comment extraire et formater les instructions de ChatGPT en un fichier .prompt.md.
	•	Indiquer au final à l’agent AI comment organiser le contenu, placer le fichier au bon endroit, et ajouter la front matter YAML nécessaire.

Résultats Attendus :
	•	Un document Markdown (le template) détaillant chaque étape de conversion.
	•	Lorsqu’on fournit des instructions textuelles (contexte, commande, paramètres dynamiques, etc.), l’agent produit un fichier .prompt.md dont la structure est conforme aux conventions VS Code + Copilot Chat, incluant la front matter (mode, tools) et le corps du prompt.

⸻

Prérequis & Variables
	•	VS Code avec extension GitHub Copilot Chat installée et activée.
	•	Paramètre chat.promptFiles activé dans les settings de VS Code :

{
  "chat.promptFiles": true,
  "chat.promptFilesLocations": {
    ".github/prompts": true
  }
}


	•	Connaissance des conventions :
	•	Dossier par défaut : .github/prompts/
	•	Nommage : {nom-du-prompt}.prompt.md en kebab-case (pas d’espaces, pas de caractères spéciaux).
	•	Front Matter YAML optionnelle : clés mode (ask | edit | agent) et tools (liste des outils autorisés).
	•	Variables dynamiques possibles :
	•	${PROMPT_NAME} : nom court du fichier (sans l’extension).
	•	${MODE} : type de chat (agent, ask ou edit).
	•	${TOOLS_LIST} : liste YAML des outils (browser, fileSystem, etc.).
	•	${PROMPT_BODY} : le contenu principal (instructions) à inclure dans le prompt.

⸻

Structure & Sections Spécifiques

La conversion d’instructions en fichier .prompt.md suit ce découpage interne :

---  
mode: ${MODE}  
tools:  
  - ${TOOLS_LIST[0]}  
  - ${TOOLS_LIST[1]}  
  # …  
---  
  
# ${PROMPT_TITLE}  
  
${PROMPT_BODY}

	1.	Front Matter YAML (facultatif mais recommandé)
	•	mode :
	•	ask : invite simple, sans accès aux outils.
	•	edit : pour les requêtes d’édition de code.
	•	agent : permet d’utiliser des outils (navigateur, système de fichiers, etc.).
	•	tools : liste YAML des noms d’outils que Copilot Chat pourra utiliser lors de l’exécution du prompt.
	•	Exemple :

mode: agent
tools:
  - browser
  - fileSystem


	•	Placement : Toujours en tout début. Délimité par --- au-dessus et en dessous. Si aucune front matter n’est nécessaire, on saute cette section.

	2.	Titre du prompt (optionnel)
	•	Recommander d’insérer un titre en niveau 1 (# ) décrivant brièvement l’objectif du prompt.
	•	Ex :

# Génération d’interface TypeScript


	3.	Corps du prompt
	•	Texte Markdown contenant les instructions complètes (contexte, détails techniques, liens vers d’autres .prompt.md ou .instructions.md).
	•	S’assurer que tout lien interne à un autre prompt utilise la syntaxe [Texte](autre-prompt.prompt.md), et que l’autocomplétion de chemin fonctionne correctement.
	•	Exemple :

Génère une interface TypeScript pour le schéma d’utilisateur suivant :  
[Database Schema](database_users.prompt.md)

- Le champ `name` est de type `string`.  
- Le champ `email` est unique (type `string`).  
- Ajouter un champ `dateExpiration` (type `Date`).  


	4.	Placement du fichier
	•	Défaut : .github/prompts/${PROMPT_NAME}.prompt.md à la racine du workspace.
	•	Emplacements supplémentaires : pris en compte uniquement si renseignés dans chat.promptFilesLocations (par ex. .vscode/my-prompts/).
	•	User prompt files : peuvent être placés dans le dossier utilisateur de VS Code (ex. ~/Library/Application Support/Code/User/prompts/ sur macOS, ou %APPDATA%/Code/User/prompts/ sur Windows). Cela permet de synchroniser via Settings Sync.
	5.	Nom du fichier
	•	Toujours en kebab-case (ex. generate-interface.prompt.md, database_users.prompt.md devient database-users.prompt.md si on suit strictement).
	•	N’utiliser ni espaces ni majuscules dans le nom du fichier.
	•	Le suffixe .prompt.md est requis.
	6.	Passage de paramètres dynamiques
	•	Si le prompt accepte des variables, les documenter dans la section Corps.
	•	Utilisation en chat : /nom-du-prompt:param1=valeur1,param2=valeur2.
	•	Le template doit inclure un exemple d’appel pour que l’agent sache générer la syntaxe correcte.
	7.	Références croisées et hiérarchie
	•	Un .prompt.md peut référencer un autre .prompt.md ou un fichier .instructions.md.
	•	Utiliser une syntaxe Markdown standard :

Référez-vous au schéma de la base de données ici : [Database Schema](database_users.prompt.md)


	•	L’agent doit s’assurer que ces liens pointent vers des fichiers existants et corriger tout lien brisé (soulignement automatique dans VS Code).

⸻

Validation & Vérification

Pour garantir la conformité d’un fichier .prompt.md généré :
	1.	Vérifier la syntaxe Markdown
	•	Ouvrir le fichier dans VS Code, s’assurer qu’aucune erreur de lint ou de parsing n’apparaît (y compris dans la front matter YAML).
	•	Contrôler l’indentation et l’absence de caractères non reconnus dans la section YAML.
	2.	Tester la détection par Copilot Chat
	•	Dans VS Code, ouvrir la vue Chat, taper / puis le nom du prompt (sans .prompt.md).
	•	Vérifier que l’auto-complétion propose bien le fichier.
	•	Exécuter le prompt pour s’assurer que le contenu est transmis correctement à Copilot Chat.
	3.	Contrôler les liens internes
	•	Tous les liens Markdown pointant vers d’autres prompts ou instructions doivent exister physiquement.
	•	Si un lien est brisé, VS Code le souligne. L’agent doit corriger le chemin ou créer le fichier manquant.
	4.	Valider le front matter
	•	Si mode: agent est spécifié, vérifier que la liste tools correspond aux noms d’outils valides (par ex. browser, fileSystem, codeEditor).
	•	Pour mode: edit, s’assurer de n’inclure que des instructions d’édition de code.
	5.	Respecter les conventions de nommage et d’emplacement
	•	Confirmer que le fichier porte l’extension .prompt.md.
	•	Vérifier qu’il se trouve dans un dossier surveillé par chat.promptFilesLocations ou dans .github/prompts/ par défaut.
	6.	Exemple de test complet
	•	Générer un fichier create-react-form.prompt.md avec la front matter :

---
mode: agent
tools:
  - fileSystem
  - codeEditor
---

Crée un composant React nommé `{formName}` avec un formulaire de base incluant :  
- Un champ `email`.  
- Un bouton de soumission.  

Exemple d’appel : `/create-react-form:formName=MyForm`


	•	Dans VS Code, exécuter /create-react-form:formName=MyForm.
	•	Vérifier que Copilot Chat génère le composant attendu.

⸻

Avec ce template en place, l’agent AI ChatGPT saura :
	•	Identifier dans ses sorties les parties à convertir (titre, instructions, outils, mode, variables).
	•	Construire un fichier .prompt.md valide, placé au bon emplacement.
	•	Ajouter correctement la front matter YAML lorsque nécessaire.
	•	Respecter les conventions de nommage et assurer la validité des liens internes.

Ainsi, à chaque nouvelle réponse contenant des instructions dédiées à un prompt, l’agent pourra générer automatiquement le fichier prêt à l’emploi dans VS Code pour GitHub Copilot Chat.
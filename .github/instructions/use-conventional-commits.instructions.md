---
applyTo: '**'
description: 'Instructions implementing the mandatory usage of conventional commit protocol with gitmoji for each commit message.'
---

# Conventional Commit Messages

See how a minor change to your commit message style can make a difference. Use this guide to maintain consistency across commits. When a user requests to perform a commit, the message must follow this format:

```
git commit -m"<type>(<optional scope>): <:gitmoji:> <description>"
```

> [!TIP]
> Take a look at git-conventional-commits (https://github.com/qoomon/git-conventional-commits); a CLI util to ensure these conventions, determine version and generate changelogs.

## Commit Message Formats

### General Commit

```
<type>(<optional scope>): <:gitmoji:> <description>

<optional body>

<optional footer>
```

### Initial Commit

```
chore: init
```

### Merge Commit

```
Merge branch '<branch name>'
```

<sup>Follows default git merge message</sup>

### Revert Commit

```
Revert "<reverted commit subject line>"
```

<sup>Follows default git revert message</sup>

### Types

- Changes relevant to the API or UI:
  - `fix` Commits that fix an API or UI bug of a preceded `feat` commit
- `refactor` Commits that rewrite or restructure code without altering API or UI behavior
  - `perf` Commits are special type of `refactor` commits that specifically improve performance
- `style` Commits that address code style (e.g., white-space, formatting, missing semi-colons) and do not affect application behavior
- `test` Commits that add missing tests or correct existing ones
- `docs` Commits that exclusively affect documentation
- `build` Commits that affect build-related components such as build tools, dependencies, project version, CI/CD pipelines, ...
- `ops` Commits that affect operational components like infrastructure, deployment, backup, recovery procedures, ...
- `chore` Miscellaneous commits e.g. modifying `.gitignore`, ...

### Scopes

The `scope` provides additional contextual information.

- The scope is an **optional** part
- Allowed scopes vary and are typically defined by the specific project
- **Do not** use issue identifiers as scopes

### Breaking Changes Indicator

<!-- markdownlint-disable MD051 -->
- A commit that introduces breaking changes **must** be indicated by an `!` before the `:` in the subject line e.g. `feat(api)!: remove status endpoint`
- Breaking changes **should** be described in the [commit footer section](#footer), if the [commit description](#description) isn't sufficiently informative
<!-- markdownlint-enable MD051 -->

### Description

The `description` contains a concise description of the change.

- The description is a **mandatory** part
- Use the imperative, present tense: "change" not "changed" nor "changes"
  - Think of `This commit will...` or `This commit should...`
- **Do not** capitalize the first letter
- **Do not** end the description with a period (`.`)
<!-- markdownlint-disable MD051 -->
- In case of breaking changes also see the section above titled "Breaking Changes Indicator".
<!-- markdownlint-enable MD051 -->

### Body

The `body` should include the motivation for the change and contrast this with previous behavior.

- The body is an **optional** part
- Use the imperative, present tense: "change" not "changed" nor "changes"

### Footer

The `footer` should contain issue references and information about **Breaking Changes**

- The footer is an **optional** part, except if the commit introduces breaking changes
- *Optionally* reference issue identifiers (e.g., `Closes #123`, `Fixes JIRA-456`)
- **Breaking Changes** **must** start with the word `BREAKING CHANGE:`

### Versioning

- **If** your next release contains commit with...
  - **API relevant changes** (`feat` or `fix`) increment the **minor version**
- **Else** increment the **patch version**

### Examples

- ```
  feat: add email notifications on new direct messages
  ```
- ```
  feat(shopping cart): add the amazing button
  ```
- ```
  feat!: remove ticket list endpoint

  refers to JIRA-1337

  BREAKING CHANGE: ticket endpoints no longer supports list all entities.
  ```
- ```
  fix(shopping-cart): prevent order an empty shopping cart
  ```
- ```
  fix(api): fix wrong calculation of request body checksum
  ```
- ```
  fix: add missing parameter to service call

  The error occurred due to <reasons>.
  ```
- ```
  perf: decrease memory footprint for determine unique visitors by using HyperLogLog
  ```
- ```
  build: update dependencies
  ```
- ```
  build(release): bump version to 1.0.0
  ```
- ```
  refactor: implement fibonacci number calculation as recursion
  ```
- ```
  style: remove empty line
  ```

---

## Git Hook Scripts to ensure commit message header format
<details>
<summary>Click to expand</summary>

### commit-msg Hook (local)
- Create a commit-msg hook using [git-conventional-commits cli](https://github.com/qoomon/git-conventional-commits?tab=readme-ov-file#automatically-validate-commit-message-convention-before-commit)

### pre-receive Hook (server side)
- create following file in your repository folder `.git/hooks/pre-receive`
  ```shell
  #!/usr/bin/env bash

  # Pre-receive hook that will block commits with messages that do not follow regex rule

  commit_msg_type_regex='feat|fix|refactor|style|test|docs|build'
  commit_msg_scope_regex='.{1,20}'
  commit_msg_description_regex='.{1,100}'
  commit_msg_regex="^(${commit_msg_type_regex})(\(${commit_msg_scope_regex}\))?: (${commit_msg_description_regex})\$"
  merge_msg_regex="^Merge branch '.+'\$"

  zero_commit="0000000000000000000000000000000000000000"

  # Do not traverse over commits that are already in the repository
  excludeExisting="--not --all"

  error=""
  while read oldrev newrev refname; do
    # branch or tag get deleted
    if [ "$newrev" = "$zero_commit" ]; then
      continue
    fi

    # Check for new branch or tag
    if [ "$oldrev" = "$zero_commit" ]; then
      rev_span=`git rev-list $newrev $excludeExisting`
    else
      rev_span=`git rev-list $oldrev..$newrev $excludeExisting`
    fi

    for commit in $rev_span; do
      commit_msg_header=$(git show -s --format=%s $commit)
      if ! [[ "$commit_msg_header" =~ (${commit_msg_regex})|(${merge_msg_regex}) ]]; then
        echo "$commit" >&2
        echo "ERROR: Invalid commit message format" >&2
        echo "$commit_msg_header" >&2
        error="true"
      fi
    done
  done

  if [ -n "$error" ]; then
    exit 1
  fi
  ```
* ⚠ make `.git/hooks/pre-receive` executable (unix: `chmod +x '.git/hooks/pre-receive'`)

</details>

-----
## References
- https://www.conventionalcommits.org/
- https://github.com/angular/angular/blob/master/CONTRIBUTING.md
- http://karma-runner.github.io/1.0/dev/git-commit-msg.html
<br>

- https://github.com/github/platform-samples/tree/master/pre-receive-hooks
- https://github.community/t5/GitHub-Enterprise-Best-Practices/Using-pre-receive-hooks-in-GitHub-Enterprise/ba-p/13863



## Conventional Commits 1.0.0-beta.4

### Summary

The Conventional Commits specification is a lightweight convention on top of commit messages.
It provides an easy set of rules for creating an explicit commit history;
which makes it easier to write automated tools on top of.
This convention dovetails with [SemVer](http://semver.org),
by describing the features, fixes, and breaking changes made in commit messages.

The commit message should be structured as follows:

---

```command
<type>[(<optional scope>)]: <:gitmoji:> <description>

[optional body]

[optional footer]
```
---

<br />
The commit contains the following structural elements, to communicate intent to the
consumers of your library:

1. **fix:** a commit of the _type_ `fix` patches a bug in your codebase (this correlates with [`PATCH`](http://semver.org/#summary) in semantic versioning).
1. **feat:** a commit of the _type_ `feat` introduces a new feature to the codebase (this correlates with [`MINOR`](http://semver.org/#summary) in semantic versioning).
1. **BREAKING CHANGE:** a commit that has the text `BREAKING CHANGE:` at the beginning of its optional body or footer section introduces a breaking API change (correlating with [`MAJOR`](http://semver.org/#summary) in semantic versioning).
A BREAKING CHANGE can be part of commits of any _type_.
1. Others: commit _types_ other than `fix:` and `feat:` are allowed, for example [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) (based on the [Angular convention](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)) recommends `chore:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, and others.

We also recommend `improvement` for commits that improve a current implementation without adding a new feature or fixing a bug.
Notice these types are not mandated by the conventional commits specification, and have no implicit effect in semantic versioning (unless they include a BREAKING CHANGE).
<br />
A scope may be provided to a commit's type, to provide additional contextual information and is contained within parenthesis, e.g., `feat(parser): add ability to parse arrays`.

### Examples

#### Commit message with description and breaking change in body
```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

```
chore!: drop Node 6 from testing matrix

BREAKING CHANGE: dropping Node 6 which hits end of life in April
```

```
docs: correct spelling of CHANGELOG
```

```
feat(lang): add polish language
```

```
fix: correct minor typos in code

see the issue for details on the typos fixed

closes issue #12
```

---

## Git Hook Scripts to ensure commit message header format

<details>
<summary>Click to expand</summary>

### commit-msg Hook (local)

Create a commit-msg hook using git-conventional-commits cli

### pre-receive Hook (server side)

Create the following file in your repository folder `.git/hooks/pre-receive`:

```
# pre-receive hook example
# ...your script here...
```

* ⚠ make `.git/hooks/pre-receive` executable (unix: `chmod +x '.git/hooks/pre-receive'`)

</details>

---

## References

- Conventional Commits: https://www.conventionalcommits.org/
- git-conventional-commits: https://github.com/qoomon/git-conventional-commits
- Angular Contributing Guide: https://github.com/angular/angular/blob/master/CONTRIBUTING.md
- Karma Runner Dev Guide: http://karma-runner.github.io/1.0/dev/git-commit-msg.html
- GitHub Platform Samples: https://github.com/github/platform-samples/tree/master/pre-receive-hooks
- GitHub Enterprise Best Practices: https://github.community/t5/GitHub-Enterprise-Best-Practices/Using-pre-receive-hooks-in-GitHub-Enterprise/ba-p/13863

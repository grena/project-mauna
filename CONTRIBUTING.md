# Contribution Guidelines

## <a name="commit"></a> Git Commit Guidelines

We have very precise rules over how our git commit messages can be formatted.  This leads to **more
readable messages** that are easy to follow when looking through the **project history**.

### Commit Message Format
The commit message has a special format that includes a **type**, a **context** and a **subject**:

```
<type>(<context>): <subject>
```

### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug or adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests
* **workflow**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

### Context
The context where the change have been done. It can be the **name of the process**, or the **classname**, the **entity**... For example : `auth`, `security`, `dashboard`, `routes`, etc...

### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

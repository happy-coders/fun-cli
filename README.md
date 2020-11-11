# Fun CLI

![Npm Version](https://img.shields.io/npm/v/@happy-coders/fun-cli)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/happy-coders/fun-cli/CI)
[![Maintainability](https://api.codeclimate.com/v1/badges/a5c970b09bad2887a60a/maintainability)](https://codeclimate.com/github/happy-coders/fun-cli/maintainability)
<a href="https://codecov.io/gh/happy-coders/fun-cli">
  <img src="https://codecov.io/gh/happy-coders/fun-cli/branch/master/graph/badge.svg" />
</a>

Open your projects in the most fun way possible! With `fun-cli` you can manage your projects adding funny aliases and a list of tasks to execute when the project open.

## Tasks

- Open project in VSCode

## Install

```sh
npm i -g @happy-coders/fun-cli
```

## Usage

### Adding projects

Run the command `fun add <project-alias> --path <project-absolute-path>`. E.g.:

```sh
fun add awesome:api --path ~/Projects/awesome/api
```

You'll be asked to choose some tasks. Choose it like your preferences and you are ready to play!

### Run the project

Call a created project running `fun with <project-alias>`. E.g.:

```sh
fun with awesome:api
```

Your chosen tasks should be executed!

### List projects

Run the command `fun list` to list your created projects.

### Deleting projects

Run the command `fun delete <project-alias>` and confirm to delete some project.

## Contributing

Improve this package adding more funny tasks! PRs are WEEELCOME!

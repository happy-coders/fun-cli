# Fun CLI

Open your projects in the most fun way possible! With `fun-cli` you can manage your projects adding alias and a list of tasks to execute when the project open. Some tasks are:

- Open you preferred text editor, IDE, etc
- Open spotify in some playlist
- The sky is the limit!

## Install

```sh
yarn add -g @smartinsf/fun-cli
```

or

```sh
npm i -g @smartinsf/fun-cli
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

## TODO

- Add questions validations
  - Validate if directory exists
  - Validate if project already exists with alias
- Add other editor options
  - [x] VSCode
  - [ ] PHPStorm

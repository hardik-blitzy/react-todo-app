# React Todo App

This is a sample react todo app done step-by-step.
This sample app was a part of react workshop.

You can check the slides [here](https://speakerdeck.com/kabirbaidhya/frontend-development-with-react).

Check the demo hosted on heroku https://simplest-react-todo-app.herokuapp.com/.


## Instructions

First clone this repository.
```bash
$ git clone https://github.com/kabirbaidhya/react-todo-app.git
```

Install dependencies. Make sure you already have [`nodejs`](https://nodejs.org/en/) & [`npm`](https://www.npmjs.com/) installed in your system.
```bash
$ npm install # or yarn
```

Run it
```bash
$ npm start # or yarn start
```

## Steps
Each step is a branch. Check out to the step you want to test.

```bash
$ git checkout <step-number>    # eg: git checkout step-1
```
* [step-0](https://github.com/kabirbaidhya/react-todo-app/commits/step-0) - Setup app using `create-react-app`.
* [step-1](https://github.com/kabirbaidhya/react-todo-app/commits/step-1) - React Hello World.
* [step-2](https://github.com/kabirbaidhya/react-todo-app/commits/step-2) - Add some JSX for the todoapp.
* [step-3](https://github.com/kabirbaidhya/react-todo-app/commits/step-3) - List todo items dynamically.
* [step-4](https://github.com/kabirbaidhya/react-todo-app/commits/step-4) - Create `TodoList` component.
* [step-5](https://github.com/kabirbaidhya/react-todo-app/commits/step-5) - Extract more components: `TodoItem`, & `Header`.
* [step-6](https://github.com/kabirbaidhya/react-todo-app/commits/step-6) - Add `Footer` component to display count.
* [step-7](https://github.com/kabirbaidhya/react-todo-app/commits/step-7) - Add `InputBox` component.
* [step-8](https://github.com/kabirbaidhya/react-todo-app/commits/step-8) - Convert to stateful components.
* [step-9](https://github.com/kabirbaidhya/react-todo-app/commits/step-9) - Add new todo item.
* [step-10](https://github.com/kabirbaidhya/react-todo-app/commits/step-10) - Add todo list filter.
* [step-11](https://github.com/kabirbaidhya/react-todo-app/commits/step-11) - Refactor code by moving logic to services.
* [step-12](https://github.com/kabirbaidhya/react-todo-app/commits/step-12) - Make check/uncheck change the todo item status to completed/pending.
* [step-13](https://github.com/kabirbaidhya/react-todo-app/commits/step-13) - Refactor code and design improvements.
* [step-14](https://github.com/kabirbaidhya/react-todo-app/commits/step-14) - Refactor and separate UI & stateful components.
* [step-15](https://github.com/kabirbaidhya/react-todo-app/commits/step-15) - Finalization of TodoApp.

## Module Documentation

Ready to explore the codebase? We've documented each part of the app to help you find your way around. Whether you're new to the project or just need a refresher, you'll find friendly guides in every folder explaining what's there and how it all fits together.

### Where to Start

If you're new here, we suggest following this reading order:

1. **Start with [Source Code](src/README.md)** — Get the big picture of how the project is organized
2. **Explore [Components](src/components/README.md)** — See how all the UI pieces fit together
3. **Check out [Services](src/services/README.md)** — Understand where the app's logic lives

Once you're comfortable with those, feel free to dive into any area that interests you!

### All Modules at a Glance

| Module | Path | Description |
|--------|------|-------------|
| [Source Code](src/README.md) | `src/` | Your starting point — see how the project is organized |
| [Services](src/services/README.md) | `src/services/` | Where the app's brain lives — handles your todo items, filters, and mode switching |
| [Components](src/components/README.md) | `src/components/` | See how all the UI pieces fit together |
| [UI Components](src/components/ui/README.md) | `src/components/ui/` | The building blocks you see on screen — buttons, lists, inputs, and more |
| [Wrappers](src/components/wrappers/README.md) | `src/components/wrappers/` | Smart components that manage state and handle what happens when you interact with the app |
| [HOC](src/components/hoc/README.md) | `src/components/hoc/` | A handy pattern for sharing behavior between components (don't worry, we explain it simply!) |
| [Utilities](src/util/README.md) | `src/util/` | Helpful little functions that make life easier |
| [Assets](src/assets/README.md) | `src/assets/` | Images, styles, and text that give the app its look and feel |

Happy exploring! If you have any questions, the [Source Code](src/README.md) README is a great place to start.

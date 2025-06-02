# ✔ Todo MVC - enContact Test

![Todo MVC](data/logo.svg)

## About

Project based on [Todo MVC](https://todomvc.com) to test front-end skills.

## Features

- [x] List, add, edit, and remove tasks
- [x] Filter tasks (all, active, and completed)
- [x] Mark/unmark all tasks
- [x] Remove completed tasks
- [x] API request for sample tasks

## Installation

-Clone the project.
-Install project dependencies (using `yarn` or `npm install`).
-Use `yarn start` or `npm start` to run the application.

## Architecture and Technical Decisions

-[Context API](https://react.dev/reference/react/createContext): With the Context API, I avoided the prop-drilling problem, which is passing data through props multiple times until it reaches the component that actually needs it. By using context, the tasks and their manipulation functions were accessible to the application's components, resulting in cleaner and more modular code.

-[CSS Modules](https://github.com/css-modules/css-modules): I chose to use CSS Modules instead of a styling library (e.g., Styled Components) due to the small size of the project, the ease of getting started, and the separation of styles by component, preventing conflicts.

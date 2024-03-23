# Van Cone

_Author: [b-rad-c](https://github.com/b-rad-c)_

### An SPA framework add on for VanJS

🔥 **Van Cone plus VanJS can create a fully featured SPA app that minifies and gzips to ~4.0 kB!** 🔥

This lightweight (~215 lines) VanJS addon adds the following features:
- Navigation powered by custom router with async loading
    - url and query param parsing
    - integrates with browser history
    - state object that integrates with browser history
    - determine current active route
    - define different backend endpoints for fetching data if different than route's front end url
- `link` component for generating links based off of named routes
    - easily add url and query params as objects
    - dynamic css styling for active route
    - pass additional context data such as a prefetched data or other configuration to route component
- TypeScript support

# Beta

🚨 Van Cone is in Beta 🚨

Van Cone is close but not quite out of beta, so use with your own caution.

# Overview

Van Cone is a minimal framework that provides routing, history and a link component that provides dynamic styling for when it is the active link.

There is only one exported function which is used to create an application object. You provide it with the DOM element that will contain the app, a list of routes, and an optional default state for `window.history.state` and it returns an object with several SPA helper methods.

Install:
```bash
npm install van-cone
```
A basic hello world app requires javascript and HTML:

Example JS:
```javascript
import createCone from 'van-cone';
import van from 'vanjs-core';
const { div, p, span, hr } = van.tags;

// define page components
const homePage = () => div('Home Page')
const userPage = (params) => div('User Page', p('userId: ' + params.userId))

// define routes
const routes = [
  { path: '/',              name: 'home', callable: async () => homePage },
  { path: '/user/:userId',  name: 'user', callable: async () => userPage }
];

// create the spa object
const routerElement = div({ id: 'layout' })
const { link } = createCone(routerElement, routes)

// main app layout
const App = () =>
  div(
    link({ name: 'home' }, 'Home'),
    span(' | '),
    link({name: 'user', params: {userId: 123}}, 'User'),
    hr(),
    routerElement
  );

document.body.replaceChildren(App());
```

Example HTML:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="Dialog Modal component with VanJS" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VanJS Hello World</title>
  </head>
  <body>
    <script src="./src/index.js" type="module"></script>
  </body>
</html>

```

# Documentation

- [relative file link](./docs/api-reference.md) - if you're viewing on github or local repo
- [absolute url](https://github.com/vanjs-org/van/blob/main/addons/van_cone/docs/API_REFERENCE.md) - if you're viewing on npmjs.org or other external mirrors

# Changelog

**0.0.7**
- minor update in type definition file

**0.0.6**
- change `isCurrentPage` to return a boolean instead of a van derive object.

**0.0.5**
- add `route` function, remove object style route definitions from constructor functions
- add typescript definitions

**0.0.4**
- change `navigate` and `pushHistory` to use route names instead of url strings, and accept optional nav state, they now return the url string.
- rename `navLink` to `link`
- update `createVanCone` return object
  - rename `router.navUrl` to `navUrl`
  - rename `router.backendUrl` to `backendUrl`
  - remove `router`
  - remvoe `handleNav`
- interal refactoring to reduce size

**0.0.3**
- rename `router.formatUrl` to `router.navUrl`
- add `router.backendUrl`, update `routes` to support backend urls
- add `pushHistory`
- add `context` to programmatic navigation functions that is passed to route element


# Support, issues, and suggestions
Open an issue or discussion either in the [github repo](https://github.com/medium-tech/van-cone)

# Contributing
Got some skills? Want to contribute? Send a pull request!

# Development
start here: 

```bash
git clone https://github.com/medium-tech/van-cone
```

In the `./examples` folder you will find `init.sh` which will install dependencies for each example. If you run the script with the link option it will use your npm's link for `van-cone` so that you can test the examples in real time as you change the code. 

```bash
init.sh --link
```

[See here](https://docs.npmjs.com/cli/v9/commands/npm-link) for docs on setting up an npm link.

Each example has a dev command `npm run dev` for launching the development server, and `npm run test` for testing. You can run `./examples/test.sh` or `npm run test` from the root pacakge to run tests in all examples.

If you want to delete `node_modules` for each example run `./examples/reset.sh`.


### Roadmap
Some things I'm interested in.
* type conversion for query parameters, currently query params and passed to the component as strings.

# The Name
Van Cone is an addon for VanJS which is short for **Van**illa **J**ava**S**cript, and makes a callout to vanilla ice cream in its logo. Van Cone provides the cone that is needed to support the ice cream. VanJS provides reactivity and UI components, Van Cone provides routing, history and navigation components, together they're everything you need for a lightweight SPA experience!

# Contributors
- [@yahia-berashish](https://github.com/yahia-berashish)
- [@efost](https://github.com/efost)

# Credit
Router based on [minimal router](https://github.com/jmhdez/minimal-router) (no longer maintained).

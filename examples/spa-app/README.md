# Van Cone SPA example

[Live preview](https://codesandbox.io/p/devbox/github/vanjs-org/van/tree/main/addons/van_cone/examples/spa-app)

A Van Cone powered demo SPA, ~4.0 kB bundled and gzipped!

## Features

- Navigation powered by custom router with async loading
- router integrates with browser history
- state object integrates with browser history
- user profile page with user id parsed from url params
- user list sorted with url query params
- navLink component for generating links based off of named routes, with url and query params and active class css styling
- handler for user id not found
- not found page

## About

The main entry point is `./index.js`, the Cone App is defined in `./context.js`, the pages and navbar can be found in `./app`.

## Instructions

**install**
```bash
npm install
```

**develop**
```bash
npm run dev
```

**build**
```bash
npm run build
```

**build visualizer**
```bash
npm run bundle-visualizer
```

**tests**
```bash
npm run test
```

## Credit
spa app based on this [example app](https://github.com/ndrean/vanjs-dialog-modal) from [@ndrean](https://github.com/ndrean)
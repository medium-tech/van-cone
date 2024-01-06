# Getting Started

### 🚨 **Van Cone is in Beta** 🚨

At this point API changes are not expected but possible, the API is almost frozen for a version 1. I'm waiting to take it out of alpha status until I have unittests written, now that I'm almost settled on the API, those are my next task. Also see contribution instructions below if you can contribute.

# Installation

```bash
npm install van-cone
```

# Overview

Van Cone is a minimal framework that provides routing, history and a link component that provides dynamic styling for when it is the active link.

There is only one exported function which is used to create an application object. You provide it with the DOM element that will contain the app, a list of routes, and an optional default state for `window.history.state` and it returns an object with several SPA helper functions.

### A basic application
Javascript:
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

HTML:
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

# Components
In [VanJS](https://vanjs.org) and Van Cone components are simply Javascript functions, there is no need for a specific object type as it adds unnecessary overhead to the frameworks. However, you'll note in the example above the `userPage` "component" is expecting a parameter `params` which is an object that includes a `userId` property parsed out of the url. The Van Cone router passes a specific set of arguments to the "component" which are standard in many SPA frameworks. Read the [Component Guide](./COMPONENT_GUIDE.md) for more information.

# What next?
* [API Documentation](./API_REFERENCE.md)
* [Component Guide](./COMPONENT_GUIDE.md)

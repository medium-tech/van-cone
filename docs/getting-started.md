# Getting Started

# Installation

```bash
npm install van-cone
```

# Overview

Van Cone is a minimal framework that provides routing, history and a link component that provides dynamic styling for when it is the active link. It is necessary to know the basics of [VanJS](https://vanjs.org) to use Van Cone, once you know VanJS, Van Cone is simple.

Van Cone has only one exported function [`createCone`](./api-reference.md#createconerouterelement-routes-defaultnavstate) which is used to create an application object. You provide it with the DOM element that will contain the app, a list of routes, and an optional default state for `window.history.state` and it returns an object with several SPA helper functions.

### TypeScript
- Supported! 🥳

# Your first Van Cone App

Init your npm project

    npm init


This example uses vite for building and previewing your application:

    npm install vite --save-dev

Install VanJS and Van Cone

    npm install vanjs-core van-cone --save

Paste the following into a file called `index.js`, or whatever the value for `main` is in your `package.json` file.

```javascript
import createCone from 'van-cone'
import van from 'vanjs-core'
const { div, p, span, hr } = van.tags

// define page components
const homePage = () => div('Home Page')
const userPage = (params) => div('User Page', p('userId: ' + params.userId))

// create the spa object
const routerElement = div({ id: 'layout' })
const { link, route } = createCone({routerElement: routerElement})

route('home', '/', homePage)
route('user', '/user/:userId', userPage)

// main app layout
const App = () =>
  div(
    link({name: 'home'}, 'Home'),
    span(' | '),
    link({name: 'user', params: {userId: 123}}, 'User'),
    hr(),
    routerElement
  )

document.body.replaceChildren(App());
```

Paste the following into a file called `index.html`. Make sure the script src tag is pointing at the JS file you just created.
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
    <script src="./index.js" type="module"></script>
  </body>
</html>

```

Update your `package.json` file to have the following commands under `scripts`.

```json
{
  // ...
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  // ...
}

```

Test your app:

    npm run dev

Now visit the address shown in your terminal and you will see your first Van Cone app!

The Javascript file defines two page components, their routes, the Van Cone app config and the page layout (ie. page content and nav bar).

The HTML file is minimal, only defining page title and which Javascript file to use.

Vite, is used for building and previewing, you can read it's [documentation here](https://vitejs.dev) and run the build process using the command we just setup:

    npm run build

If you're interested in tracking your application's size you can install the vite bundle visualizer like this:

    npm install vite-bundle-visualizer --save-dev

And update your `package.json` `scripts` section like this:

```json
{
  // ...
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "bundle-visualizer": "vite-bundle-visualizer"
  },
  // ...
}

```

Run the following to open a bundle visualizer showing what is taking up space in your build.

    npm run bundle-visualizer

# Components
In [VanJS](https://vanjs.org) and Van Cone components are simply Javascript functions, there is no need for a specific object type as it adds unnecessary overhead to the frameworks. However, you'll note in the example above the `userPage` "component" is expecting a parameter `params` which is an object that includes a `userId` property parsed out of the url. The Van Cone router passes a specific set of arguments to the "component" providing SPA functionality without the overhead of an actual component. Read the [Component Guide](./component-guide.md) for more information.


# What next?
[Routing and Navigation Guide](./routing-and-nav-guide.md)

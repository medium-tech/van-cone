# Routing and Navigation Guide

# Routing

After creating your application using the [`createCone`](./api-reference.md#createconerouterelement-routes-defaultnavstate) function you have access to the `route` function which will let you define a route.

```javascript
const layout = div({ id: 'layout' })
const { route } = createCone({routerElement: layout})

const homePage = div('Home Page')
route('home', '/', homePage)
```

Above we map the element defined by `homePage` to the url `/` which a route name of `home`. We'll learn how to navigate to the url using the [`link`](./api-reference.md#linkprops-children) component shortly.

## url parameters

We also have the ability to define url parameters with a colon:

```javascript
const homePage = () => div('Home Page')
const userPage = (params) => div('User Page', p('userId: ' + params.userId))

route('home', '/', homePage)
route('user', '/user/:userId', userPage)
```

Above we have defined the home page component and the user page component. The user page component takes advantage of the the `userId` params defined in the route using a colon through the `params` object passed to the component function.

## wild card (not found) route

Use `.*` to create a wild card route.

```javascript
route('notFound', '.*', notFound, {title: 'VanJS Example | Not Found'})
```

## Importing components

Components can also be imported asyncronously:

```javascript
// using the default export
route('page-a', '/page-a', async () => (await import('./pages')))

// using a named export
route('page-b', '/page-b', async () => (await import('./pages')).pageB)
```

## Advanced routing

```javascript
route('home', '/', homePage, {title: 'Van Cone | Home'})
route('user', '/user/:userId', userPage, {title: 'Van Cone | Data', backend: 'api/user/:userId'})
```

Above we use the options object to pass an optional `title` param which will become the title of the page when navigating to this route. We also defined a `backend` route, so that we can use [`backendUrl`](./api-reference.md#backendurlroutename-params-query) to generate a url with `userId` because we fetch out data from a different endpoint that our frontend url.

Additionally, Van Cone will also provide query string parameters automatically. Components can be elements, strings, or functions, see the [component guide](./component-guide.md) for details.

# Navigation
### component navigation 
The [`createCone`](./api-reference.md#createconerouterelement-routes-defaultnavstate) function also gives us the [link](./api-reference.md#linkprops-children) component which returns an `a` element enabling us to navigate to our defined routes.

```javascript
link({name: 'home'}, 'Home'),
```

This returns an `a` element with the url defined by the route named `home`, the innerHTML of the element is `Home`.

We can also provide URL params. If we have a route defined like this:

```javascript
route('user', '/user/:userId', userPage)
```
We can fill in the `userId` param like this:

```javascript
link({name: 'user', params: {userId: 123}}, 'User')
```
Which will navigate us to this url: `/user/123`

The link components returns an `a` tag and usable inside typical VanJS code like this:

```javascript
const App = () =>
  div(
    link({name: 'home'}, 'Home'),
    span(' | '),
    link({name: 'user', params: {userId: 123}}, 'User'),
    hr(),
    routerElement
  )
  ```


The link component also enables us to set query parameters and pass arbitrary context data to the new route, for example a search page could have a list of users and each link could pass the pre-loaded data from the search to the user route to save the page from re-fetching data. 

Additionally the link component is aware of the active routing enabling dynamic styling when the route is active for use in navigation menus.

See the [link documentation](./api-reference.md#linkprops-children) for more information. 

## Programmatic navigation

For programmitic navigation we can use the [navigate](./api-reference.md#navigateroutename-options) function.


```javascript
navigate('user', { itemId: 123 })
// "http://localhost:8000/user/123"
```

If you only want to update the history without changing the DOM state you can use [pushHistory](./api-reference.md#pushhistoryroutename-options).

```javascript
pushHistory('user', { itemId: 123 })
// "http://localhost:8000/user/123"
```

## URL generation

You can use the [`navURL`](./api-reference.md#navurlroutename-params-query) function if you only need to generate the string for a url:

```javascript
navURL('user', { itemId: 123 })
// "http://localhost:8000/user/123"
```

Or, if you have defined a different backend url for a page you can get the url as a string with the [`backendUrl`](./api-reference.md#backendurlroutename-params-query) function.

```javascript
backendUrl('user', { itemId: 123 })
// "http://localhost:8000/api/user/123"
```

# Cone App
Remeber that these functions are available after creating the cone app with [`createCone`](./api-reference.md#createconerouterelement-routes-defaultnavstate).

```javascript
import createCone from 'van-cone'

// ... other logic ...

// create the spa object
const { 
    link, 
    route, 
    navigate, 
    pushHistory, 
    navURL, 
    backendUrl 
} = createCone({routerElement: div()})

route('home', '/', homePage)
route('user', '/user/:userId', userPage)

const App = () =>
  div(
    // use link component
    link({name: 'home'}, 'Home'),
    span(' | '),
    link({name: 'user', params: {userId: 123}}, 'User'),
    hr(),
    routerElement
  )

document.body.replaceChildren(App());
```

For complex applications you can export the cone object and import these functions in other modules.

# What next?
[Component Guide](./component-guide.md)

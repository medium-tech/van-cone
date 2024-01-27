# Component guide

In an effort to keep the VanJS ecosystem minimal Van Cone does not define a component object or function like many reactive frameworks however you will see that they are not necessary with Van Cone and VanJS. When the term component is used in Van Cone documentation it refers to a value that is mapped to a specific route (see [routing guide](./routing-and-nav-guide.md)). That value can be an element (created by vanjs or `document.createElement`), a `string` that will be converted into an element or a `function` that returns a string or element.

```javascript
// define a component using a vanjs tag
const homePage = div('Home Page')

// define a component using a vanjs tag returned by a function
const functionPage = () => div('Function Page')

// define a component by document
const documentElementPage = () => {
  const div = document.createElement('div')
  div.innerHTML = 'Document Element Page'
  return div
}

// define a component by string
const fromStringPage = '<div>From String Page</div>'

// create the spa object
const { link, route } = createCone({routerElement: div()})

// create routes
route('home', '/', homePage)
route('function', '/function', functionPage)
route('doc-element', '/doc-element', documentElementPage)
route('from-string', '/from-string', fromStringPage)
```

# Components as functions

A function is needed to take full advantage of the Van Cone routing including parsing query and url params and passing dymanic context from the [`link`](./api-reference.md#linkprops-children) component.

A component function takes up to 3 arguments and returns a van js tag element. The Van Cone router will call this component function when activating the route.

## function signature

```javascript
const myComponent = (params, query, context) => div(...)
```

`params` - an object of parameters parsed out of the url, see example below for defining the router. If no parameters were defined in the router this will be an empty object.

`query` - an object of query string parameters, if none exist in the url this will be an empty object.

`context` - additional context (for example prefetched data) can be passed to the component when navigating using the [link component](./api-reference.md#linkprops-children) or the programmatic navigation function [navigate](./api-reference.md#navigateroutename-options). If none is provided this will be an empty object. Typically this would be an object but it could be any data type.

## function return

An `HTMLElement`, created with a VanJS function or `document.createElement`, or a `string` that can be converted into an `HTMLElement`.

# Examples

### the hello world

```javascript
const homePage = () => div('Home Page')
```

You obviously don't need a framework to do this, outside of the Van Cone router, components are generally not needed because they are simply a function that returns an element. They are many ways to create re-usable components, component functions in Van Cone are only useful to create a concept of a page that integrates with the router.

### url + query params example
URL params are defined in the `path` property of the route object using a colon, query params are automatically parsed and passed to the component without needing to setup anything in the route. Currently query args are returned as raw strings and the component may need to do its own type validation/conversion.

```javascript

// use url params to parse a user id
const userPage = (params) => div('User Page', p('userId: ' + params.userId))

// use query params to define a sort on a list page
const userListPage = (params, query) => div('User List', p('sort by: ' + query.sort))
```

### full component example
Here is a full example showing url parameters, query parameters and additional context.

A component can use the data as follows:
```javascript
const userPage = (params, query, context) => {

  /* our parent component, a search page may have passed in preloaded information via link, if not, we'll fetch it */
  const userInfo = (context) ? context : fetchUserInfo(params.id)

  return div(
    p("Hi I am: " + userInfo.name),
    p("some query string data: " + query.data)
  );
}

```

You can use the [`link`](./api-reference.md#linkprops-children) component to navigate to this page like this:

```javascript
const data = {'name': 'María'}
link({name: 'user', params: {id: 123}, query: {'data': 'hello'}, context: data}, 'User')
```

# What next?
[API Documentation](./api-reference.md)
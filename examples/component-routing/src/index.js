import createCone from 'van-cone'
import van from 'vanjs-core'
const { div, span, hr } = van.tags

// define page components
const homePage = div('Home Page')
const vanJSElementPage = div('Van JS Element Page')
const functionPage = () => div('Function Page')

const documentElementPage = () => {
  const div = document.createElement('div')
  div.innerHTML = 'Document Element Page'
  return div
}

const fromStringPage = '<div>From String Page</div>'

// create the spa object
const routerElement = div({ id: 'layout' })
const { link, route } = createCone({routerElement: routerElement})

route('home', '/', homePage)
route('van-element', '/van-element', vanJSElementPage)
route('doc-element', '/doc-element', documentElementPage)
route('from-string', '/from-string', fromStringPage)
route('function', '/function', functionPage)
route('default', '/default', async () => (await import('./pages')))
route('non-default-element', '/non-default-element', async () => (await import('./pages')).nonDefaultElementPage)
route('non-default-function', '/non-default-function', async () => (await import('./pages')).nonDefaultFunctionPage)
route('non-default-string', '/non-default-string', async () => (await import('./pages')).nonDefaultStringPage)

// main app layout
const App = () =>
  div(
    link({name: 'home'}, 'Home'),
    span(' | '),
    link({name: 'van-element'}, 'Van Element'),
    span(' | '),
    link({name: 'doc-element'}, 'Doc Element'),
    span(' | '),
    link({name: 'from-string'}, 'From String'),
    span(' | '),
    link({name: 'function'}, 'Function'),
    span(' | '),
    link({name: 'default'}, 'Default Export'),
    span(' | '),
    link({name: 'non-default-element'}, 'Non Default Element'),
    span(' | '),
    link({name: 'non-default-function'}, 'Non Default Function'),
    span(' | '),
    link({name: 'non-default-string'}, 'Non Default String'),
    hr(),
    routerElement
  )

document.body.replaceChildren(App());
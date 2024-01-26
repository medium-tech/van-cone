import createCone, { route } from 'van-cone'
import van from 'vanjs-core'
const { div, p, span, hr } = van.tags

// define page components
const homePage = () => div('Home Page')
const userPage = (params) => div('User Page', p('userId: ' + params.userId))

const routes = [
  route('home', '/', homePage),
  route('user', '/user/:userId', userPage)
]

// create the spa object
const routerElement = div({ id: 'layout' })
const { link } = createCone({routerElement: routerElement, routes: routes})

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
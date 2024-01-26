import "./index.css"
import createCone, { route } from "van-cone"
import van from "vanjs-core"

import homePage from "./app/pages/home"

const defaultContext = {agreement: false}
const layoutElement = van.tags.div({ id: "layout", class: "layout" })

const routes = [
    route('home', '/', homePage(), {title: 'VanJS Example | Home'}),
    route('context', '/context', async () => (await import('./app/pages/agreement')).contextPage, {title: 'VanJS Example | Context'}),
    route('agreement', '/agreement', async () => import('./app/pages/agreement'), {title: 'VanJS Example | Agreement'}),
    route('user', '/user/:userId', async () => import('./app/pages/user'), {title: 'VanJS Example | User'}),
    route('users', '/users', async () => import('./app/pages/users'), {title: 'VanJS Example | Users'}),
    route('notFound', '.*', async () => import('./app/pages/notFound'), {title: 'VanJS Example | Not Found'})
]

console.log("context.js = creating cone")
const context = createCone({routerElement: layoutElement, routes: routes, defaultNavState: defaultContext})
console.log("context.js = created cone")
export default context

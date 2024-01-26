import "./index.css"
import createCone from "van-cone"
import van from "vanjs-core"

const defaultContext = {agreement: false}
const layoutElement = van.tags.div({ id: "layout", class: "layout" })

const context = createCone({routerElement: layoutElement, defaultNavState: defaultContext})

const { route } = context
route('home', '/', async () => (await import('./app/pages/home')), {title: 'VanJS Example | Home'})
route('context', '/context', async () => (await import('./app/pages/agreement')).contextPage, {title: 'VanJS Example | Context'})
route('agreement', '/agreement', async () => import('./app/pages/agreement'), {title: 'VanJS Example | Agreement'})
route('user', '/user/:userId', async () => import('./app/pages/user'), {title: 'VanJS Example | User'})
route('users', '/users', async () => import('./app/pages/users'), {title: 'VanJS Example | Users'})
route('notFound', '.*', async () => import('./app/pages/notFound'), {title: 'VanJS Example | Not Found'})

export default context

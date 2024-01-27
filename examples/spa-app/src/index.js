import context from "./context"
import navbar from "./app/navbar"
import van from "vanjs-core"


const { routerElement } = context

const Navbar = navbar()

const App = () =>
  van.tags.div(
    Navbar(),
    routerElement
  )
  
document.body.replaceChildren(App())

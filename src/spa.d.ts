import { State } from "vanjs-core";

declare const parametersPattern: RegExp;
declare type ConeComponent = HTMLElement | (() => HTMLElement) | (() => Promise<typeof import(HTMLElement)>)
declare type RouteParams = Record<string, string>;
declare type Route = {
  name: string;
  path: string;
  callable: ConeComponent;
  title?: string;
  backend?: string;
};
declare type QueryParams = Record<string, string>;
declare type RouterContext = any;
declare type NavState = any;

declare type RouteHandlerProps = {
  params: RouteParams;
  query: QueryParams;
  context: RouterContext;
};

declare type NavigateOptions = {
  params: RouteParams;
  query: QueryParams;
  navState: NavState;
  context: RouterContext;
};

declare type RouterConfig = {
  prefix?: string;
  backendPrefix?: string;
};

declare type RouteHandler = (props: RouteHandlerProps) => void;

declare class Router {
  routes: Route[];
  prefix: string;
  backendPrefix: string;

  add(
    name: string,
    path: string,
    backend: string,
    handler: RouteHandler
  ): void;

  dispatch(url: string, context: RouterContext): void;

  _formatUrl(
    routeName: string,
    isBackend: boolean,
    params: RouteParams,
    query: QueryParams
  ): string;

  navUrl(
    routeName: string,
    params?: RouteParams,
    query?: QueryParams
  ): string;

  backendUrl(
    routeName: string,
    params?: RouteParams,
    query?: QueryParams
  ): string;
}

declare type RouteFunctionOptions = {
  backend?: string
  title?: string
};

declare function route(
  routeName: string,
  path: string,
  component: ConeComponent,
  options?: RouteFunctionOptions
): Route;

declare type coneApp = {
  routerElement: HTMLElement;
  currentPage: State<string>;
  route: route;
  navUrl: (routeName: string, params?: RouteParams, query?: QueryParams) => string;
  backendUrl: (routeName: string, params?: RouteParams, query?: QueryParams) => string;
  navState: State<NavState>;
  getNavState: () => NavState;
  setNavState: (newState: NavState) => void;
  navigate: (routeName: string, options?: NavigateOptions) => void;
  pushHistory: (routeName: string, options?: NavigateOptions) => void;
  isCurrentPage: () => boolean;
  link: (props: Record<string, any>, ...children:any[]) => HTMLAnchorElement
};

declare type ConeConfig = {
  routerElement: HTMLElement,
  defaultNavState?: NavState,
  routerConfig?: RouterConfig
};

declare function createCone(
  coneConfig: ConeConfig
): coneApp;

export default createCone;
export { route };
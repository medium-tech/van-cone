import { State } from "vanjs-core";

declare const parametersPattern: RegExp;

declare type RouteParams = Record<string, string>;
declare type Route = Record<string, any>;
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

declare type LinkProps<TParams extends Record<string, any> | void = void> =
  TParams extends void ? { name: string } : { name: string; params: TParams };
  
declare type Link = <TParams extends Record<string, any> | void = void>(
  props: LinkProps<TParams>,
  content: string
) => HTMLAnchorElement;

declare type CreateConeReturn = {
  routerElement: HTMLElement;
  currentPage: State<string>;
  navUrl: (routeName: string, params?: RouteParams, query?: QueryParams) => string;
  backendUrl: (routeName: string, params?: RouteParams, query?: QueryParams) => string;
  navState: State<NavState>;
  getNavState: () => NavState;
  setNavState: (newState: NavState) => void;
  navigate: (routeName: string, options: NavigateOptions) => void;
  pushHistory: (routeName: string, options: NavigateOptions) => void;
  isCurrentPage: () => State<boolean>;
  link: Link;
};

declare function createCone(
  routerElement: HTMLElement,
  routes: Route[],
  defaultNavState?: NavState,
  routerConfig?: RouterConfig
): CreateConeReturn;

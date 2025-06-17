import type { _Awaitable, NavigationGuardNext, RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric, RouteLocationGeneric, RouteLocationNormalizedGeneric, RouteLocationNormalizedLoadedGeneric, RouteRecordMultipleViews, RouteRecordMultipleViewsWithChildren, RouteRecordRedirect, RouteRecordSingleView, RouteRecordSingleViewWithChildren } from "vue-router";

export type DefaultNumberDetectors = ['\\d', '\\d+']

export type RemapedParam = {
  repeatable: boolean,
  optional: boolean,
  number: boolean
}

export type VueRouteParams = Record<string, number | string | number[] | string[]>

type OmitKeys = 'props' | 'children' | 'redirect' | 'beforeEnter';

/*
  We need simplify Vue Router types to prevent circulary errors
*/
type RouteRecordRedirectOptionSimplified = string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric

type NavigationGuardWithThisSimplified<T> = {
  (
    this: T, 
    to: RouteLocationNormalizedGeneric, 
    rom: RouteLocationNormalizedLoadedGeneric, 
    next: NavigationGuardNext
  ): _Awaitable<void | Error | boolean | RouteRecordRedirectOptionSimplified>;
}

type RouteRecordRedirectOptionSimplifiedUnion = 
  RouteRecordRedirectOptionSimplified | 
   // care with RouteLocationGeneric, may be it can create circular deps
  ((to: RouteLocationGeneric) => RouteRecordRedirectOptionSimplified)

export type NamedRouteRecordRaw = (
  Omit<RouteRecordSingleView, OmitKeys> & { 
    redirect?: never 
  } |

  Omit<RouteRecordSingleViewWithChildren, OmitKeys> & { 
    redirect?: RouteRecordRedirectOptionSimplifiedUnion, 
    children: NamedRouteRecordRaw[] 
  } | 

  Omit<RouteRecordMultipleViews, OmitKeys> & { 
    redirect?: never 
  } | 

  Omit<RouteRecordMultipleViewsWithChildren, OmitKeys> & { 
    redirect?: RouteRecordRedirectOptionSimplifiedUnion, 
    children: NamedRouteRecordRaw[] 
  } | 

  Omit<RouteRecordRedirect, OmitKeys> & { 
    redirect: RouteRecordRedirectOptionSimplifiedUnion
  }
) & { 
  name: string,
  beforeEnter?: NavigationGuardWithThisSimplified<undefined> | NavigationGuardWithThisSimplified<undefined>[]
  props?: boolean | Record<string,boolean> | ((to: RouteLocationNormalizedGeneric) => Record<string,boolean>)
  // care with RouteLocationNormalizedGeneric, may be it can create circular deps
};

import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric, RouteLocationGeneric, RouteLocationNormalizedGeneric, RouteRecordMultipleViews, RouteRecordMultipleViewsWithChildren, RouteRecordRedirect, RouteRecordSingleView, RouteRecordSingleViewWithChildren } from "vue-router";

export type RemapedParam = {
  repeatable: boolean,
  optional: boolean,
  number: boolean
}

export type VueRouteParams = Record<string, number | string | number[] | string[]>

type OmitKeys = 'props' | 'children' | 'redirect';

/*
  We need simplify Vue Router types to prevent circulary errors
*/
type RouteRecordRedirectOptionSimplified = string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric

export type NamedRouteRecordRaw = (
  Omit<RouteRecordSingleView, OmitKeys> & { redirect?: never } | 
  Omit<RouteRecordSingleViewWithChildren, OmitKeys> & { redirect?: never, children: NamedRouteRecordRaw[] } | 
  Omit<RouteRecordMultipleViews, OmitKeys> & { redirect?: never } | 
  Omit<RouteRecordMultipleViewsWithChildren, OmitKeys> & { redirect?: never, children: NamedRouteRecordRaw[] } | 
  Omit<RouteRecordRedirect, OmitKeys> & { 
    redirect: RouteRecordRedirectOptionSimplified | 
              ((to: RouteLocationGeneric) => RouteRecordRedirectOptionSimplified)
              // care with RouteLocationGeneric, may be it can create circular deps
  }
) & { 
  name: string,
  props?: boolean | Record<string,boolean> | ((to: RouteLocationNormalizedGeneric) => Record<string,boolean>)
  // care with RouteLocationNormalizedGeneric, may be it can create circular deps
};

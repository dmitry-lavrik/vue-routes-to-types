import { RouteRecordMultipleViews, RouteRecordMultipleViewsWithChildren, RouteRecordRedirect, RouteRecordSingleView, RouteRecordSingleViewWithChildren } from "vue-router";

export type RemapedParam = {
  repeatable: boolean,
  optional: boolean,
  number: boolean
}

type OmitKeys = 'props' | 'children' | 'redirect';

/*
  We need simplify Vue Router types to prevent circulary errors
*/
export type NamedRouteRecordRaw = (
  Omit<RouteRecordSingleView, OmitKeys> & { redirect?: never } | 
  Omit<RouteRecordSingleViewWithChildren, OmitKeys> & { redirect?: never, children: NamedRouteRecordRaw[] } | 
  Omit<RouteRecordMultipleViews, OmitKeys> & { redirect?: never } | 
  Omit<RouteRecordMultipleViewsWithChildren, OmitKeys> & { redirect?: never, children: NamedRouteRecordRaw[] } | 
  Omit<RouteRecordRedirect, OmitKeys> & { redirect: string } //todo: redirect as fn
) & { 
  name: string,
  props?: boolean | Record<string,boolean> //todo: check other vue variants of props 
};
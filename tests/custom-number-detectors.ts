import type { RouteRecordInfo } from "vue-router";
import type { GenerateRoutesMap } from "../lib/combine";
import type { NamedRouteRecordRaw } from "../lib/types";

type RightLeftEquals<T,K> = T extends K 
  ? K extends T 
    ? true 
    : false 
  : false;

{
  const component = () => {} // always fake component

  const routes = [
    {
      path: '/item/:id(\\d)',
      name: 'item',
      component,
    },
    {
      path: '/archive/:year(\\d{4})',
      name: 'archive',
      component,
    }
  ] as const satisfies NamedRouteRecordRaw[];

  /* START with default logic */

  type TRoutes = typeof routes;
  type RoutesMap = GenerateRoutesMap<TRoutes>

  { const _: RightLeftEquals<
    RoutesMap['item'],
    RouteRecordInfo<
      'item',
      '/item/:id(\\d)',
      { id: number },
      { id: string }
    >
  > = true }

  { const _: RightLeftEquals<
    RoutesMap['archive'],
    RouteRecordInfo<
      'archive',
      '/archive/:year(\\d{4})',
      { year: string }, /* not detected */
      { year: string }
    >
  > = true }

  /* START with custom logic, no numbers */
  type RoutesMapNoNumbers = GenerateRoutesMap<TRoutes, []>

  { const _: RightLeftEquals<
    RoutesMapNoNumbers['item'],
    RouteRecordInfo<
      'item',
      '/item/:id(\\d)',
      { id: string },
      { id: string }
    >
  > = true }

  { const _: RightLeftEquals<
    RoutesMapNoNumbers['archive'],
    RouteRecordInfo<
      'archive',
      '/archive/:year(\\d{4})',
      { year: string },
      { year: string }
    >
  > = true }

    /* START with custom logic, custom numbers detectors */

    type RoutesMapCustomNumbers = GenerateRoutesMap<TRoutes, ['\\d', '\\d+', '\\d{4}']>

    { const _: RightLeftEquals<
      RoutesMapCustomNumbers['item'],
      RouteRecordInfo<
        'item',
        '/item/:id(\\d)',
        { id: number },
        { id: string }
      >
    > = true }
  
    { const _: RightLeftEquals<
      RoutesMapCustomNumbers['archive'],
      RouteRecordInfo<
        'archive',
        '/archive/:year(\\d{4})',
        { year: number },
        { year: string }
      >
    > = true }
}


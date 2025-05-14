import { RouteRecordInfo } from "vue-router";
import { GenerateRoutesMap } from "../lib/combine";
import { NamedRouteRecordRaw } from "../lib/types";

type RightLeftEquals<T,K> = T extends K 
  ? K extends T 
    ? true 
    : false 
  : false;

{
  const component = () => {} // always fake component

  const routes = [
    {
      path: '/',
      name: 'home',
      component
    },
    {
      path: '/item/:id',
      name: 'item',
      component,
      children: [
        {
          path: '',
          name: 'item-default',
          component
        },
        {
          path: 'theme/:some',
          name: 'item-some',
          component,
          children: [
            {
              path: 'and/:onemore(\\d)+',
              name: 'item-some-more',
              component
            }
          ]
        }
      ]
    },
    {
      path: '/long/:parts(\\d)+',
      name: 'long',
      component
    }
  ] as const satisfies NamedRouteRecordRaw[];

  type TRoutes = typeof routes;
  type RoutesMap = GenerateRoutesMap<TRoutes>

  { const _: RightLeftEquals<
    RoutesMap['home'],
    RouteRecordInfo<
      'home',
      '/'
    >
  > = true }

  { const _: RightLeftEquals<
    RoutesMap['item'],
    RouteRecordInfo<
      'item',
      '/item/:id',
      { id: string },
      { id: string },
      'item-default' | 'item-some'
    >
  > = true }

  { const _: RightLeftEquals<
    RoutesMap['item-some-more'],
    RouteRecordInfo<
      'item-some-more',
      '/item/:id/theme/:some/and/:onemore(\\d)+',
      { id: string, some: string, onemore: number[] },
      { id: string, some: string, onemore: string[] },
      never
    >
  > = true }
}


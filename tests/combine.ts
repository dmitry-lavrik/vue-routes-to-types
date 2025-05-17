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
      path: '/',
      name: 'home',
      component
    },
    {
      path: '/item/:id(\\d)',
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
      path: '/long/:parts(\\d)*',
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
      '/item/:id(\\d)',
      { id: number },
      { id: string },
      'item-default' | 'item-some'
    >
  > = true }

  { const _: RightLeftEquals<
    RoutesMap['item-some-more'],
    RouteRecordInfo<
      'item-some-more',
      '/item/:id(\\d)/theme/:some/and/:onemore(\\d)+',
      { id: number, some: string, onemore: [number,...number[]] },
      { id: string, some: string, onemore: string[] }, // not tuple, string[] because it is just expected result of useRoute().params 
      never
    >
  > = true }

  { const _: RightLeftEquals<
    RoutesMap['long'],
    RouteRecordInfo<
      'long',
      '/long/:parts(\\d)*',
      { parts?: number[] | undefined },
      { parts: string | string[] }, // why string??? because useRoute().params.parts = '' if params not provided
      never
    >
  > = true }

  type a = RoutesMap['long']['params']
}


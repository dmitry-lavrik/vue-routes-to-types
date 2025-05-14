import { GenerateRoutesDraft } from "../lib/draft";
import { NamedRouteRecordRaw } from "../lib/types";
import { GetByDotKey, KeysAndChidlren } from "../lib/utility";

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

  /* Test draft */
  const _: GenerateRoutesDraft<TRoutes> = {
    home: {
      name: 'home',
      path: '/',
      params: {},
      children: null
    },
    item: {
      name: 'item',
      path: '/item/:id',
      params: { id: '-' },
      children: {
        'item-default': {
          name: 'item-default',
          path: '/item/:id',
          params: { id: '-' },
          children: null
        },
        'item-some': {
          name: 'item-some',
          path: '/item/:id/theme/:some',
          params: { id: '-', some: '23' },
          children: {
            'item-some-more': {
              name: 'item-some-more',
              path: '/item/:id/theme/:some/and/:onemore(\\d)+',
              params: { id: '-', some: '23', onemore: [ ] },
              children: null
            }
          }
        }
      }
    },
    long: {
      name: 'long',
      path: '/long/:parts(\\d)+',
      params: { parts: [1, 2] },
      children: null
    }
  }

  /* Test flatten keys */
  const __: KeysAndChidlren<typeof _>[] = [
    'home',
    'item',
    'item.children.item-default',
    'item.children.item-some',
    'item.children.item-some.children.item-some-more',
    'long'
  ];

  /* Test get by dot key */
  const ___: GetByDotKey<
    typeof _,
    'item.children.item-default'
  > = {
    name: 'item-default',
    path: '/item/:id',
    params: { id: '-' },
    children: null
  }
}
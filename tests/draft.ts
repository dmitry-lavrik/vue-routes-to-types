import { GenerateRoutesDraft } from "../lib/draft";
import { NamedRouteRecordRaw } from "../lib/types";

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
        component
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
        children: null
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

}
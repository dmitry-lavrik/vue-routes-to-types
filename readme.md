# Typed Routes in Vue are very easy now

## Define your routes in simple way, as sample
```ts
// import types
import type { GenerateRoutesMap, NamedRouteRecordRaw } from "vue-routes-to-types";

// create routes array as const
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => ''
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
  }
] as const satisfies NamedRouteRecordRaw[];

// build magic type
export type RoutesMap = GenerateRoutesMap<typeof routes>; 
```

## And finally send it to some.d.ts file
```ts
declare module 'vue-router' {
  interface TypesConfig {
    RouteNamedMap: RoutesMap
  }
}
```

## And it is work. The package is under development, documentation on design will be available later
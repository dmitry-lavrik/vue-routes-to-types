# Typed Routing in Vue is very easy now

With **vue-routes-to-types** libruary. Just 4 steps:

1. ```npm i vue-routes-to-types```
2. Marked your routes ```const routes = [/*...*/] as const satisfies NamedRouteRecordRaw[]```
3. Call to magic ```type RoutesMap = GenerateRoutesMap<typeof routes>```
4. Attach it to vue-router TypesConfig RouteNamedMap

More detailed sample located below on this page. 

##  What is problem of vue router which we decide?

Of course since v4.4.0+ Vue Router can work with typed routes. Link to official documentaion - <https://router.vuejs.org/guide/advanced/typed-routes.html>

We can define RouteNamedMap map and extends interface TypesConfig.

```ts
interface TypesConfig {
  RouteNamedMap: /* your RouteNamedMap here */
}
```

It is very good, but... Some text from official documentaion:

> Here is an example of how to manually configure typed routes:
...
> TIP. This is indeed tedious and error-prone.

And it's true. Writing bulky types that duplicate your routes array is very tedious. Just look on it:

```ts
{
  'posts/:id': RouteRecordInfo<
    'posts-item',
    '/:name/:id',
    { name: number },
    { name: string },
    never
  >
}
```

Cumbersome, inconvenient, lazy... And in this case there are no child routes yet...

The official documentation advises us to use route and type generation based on the **unplugin-vue-router** 
library. Of course, it is great tool, but it is file based Routing. Not everyone likes this option.

**That's why we made a library that will turn your routes into types!**

## Detailed sample

Of course, don't forget about
```
npm i vue-routes-to-types
```

### Define your routes and generate types
```ts
// import types
import type { GenerateRoutesMap, NamedRouteRecordRaw } from "vue-routes-to-types";

// Create routes in usual way. But mark this array as const
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
        path: 'theme/:some',
        name: 'item-some',
        component: () => ''
      }
    ]
  }
] as const satisfies NamedRouteRecordRaw[];

// build types with our magic 
export type RoutesMap = GenerateRoutesMap<typeof routes>; 
```

### And finally place it to some.d.ts file
```ts
declare module 'vue-router' {
  interface TypesConfig {
    RouteNamedMap: RoutesMap
  }
}
```

## Why NamedRouteRecordRaw type. What is it

It is RouteRecordRaw from vue-router with small modifications.

1. Route name field is required now
2. Route children is RouteRecordRaw[] of course
3. Redirect and props is simplified. In RouteRecordRaw these fields use RouteNamedMap which results in a circular type dependency.

## Library capabilities

1. Supports children routes
2. Correctly parse dynamic params
3. Correctly joins parent and children dynamic params
4. Detect repeatable params
5. Detect optional params 
6. Try to detect number regexp by \d 

## Library limitations

1. Of course we can`t really analize RegExp in () of dynamic param. We just try to detect \d, no more than that.

## How to understand libruary magic

If you know typescript just open tests folder and learns files in right order:

1. parser
2. meta
3. draft
4. combine

### Enjoy using it!
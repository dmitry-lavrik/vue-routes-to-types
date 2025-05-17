# Typed Routing in Vue is very easy now

With **vue-routes-to-types** libruary. Just 4 steps:

1. ```npm i vue-routes-to-types```
2. Marked your routes ```const routes = [/*...*/] as const satisfies NamedRouteRecordRaw[]```
3. Call to magic ```type RoutesMap = GenerateRoutesMap<typeof routes>```
4. Attach it to vue-router TypesConfig RouteNamedMap

More detailed sample located below on this page. 

##  What is problem of vue router which we decide?

Of course since v4.4.0+ Vue Router can work with typed routes. Link to official documentation - <https://router.vuejs.org/guide/advanced/typed-routes.html>

We can define RouteNamedMap map and extends interface TypesConfig.

```ts
interface TypesConfig {
  RouteNamedMap: /* your RouteNamedMap here */
}
```

It is very good, but... Some text from official documentation:

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

1. Automaticly generates RouteRecordInfo for each NamedRouteRecordRaw
2. Correctly parse dynamic params
3. Supports children routes
4. Correctly joins parent and children dynamic params
5. Trys to detect popular number patterns
6. Allows you to set up custom number detection logic
7. Detects optional params 
8. Detects repeatable params
9. Creates great tuple type if repeatable params is required: [T,...T[]] instead of T[] 

## Library limitations

1. Of course we can`t really analize RegExp in () of dynamic param. We just try to detect \\\d or \\\d+. But your can provide custom number detectors.
2. You can`t use typed routing into routes array. As sample, when you define redirect field system does not know about types yet.
3. ```<RouterLink :to="{ name: 'some '}">``` does not show error even if params is required. It is bad and it is question for vue-router team. They marked params as optional for all cases.
4. If you like very illogical patterns like /compare/:parts(\\d*)+ libruary can`t help.

## Number detectors 

By default we try to detected numbers based on 
```ts
export type DefaultNumberDetectors = ['\\d', '\\d+']
```
Your can provide custom number detectors as the second param of GenerateRoutesMap
```ts
export type RoutesMap = GenerateRoutesMap<
  typeof routes,
  ['\\d', '\\d+', '\\d{4}']
>; 
```
Now url like '/archive/:year(\\\d{4})' infer rawParams = { year: number }

## Why for :name(\\\d)* useRoute().params.name give string | string[]

For this sample real rawParams is good = [number, ...number[]]. 

But result of vue-router useRoute() is... strange... If repeateable param with * is not provided, useRoute return empty string, not empty array.

That is, here our library simply adapts to the logic of vue-router.


## How to understand library magic

If you know typescript just open tests folder and learns files in right order:

1. meta
2. parser
3. draft
4. combine
5. custom-number-detectors

### Enjoy using it!
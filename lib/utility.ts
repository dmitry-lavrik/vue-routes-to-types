type PlainObj = Record<string,unknown>

/* 
  It uses when we join tree to flatten keys and then split it.
  Logical Dot is "." But then this symbol cannot be used in the route name. 
*/
type Dot = '..-..'

export type KeysAndChidlren<Obj extends PlainObj, K = keyof Obj> = 
  K extends keyof Obj
    ? K extends string
      ? Obj[K] extends { children: PlainObj }
        ? Obj[K] extends { children: never }
          ? K
          : K | `${K}${Dot}children${Dot}${KeysAndChidlren<Obj[K]['children']>}`
        : K
      : never
    : never

export type GetByDotKey<T extends PlainObj, K extends string> = 
  K extends `${infer R1}${Dot}${infer R2}`
    ? R1 extends keyof T
      ? T[R1] extends PlainObj
        ? GetByDotKey<T[R1], R2>
        : never
      : never
    : K extends keyof T
      ? T[K]
      : never

export type TakeNames<T> = T extends Record<string,{ name: string }> ? T[keyof T]['name'] : never

export type AllParamsToString<
  T extends Record<string,unknown>
  > = 
{
  [K in keyof T]: 
    T[K] extends Array<any> 
      ? T[K] extends [infer _, ...infer __] 
        ? string[]  
        : string[] | string
      : string
}
type PlainObj = Record<string,unknown>

export type KeysAndChidlren<Obj extends PlainObj, K = keyof Obj> = 
  K extends keyof Obj
    ? K extends string
      ? Obj[K] extends { children: PlainObj }
        ? Obj[K] extends { children: never }
          ? K
          : K | `${K}.children.${KeysAndChidlren<Obj[K]['children']>}`
        : K
      : never
    : never

export type GetByDotKey<T extends PlainObj, K extends string> = 
  K extends `${infer R1}.${infer R2}`
    ? R1 extends keyof T
      ? T[R1] extends PlainObj
        ? GetByDotKey<T[R1], R2>
        : never
      : never
    : K extends keyof T
      ? T[K]
      : never

export type TakeNames<T> = T extends Record<string,{ name: string }> ? T[keyof T]['name'] : never

export type AllParamsToString<T extends Record<string,unknown>> = {
  [K in keyof T]: T[K] extends Array<any> ? string[] : string
}
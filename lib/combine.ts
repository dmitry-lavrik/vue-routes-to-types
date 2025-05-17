import type { RouteRecordInfo } from "vue-router";
import type { GenerateRoutesDraft } from "./draft";
import type { DefaultNumberDetectors, NamedRouteRecordRaw } from "./types";
import type { AllParamsToString, GetByDotKey, KeysAndChidlren, TakeNames } from "./utility";

export type GenerateRoutesMap<
  Routes extends NamedRouteRecordRaw[],
  NumberDetectors extends string[] = DefaultNumberDetectors
> = CombineFromDraft<GenerateRoutesDraft<Routes, NumberDetectors>>

type CombineFromDraft<
  Draft extends GenerateRoutesDraft<any>,
  DraftKeys extends string = KeysAndChidlren<Draft>
> = CombineToVue<{
  [K in DraftKeys]: GetByDotKey<Draft,K>
}>

//todo: maybe remove any. It works well now, but any is bad
type CombineToVue<FlattenDraft extends Record<string,any>> = {
  [K in keyof FlattenDraft as FlattenDraft[K]['name']]: RouteRecordInfo<
    FlattenDraft[K]['name'],
    FlattenDraft[K]['path'],
    FlattenDraft[K]['params'],
    AllParamsToString<Required<FlattenDraft[K]['params']>>,
    TakeNames<FlattenDraft[K]['children']>
  >
}
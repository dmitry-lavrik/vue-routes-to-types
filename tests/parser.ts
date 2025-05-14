import type { IsNumber, IsOptional } from '../lib/meta'
import { InferDirtyParams, RemapDitryParams, RemapParamsWithTypesDetection } from '../lib/parser';
import { RemapParamsToVue } from '../lib/vue';

type PathsToCheck = {
  'empty': '/home',
  'simple': '/item/:id',
  'double': '/item/:id/theme/:theme',
  'number': '/item/:id(\\d)',
  'repeatable1': '/item/:parts+',
  'repeatable2': '/item/:parts*',
  'repNum1': '/item/:parts(\\d)+',
  'repNum2': '/item/:parts(\\d)*',
  'opt': '/item/:id/:sub?',
  'crazy': ':theme/pref-:id(\\d)-:wtf-suff/:any*'
}

// Params with trash tails
{ const _: {
  [K in keyof PathsToCheck]: InferDirtyParams<PathsToCheck[K]>
} = {
  'empty': [],
  'simple': ['id'],
  'double': ['id/theme/', 'theme'],
  'number': ['id(\\d)'],
  'repeatable1': ['parts+'],
  'repeatable2': ['parts*'],
  'repNum1': ['parts(\\d)+'],
  'repNum2': ['parts(\\d)*'],
  'opt': ['id/', 'sub?'],
  'crazy': ['theme/pref-', 'id(\\d)-', 'wtf-suff/', 'any*']
}; }

type a = RemapDitryParams<['id/theme/', 'theme']>

// Record<CleanedParams, DirtyParams>
{ const _: {
  [K in keyof PathsToCheck]: RemapDitryParams<InferDirtyParams<PathsToCheck[K]>>
} = {
  'empty': {},
  'simple': { id: 'id' },
  'double': { id: 'id/theme/', theme: 'theme' },
  'number': { id: 'id(\\d)' },
  'repeatable1': { parts: 'parts+' },
  'repeatable2': { parts: 'parts*' },
  'repNum1': { parts: 'parts(\\d)+' },
  'repNum2': { parts: 'parts(\\d)*' },
  'opt': { id: 'id/', sub: 'sub?' },
  'crazy': { theme: 'theme/pref-', id: 'id(\\d)-', wtf: 'wtf-suff/', any: 'any*' }
}; }

// Record<CleanedParams, RemapedParam>
{ const _: {
  [K in keyof PathsToCheck]: RemapParamsWithTypesDetection<RemapDitryParams<
    InferDirtyParams<PathsToCheck[K]>
  >>
} = {
  'empty': {},
  'simple': { id: { number: false, optional: false, repeatable: false } },
  'double': { 
    id: { number: false, optional: false, repeatable: false }, 
    theme: { number: false, optional: false, repeatable: false }
  },
  'number': { id: { number: true, optional: false, repeatable: false } },
  'repeatable1': { parts: { number: false, optional: false, repeatable: true } },
  'repeatable2': { parts: { number: false, optional: true, repeatable: true } },
  'repNum1': { parts: { number: true, optional: false, repeatable: true } },
  'repNum2': { parts: { number: true, optional: true, repeatable: true } },
  'opt': { 
    id: { number: false, optional: false, repeatable: false } , 
    sub: { number: false, optional: true, repeatable: false } 
  },
  'crazy': { 
    theme: { number: false, optional: false, repeatable: false } , 
    id: { number: true, optional: false, repeatable: false } , 
    wtf: { number: false, optional: false, repeatable: false } , 
    any: { number: false, optional: true, repeatable: true } 
  }
}; }

// Vue remaped
{ const _: {
  [K in keyof PathsToCheck]: RemapParamsToVue<RemapParamsWithTypesDetection<RemapDitryParams<
    InferDirtyParams<PathsToCheck[K]>
  >>>
} = {
  'empty': {},
  'simple': { id: '-' },
  'double': { id: '-', theme: '-' },
  'number': { id: 1 },
  'repeatable1': { parts: ['1', '2'] },
  'repeatable2': {}, // because optional
  'repNum1': { parts: [1, 2] },
  'repNum2': {}, // because optional
  'opt': {  id: '' },
  'crazy': { 
    theme: '-', 
    id: 1 , 
    wtf: '-'
  }
}; }
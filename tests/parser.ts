import type { IsNumber, IsOptional } from '../lib/meta'
import { InferDirtyParams, RemapDitryParams } from '../lib/parser';

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
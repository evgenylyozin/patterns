// ТИПИЗАЦИЯ ПАТТЕРНОВ ФУНКЦИОНАЛЬНОГО ПРОГРАММИРОВАНИЯ

// Список всех паттернов функционального программирования,
// которые на текущий момент есть в репозитории
type FPPattern =
  | 'callback'
  | 'configuration-object'
  | 'curring'
  | 'immediate-object-initialization'
  | 'immediately-invoked-function-expression'
  | 'lazy-function-definition'
  | 'memoization';

// Список паттернов функционального программирования,
// которые не реализованы на Go(по причине невозможности
// реализации или иным причинам)
type FPPatternNotImplementedInGo =
  | 'immediate-object-initialization'
  | 'lazy-function-definition';

// Список паттернов функционального программирования,
// которые не реализованы на Javascript(по причине невозможности
// реализации или иным причинам)
type FPPatternNotImplementedInJS = null;

// Список паттернов функционального программирования,
// которые не реализованы на Typescript(по причине невозможности
// реализации или иным причинам)
type FPPatternNotImplementedInTS = null;

// Список паттернов функционального программирования,
// которые на данный момент реализованы на Go
type GoFPPattern = Exclude<FPPattern, FPPatternNotImplementedInGo>;
// Список паттернов функционального программирования,
// которые на данный момент реализованы на Javascript
type JSFPPattern = Exclude<FPPattern, FPPatternNotImplementedInJS>;
// Список паттернов функционального программирования,
// которые на данный момент реализованы на Typescript
type TSFPPattern = Exclude<FPPattern, FPPatternNotImplementedInTS>;

// ТИПИЗАЦИЯ ПАТТЕРНОВ ОБЪЕКТНО-ОРИЕНТИРОВАННОГО ПРОГРАММИРОВАНИЯ

type OOPPattern =
  | 'chain-of-responsibility'
  | 'command'
  | 'interpreter'
  | 'iterator'
  | 'mediator'
  | 'memento'
  | 'observer'
  | 'state'
  | 'strategy'
  | 'template-method'
  | 'visitor'
  | 'abstract-factory'
  | 'builder'
  | 'constructor'
  | 'factory'
  | 'prototype'
  | 'singleton'
  | 'adapter'
  | 'bridge'
  | 'composite'
  | 'decorator'
  | 'facade'
  | 'flyweight'
  | 'proxy';

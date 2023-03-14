# Немедленно выполняемое функциональное выражение (Immediately invoked function expression/IIFE)

Это конструкция, позволяющая вызывать функцию непосредственно после ее определения.

Чаще всего она используется, чтобы не допустить загрязнения глобального пространства имён. Переменные, объявленные в IIFE, невидимы за пределами этой функции.

## Когда использовать

- для создания модуля
- для выполнения инициализации
- для создания синглтона и т.п.

## Блок-схема

![Блок-схема немедленно выполняемого функционального выражения](https://github.com/evgenylyozin/patterns/blob/9c75c41d2576c65fa1408d7cb33b8e69ed52066f/docs/fp-patterns/flowcharts/immediately-invoked-function-expression.png)

[Что такое блок-схема](https://github.com/evgenylyozin/patterns/blob/48f6815cb43aa7cf366156fe23d47cdbaccbe3eb/docs/flowchart.md)

## Дополнительная информация

[Что такое IIFE](https://developer.mozilla.org/ru/docs/Glossary/IIFE)

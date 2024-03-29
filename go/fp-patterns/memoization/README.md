# Запоминание (Memoization)

Сохранение результатов выполнения функций для предотвращения повторных вычислений. Это один из способов оптимизации, применяемый для увеличения скорости выполнения компьютерных программ. Перед вызовом функции проверяется, вызывалась ли функция ранее:

- если не вызывалась, то функция вызывается, и результат её выполнения сохраняется;
- если вызывалась, то используется сохранённый результат.

## Когда использовать

- когда нужно запомнить результат операции и при повторе аргументов функции вернуть его вместо повторения расчетов

## Блок-схема

![Блок-схема запоминания](https://github.com/evgenylyozin/patterns/blob/0ca5a5d6a716a72584a759cbf0a00c765a9dd618/docs/fp-patterns/flowcharts/memoization.png)

[Что такое блок-схема](https://github.com/evgenylyozin/patterns/blob/48f6815cb43aa7cf366156fe23d47cdbaccbe3eb/docs/flowchart.md)

## Дополнительная информация

[Что такое мемоизация](https://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D0%BC%D0%BE%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F)

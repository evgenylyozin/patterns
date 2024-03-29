# Стратегия (Strategy)

Поведенческий шаблон проектирования, который определяет семейство
схожих алгоритмов и помещает каждый из них в собственный класс,
после чего алгоритмы можно взаимозаменять прямо во время исполнения программы.

Шаблон проектирования "Стратегия" предполагает:

- Описание интерфейса стратегии (методов, которые должен реализовывать каждый
  конкретный класс-стратегия)
- Определение класса-контекста, который содержит ссылку на конкретную стратегию
  и вызывает её методы для выполнения запросов клиента
- Определение классов конкретных стратегий, которые реализуют интерфейс
  стратегии

## Когда использовать

- Если программа должна обеспечивать различные варианты алгоритма или поведения
- Если необходимо изменять поведение объектов на стадии выполнения

## UML диаграмма

![UML диаграмма стратегии](https://github.com/evgenylyozin/patterns/blob/55060280dde28bf0079443b297346577e5fa6191/docs/oop-patterns/uml-diagrams/strategy.png)

[Что такое UML диаграммы](https://github.com/evgenylyozin/patterns/blob/6bd4dee6b7186d8703f4f3d8f852e72d185ae545/docs/diagram.md)

## Дополнительная информация

[Стратегия - статья на Вики](<https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%B0%D1%82%D0%B5%D0%B3%D0%B8%D1%8F_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)>)

# Команда (Command)

Поведенческий шаблон проектирования, используемый при объектно-ориентированном
программировании, представляющий действие.
Объект команды заключает в себе само действие и его параметры.

Шаблон проектирования "Команда" предполагает:

- Создание класса отправителя, который примет определённую команду и
  вызовет её при необходимости
- Описание интерфейса команды, который содержит общие методы, реализуемые
  каждой конкретной командой
- Создание конкретных команд, которые будут содержать бизнес логику или
  перенаправлять запрос получателю, который непосредственно его
  обработает
- Опционально: создание конкретных получателей запросов, которые будут
  их обрабатывать
- Клиент должен создать экземпляр конкретной команды, передать его в
  отправителя и выполнить команду через отправителя

## Когда использовать

- если нужно организовать систему, при которой класс-отправитель и
  класс-получатель не зависят друг от друга напрямую
- полезно при организации функционала кнопок пользовательского интерфейса,
  записи макросов, многоуровневой отмене операций и т.п.

## UML диаграмма

![UML диаграмма команды](https://github.com/evgenylyozin/patterns/blob/c6f3da8e5fb97cc77b07ede0fecfa09194e1f0b3/docs/oop-patterns/uml-diagrams/command.png)

[Что такое UML диаграммы](https://github.com/evgenylyozin/patterns/blob/6bd4dee6b7186d8703f4f3d8f852e72d185ae545/docs/diagram.md)

## Дополнительная информация

[Команда - статья на Вики](<https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D0%B0_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)>)

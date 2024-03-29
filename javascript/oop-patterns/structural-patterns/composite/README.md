# Компоновщик (Composite)

Структурный шаблон проектирования, который позволяет сгруппировать множество объектов в древовидную структуру, а затем работать с ней так, как будто это единичный объект. Компоновщик имеет смысл только тогда, когда основная модель программы может быть структурирована в виде дерева (например, файловая система содержит файлы и папки, паки могут содержать в себе файлы и папки и т.д.)

Шаблон проектирования "Компоновщик" предполагает:

- Определение общего для всех составных частей дерева интерфейса (для простых и составных компонентов)

- Определение простого компонента, который обычно выполняет всю основную работу и не содержит внутри себя ссылок на другие компоненты

- Определение составного компонента, который содержит внутри себя ссылку на другие компоненты и обычно передаёт выполнение запроса простому компоненту. Составной компонент так же может иметь дополнительную логику для решения поставленных задач.

- Объединение всех компонентов в одну древовидную структуру

## Когда использовать

- если нужно организовать иерархию классов
- если нужно упростить клиентский код, работающий с объектами, которые могут быть организованы в виде дерева
- если нужно упростить добавление новых типов объектов в систему

## UML диаграмма

![UML диаграмма компоновщика](https://github.com/evgenylyozin/patterns/blob/c6f3da8e5fb97cc77b07ede0fecfa09194e1f0b3/docs/oop-patterns/uml-diagrams/composite.png)

[Что такое UML диаграммы](https://github.com/evgenylyozin/patterns/blob/6bd4dee6b7186d8703f4f3d8f852e72d185ae545/docs/diagram.md)

## Дополнительная информация

[Компоновщик - статья на Вики](<https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%BE%D0%B2%D1%89%D0%B8%D0%BA_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)>)

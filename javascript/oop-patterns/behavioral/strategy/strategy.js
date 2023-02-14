//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// STRATEGY (СТРАТЕГИЯ)
// ЦЕЛЬ: создать объект контекста, а так же несколько объектов, имплементирующих
// разные подходы к решению бизнес задачи. Клиент может выбирать стратегию,
// передавать её в контекст, тем самым меняя поведение класса контекста
// без его расширения
// ВАРИАНТ ИСПОЛЬЗОВАНИЯ: в приложении поиска маршрута заменять внутри контекста
// логику поиска на поиск для авто или пешехода в зависимости от нужд клиента

// Контекст используется клиентом для вызова методов, решающих бизнес
// задачи
class StrategyContext {
  strategy;

  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  // Контекст передаёт выполнение задачи в конкретный объект стратегии, при
  // этом не имея методов для её непосредственного решения внутри себя
  doSomeBusinessLogic() {
    console.log(
      "Context: Sorting data using the strategy (not sure how it'll do it)"
    );
    const result = this.strategy.doAlgorithm(['a', 'b', 'c', 'e', 'd']);
    console.log(result.join(','));
  }
}

// Конкретные стратегии непосредственно включают реализацию интерфейса стратегий
class ConcreteStrategyA {
  doAlgorithm(data) {
    return data.sort();
  }
}

class ConcreteStrategyB {
  doAlgorithm(data) {
    return data.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
  }
}

// const context = new StrategyContext(new ConcreteStrategyA());
// console.log('Client: Strategy is set to normal sorting.');
// context.doSomeBusinessLogic();

// console.log('');

// console.log('Client: Strategy is set to reverse sorting.');
// context.setStrategy(new ConcreteStrategyB());
// context.doSomeBusinessLogic();

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
    console.log('Контекст: Сортирую данные, используя стратегию');
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

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const strategyContext = new StrategyContext(new ConcreteStrategyA());
console.log('Клиент: Установлена стратегия сортировки по возрастанию');
strategyContext.doSomeBusinessLogic();

console.log('');

console.log('Клиент: Установлена стратегия сортировки по убыванию');
strategyContext.setStrategy(new ConcreteStrategyB());
strategyContext.doSomeBusinessLogic();

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
  private strategy: iStrategy;

  constructor(strategy: iStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: iStrategy) {
    this.strategy = strategy;
  }

  // Контекст передаёт выполнение задачи в конкретный объект стратегии, при
  // этом не имея методов для её непосредственного решения внутри себя
  public doSomeBusinessLogic(): void {
    console.log(
      "Context: Sorting data using the strategy (not sure how it'll do it)"
    );
    const result = this.strategy.doAlgorithm(['a', 'b', 'c', 'e', 'd']);
    console.log(result.join(','));
  }
}

// Интерфейс стратегии должен включать все поддерживаемые каждой стратегией
// методы, контекст стратегий использует этот интерфейс для вызова
// соответствующих методов на объекте стратегии
interface iStrategy {
  doAlgorithm(data: string[]): string[];
}

// Конкретные стратегии непосредственно включают реализацию интерфейса стратегий
class ConcreteStrategyA implements iStrategy {
  public doAlgorithm(data: string[]): string[] {
    return data.sort();
  }
}

class ConcreteStrategyB implements iStrategy {
  public doAlgorithm(data: string[]): string[] {
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

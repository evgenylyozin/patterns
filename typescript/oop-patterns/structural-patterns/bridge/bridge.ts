// Абстрактный мост содержит ссылку на конкретную реализацию требуемых операций
// и вызывается клиентом
class AbstractBridge {
  protected implementation: Implementation;

  constructor(implementation: Implementation) {
    this.implementation = implementation;
  }

  public operation(): string {
    const result = this.implementation.operationImplementation();
    return `Абстракция: Базовая операция вместе с конкретной реализацией:\n${result}`;
  }
}

// Абстрактную часть можно расширять независимо от реализаций
class ExtendedAbstractBridge extends AbstractBridge {
  public operation(): string {
    const result = this.implementation.operationImplementation();
    return `Расширенная Абстракция: Расширенная операция вместе с конкретной 
реализацией:\n${result}`;
  }
}

// Интерфейс для каждого класса реализации
interface Implementation {
  operationImplementation(): string;
}

// Конкретная реализация представляет из себя конкретные операции, которые потом
// будут использованы через абстрактный мост клиентом
// таким образом, при условии соответствия интерфейсу реализации, можно
// использовать разные внешние API объекты и т.д. внутри разных реализаций
class ConcreteImplementationA implements Implementation {
  public operationImplementation(): string {
    return 'Конкретная реализация типа "А": Результат на платформе "А".';
  }
}

class ConcreteImplementationB implements Implementation {
  public operationImplementation(): string {
    return 'Конкретная реализация типа "Б": Результат на платформе "Б".';
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let implementation = new ConcreteImplementationA();
let abstraction = new AbstractBridge(implementation);
console.log(abstraction.operation());

implementation = new ConcreteImplementationB();
abstraction = new ExtendedAbstractBridge(implementation);
console.log(abstraction.operation());

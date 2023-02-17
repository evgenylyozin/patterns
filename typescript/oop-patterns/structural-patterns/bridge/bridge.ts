// Абстрактный мост содержит ссылку на конкретную реализацию требуемых операций
// и вызывается клиентом
class AbstractBridge {
  protected implementation: Implementation;

  constructor(implementation: Implementation) {
    this.implementation = implementation;
  }

  public operation(): string {
    const result = this.implementation.operationImplementation();
    return `Abstraction: Base operation with:\n${result}`;
  }
}

// Абстрактную часть можно расширять независимо от реализаций
class ExtendedAbstractBridge extends AbstractBridge {
  public operation(): string {
    const result = this.implementation.operationImplementation();
    return `ExtendedAbstraction: Extended operation with:\n${result}`;
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
    return "ConcreteImplementationA: Here's the result on the platform A.";
  }
}

class ConcreteImplementationB implements Implementation {
  public operationImplementation(): string {
    return "ConcreteImplementationB: Here's the result on the platform B.";
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

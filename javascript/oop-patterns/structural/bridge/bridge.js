//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// BRIDGE (МОСТ)
// ЦЕЛЬ: разгрузить сложную систему классов и отделить конкретные операции от
// высокоуровневых (более абстрактных)
// ПРИМЕНЕНИЕ: при необходимости поддерживать различные платформы, использовать
// разные внешние API или структуры

// Абстрактный мост содержит ссылку на конкретную имплементацию требуемых операций
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

// Абстрактную часть можно расширять независимо от имплементаций
class ExtendedAbstractBridge extends AbstractBridge {
  public operation(): string {
    const result = this.implementation.operationImplementation();
    return `ExtendedAbstraction: Extended operation with:\n${result}`;
  }
}

// Интерфейс для каждого класса имплементации
interface Implementation {
  operationImplementation(): string;
}

// Конкретная имплементация представляет из себя конкретные операции, которые потом
// будут использованы через абстрактный мост клиентом
// таким образом, при условии соответствия интерфейсу имплементации, можно
// использовать разные внешние API объекты и т.д. внутри разных имплементаций
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

// let implementation = new ConcreteImplementationA();
// let abstraction = new AbstractBridge(implementation);
// console.log(abstraction.operation());

// implementation = new ConcreteImplementationB();
// abstraction = new ExtendedAbstractBridge(implementation);
// console.log(abstraction.operation());

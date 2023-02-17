// Абстрактный мост содержит ссылку на конкретную реализацию требуемых операций
// и вызывается клиентом
class AbstractBridge {
  implementation;

  constructor(implementation) {
    this.implementation = implementation;
  }

  operation() {
    const result = this.implementation.operationImplementation();
    return `Abstraction: Base operation with:\n${result}`;
  }
}

// Абстрактную часть можно расширять независимо от реализаций
class ExtendedAbstractBridge extends AbstractBridge {
  operation() {
    const result = this.implementation.operationImplementation();
    return `ExtendedAbstraction: Extended operation with:\n${result}`;
  }
}

// Конкретная реализация представляет из себя конкретные операции, которые потом
// будут использованы через абстрактный мост клиентом
// таким образом, при условии соответствия интерфейсу реализации, можно
// использовать разные внешние API объекты и т.д. внутри разных реализаций
class ConcreteImplementationA {
  operationImplementation() {
    return "ConcreteImplementationA: Here's the result on the platform A.";
  }
}

class ConcreteImplementationB {
  operationImplementation() {
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

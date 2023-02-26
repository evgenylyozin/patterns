// Абстрактный мост содержит ссылку на конкретную реализацию требуемых операций
// и вызывается клиентом
class AbstractBridge {
  implementation;

  constructor(implementation) {
    this.implementation = implementation;
  }

  operation() {
    const result = this.implementation.operationImplementation();
    return `Абстракция: Базовая операция вместе с конкретной реализацией:\n${result}`;
  }
}

// Абстрактную часть можно расширять независимо от реализаций
class ExtendedAbstractBridge extends AbstractBridge {
  operation() {
    const result = this.implementation.operationImplementation();
    return `Расширенная Абстракция: Расширенная операция вместе с конкретной 
реализацией:\n${result}`;
  }
}

// Конкретная реализация представляет из себя конкретные операции, которые потом
// будут использованы через абстрактный мост клиентом
// таким образом, при условии соответствия интерфейсу реализации, можно
// использовать разные внешние API объекты и т.д. внутри разных реализаций
class ConcreteImplementationA {
  operationImplementation() {
    return 'Конкретная реализация типа "А": Результат на платформе "А".';
  }
}

class ConcreteImplementationB {
  operationImplementation() {
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

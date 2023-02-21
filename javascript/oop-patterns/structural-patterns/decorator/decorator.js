// Конкретный класс со стандартной имплементацией операций
class Decorated {
  log(data) {
    console.log(data);
  }
}

// Базовый декоратор должен следовать интерфейсу оборачиваемого объекта
class Decorator {
  constructor(decorated) {
    this.decorated = decorated;
  }
  log(data) {
    this.decorated.log(data);
  }
}

// Конкретные декораторы следуют интерфейсу оборачиваемого объекта и
// манипулируют данными, передаваемыми в него или получаемыми от него
class ConcreteDecoratorA extends Decorator {
  log(data) {
    data = `Декоратор А преобразовал данные, строка до преобразования:\n${data}`;
    super.log(data);
  }
}

class ConcreteDecoratorB extends Decorator {
  log(data) {
    data = `Декоратор B преобразовал данные, строка до преобразования:\n${data}`;
    super.log(data);
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const decorated = new Decorated();
const decoratorA = new ConcreteDecoratorA(decorated);
const decoratorB = new ConcreteDecoratorB(decoratorA);

decorated.log('Привет!');
decoratorA.log('Привет!');
decoratorB.log('Привет!');

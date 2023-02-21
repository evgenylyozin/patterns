// Интерфейс объекта, который оборачивается
// ему должны так же следовать все обёртки, чтобы клиентский код
// мог без труда использовать столько декораторов, сколько угодно
interface IDecorated {
  log(data: string): void;
}

// Конкретный класс со стандартной имплементацией операций
class Decorated implements IDecorated {
  public log(data: string): void {
    console.log(data);
  }
}

// Базовый декоратор должен так же следовать интерфейсу оборачиваемого объекта
class Decorator implements IDecorated {
  protected decorated: IDecorated;

  constructor(decorated: IDecorated) {
    this.decorated = decorated;
  }
  public log(data: string): void {
    this.decorated.log(data);
  }
}

// Конкретные декораторы следуют интерфейсу оборачиваемого объекта и
// манипулируют данными, передаваемыми в него или получаемыми от него
class ConcreteDecoratorA extends Decorator {
  public log(data: string): void {
    data = `Декоратор А преобразовал данные, строка до преобразования:\n${data}`;
    super.log(data);
  }
}

class ConcreteDecoratorB extends Decorator {
  public log(data: string): void {
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

// Абстрактный класс определяет структуру конкретных объектов, в частности
// методы, которые:
// - могут быть общими для всех и соответственно реализованы внутри базового класса
// - могут быть разными для всех и поэтому абстрактны и не определены внутри базового класса
// - могут быть общими для некоторых и не использоваться или перезаписываться остальными,
// а потому определены в базовом классе и могут перезаписываться или игнорироваться
// субклассами
abstract class AbstractClass {
  // Шаблонный метод - скелет всего алгоритма
  public templateMethod(): void {
    this.baseOperation1();
    this.requiredOperation1();
    this.baseOperation2();
    this.hook1();
    this.requiredOperation2();
    this.baseOperation3();
    this.hook2();
  }

  protected baseOperation1(): void {
    console.log('AbstractClass: Выполняю часть работы');
  }

  protected baseOperation2(): void {
    console.log(
      'AbstractClass: Но позволяю подклассам переопределять некоторые операции'
    );
  }

  protected baseOperation3(): void {
    console.log('AbstractClass: В любом случае часть работы на мне');
  }

  // эти операции должны быть определены субклассами
  protected abstract requiredOperation1(): void;
  protected abstract requiredOperation2(): void;

  // Эти операции могут быть переопределены субклассами или проигнорированы
  protected hook1(): void {}
  protected hook2(): void {}
}

class ConcreteClass1 extends AbstractClass {
  protected requiredOperation1(): void {
    console.log('ConcreteClass1: Переопределил requiredOperation1');
  }

  protected requiredOperation2(): void {
    console.log('ConcreteClass1: Переопределил requiredOperation2');
  }
}

class ConcreteClass2 extends AbstractClass {
  protected requiredOperation1(): void {
    console.log('ConcreteClass2: Переопределил requiredOperation1');
  }

  protected requiredOperation2(): void {
    console.log('ConcreteClass2: Переопределил requiredOperation2');
  }

  protected hook1(): void {
    console.log('ConcreteClass2: Переопределил hook1');
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
console.log('Клиент: работаю с ConcreteClass1');
new ConcreteClass1().templateMethod();
console.log('');

console.log('Клиент: работаю с ConcreteClass2');
new ConcreteClass2().templateMethod();

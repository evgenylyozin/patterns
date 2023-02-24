// Абстрактный класс определяет структуру конкретных объектов, в частности
// методы, которые:
// - могут быть общими для всех и соответственно реализованы внутри базового класса
// - могут быть разными для всех и поэтому абстрактны и не определены внутри базового класса
// - могут быть общими для некоторых и не использоваться или перезаписываться остальными,
// а потому определены в базовом классе и могут перезаписываться или игнорироваться
// субклассами
class AbstractClass {
  // Шаблонный метод - скелет всего алгоритма
  templateMethod() {
    this.baseOperation1();
    this.requiredOperation1();
    this.baseOperation2();
    this.hook1();
    this.requiredOperation2();
    this.baseOperation3();
    this.hook2();
  }

  baseOperation1() {
    console.log('AbstractClass says: I am doing the bulk of the work');
  }

  baseOperation2() {
    console.log(
      'AbstractClass says: But I let subclasses override some operations'
    );
  }

  baseOperation3() {
    console.log(
      'AbstractClass says: But I am doing the bulk of the work anyway'
    );
  }

  // эти операции должны быть определены субклассами
  requiredOperation1() {
    throw new Error(
      'requiredOperations1 нужно переопределить в конкретном субклассе'
    );
  }
  requiredOperation2() {
    throw new Error(
      'requiredOperation2 нужно переопределить в конкретном субклассе'
    );
  }

  // Эти операции могут быть переопределены субклассами или проигнорированы
  hook1() {}
  hook2() {}
}

class ConcreteClass1 extends AbstractClass {
  requiredOperation1() {
    console.log('ConcreteClass1 says: Implemented Operation1');
  }

  requiredOperation2() {
    console.log('ConcreteClass1 says: Implemented Operation2');
  }
}

class ConcreteClass2 extends AbstractClass {
  requiredOperation1() {
    console.log('ConcreteClass2 says: Implemented Operation1');
  }

  requiredOperation2() {
    console.log('ConcreteClass2 says: Implemented Operation2');
  }

  hook1() {
    console.log('ConcreteClass2 says: Overridden Hook1');
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
console.log('Same client code can work with different subclasses:');
new ConcreteClass1().templateMethod();
console.log('');

console.log('Same client code can work with different subclasses:');
new ConcreteClass2().templateMethod();

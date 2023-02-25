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
    console.log('AbstractClass: Выполняю часть работы');
  }

  baseOperation2() {
    console.log(
      'AbstractClass: Но позволяю подклассам переопределять некоторые операции'
    );
  }

  baseOperation3() {
    console.log('AbstractClass: В любом случае часть работы на мне');
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
    console.log('ConcreteClass1: Переопределил requiredOperation1');
  }

  requiredOperation2() {
    console.log('ConcreteClass1: Переопределил requiredOperation2');
  }
}

class ConcreteClass2 extends AbstractClass {
  requiredOperation1() {
    console.log('ConcreteClass2: Переопределил requiredOperation1');
  }

  requiredOperation2() {
    console.log('ConcreteClass2: Переопределил requiredOperation2');
  }

  hook1() {
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

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// TEMPLATE METHOD (ШАБЛОННЫЙ МЕТОД)
// ЦЕЛЬ: устранить повторный код внутри похожих объектов путём переноса общих
// частей в 1  базовый класс, и определения методов для перезаписи субклассами
// ВАРИАНТ ИСПОЛЬЗОВАНИЯ: в приложении обработки файлов различных текстовых
// форматов возможно создание массы классов обработчиков, которые будут
// отличаться только логикой прохода по файлу, а в остальном будут идентичны
// в таких случаях можно создать базовый класс и перенести туда все общие части,
// а отличающиеся методы определить в базовом классе и переписать в субклассах

// Абстрактный класс определяет структуру конкретных объектов, в частности
// методы, которые:
// - могут быть общими для всех и соответственно имплементированы внутри базового класса
// - могут быть разными для всех и поэтому абстрактны и не определены внутри базового класса
// - могут быть общими для некоторых и не использоваться или перезаписываться остальными,
// а потому определены в базовом классе и могут перезаписываться или игнорироваться
// субклассами
class AbstractClass {
  // Шаблонный метод - скелет всего алгоритма
  templateMethod() {
    this.baseOperation1();
    this.requiredOperations1();
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
  requiredOperations1() {
    throw new Error(
      'requiredOperations1 нужно переопределить в конкретном субклассе'
    );
  }
  requiredOperations2() {
    throw new Error(
      'requiredOperation2 нужно переопределить в конкретном субклассе'
    );
  }

  // Эти операции могут быть переопределены субклассами или проигнорированы
  hook1() {}
  hook2() {}
}

class ConcreteClass1 extends AbstractClass {
  requiredOperations1() {
    console.log('ConcreteClass1 says: Implemented Operation1');
  }

  requiredOperation2() {
    console.log('ConcreteClass1 says: Implemented Operation2');
  }
}

class ConcreteClass2 extends AbstractClass {
  requiredOperations1() {
    console.log('ConcreteClass2 says: Implemented Operation1');
  }

  requiredOperation2() {
    console.log('ConcreteClass2 says: Implemented Operation2');
  }

  hook1() {
    console.log('ConcreteClass2 says: Overridden Hook1');
  }
}

// console.log('Same client code can work with different subclasses:');
// new ConcreteClass1().templateMethod();
// console.log('');

// console.log('Same client code can work with different subclasses:');
// new ConcreteClass2().templateMethod();

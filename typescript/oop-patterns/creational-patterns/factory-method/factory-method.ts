//Класс Создатель объявляет фабричный метод, который должен возвращать объект
//класса Продукт. Подклассы Создателя обычно предоставляют реализацию этого
//метода.
abstract class Creator {
  public abstract factoryMethod(): Product;

  // Также заметьте, что, несмотря на название, основная обязанность Создателя
  // не заключается в создании продуктов. Обычно он содержит некоторую базовую
  // бизнес-логику, которая основана на объектах Продуктов, возвращаемых
  // фабричным методом. Подклассы могут косвенно изменять эту бизнес-логику,
  // переопределяя фабричный метод и возвращая из него другой тип продукта.

  public someOperation(): string {
    // Вызываем фабричный метод, чтобы получить объект-продукт.
    const product = this.factoryMethod();
    // Далее, работаем с этим продуктом.
    return `Создатель: Один и тот же код создателя отработал с новым 
    продуктом - ${product.operation()}`;
  }
}

// Конкретные Создатели переопределяют фабричный метод для того, чтобы изменить
// тип результирующего продукта.
class ConcreteCreator1 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct1();
  }
}

class ConcreteCreator2 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct2();
  }
}

//Интерфейс Продукта объявляет операции, которые должны выполнять все
//конкретные продукты.
interface Product {
  operation(): string;
}

class ConcreteProduct1 implements Product {
  public operation(): string {
    return '{Результат операции конкретного продукта типа 1}';
  }
}

class ConcreteProduct2 implements Product {
  public operation(): string {
    return '{Результат операции конкретного продукта типа 2}';
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

console.log(new ConcreteCreator1().someOperation());
console.log(new ConcreteCreator2().someOperation());

// Каждый компонент, который нужно посетить должен содержать метод,
// который позволит принять посетителя
interface Component {
  accept(visitor: Visitor): void;
}

class ConcreteComponentA implements Component {
  public accept(visitor: Visitor): void {
    visitor.visitConcreteComponentA(this);
  }
  public exclusiveMethodOfConcreteComponentA(): string {
    return 'A';
  }
}

class ConcreteComponentB implements Component {
  public accept(visitor: Visitor): void {
    visitor.visitConcreteComponentB(this);
  }

  public specialMethodOfConcreteComponentB(): string {
    return 'B';
  }
}

// Каждый посетитель должен иметь методы для посещения конкретных компонентов
interface Visitor {
  visitConcreteComponentA(element: ConcreteComponentA): void;
  visitConcreteComponentB(element: ConcreteComponentB): void;
}

class ConcreteVisitor1 implements Visitor {
  public visitConcreteComponentA(element: ConcreteComponentA): void {
    console.log(
      `${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor1`
    );
  }

  public visitConcreteComponentB(element: ConcreteComponentB): void {
    console.log(
      `${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor1`
    );
  }
}

class ConcreteVisitor2 implements Visitor {
  public visitConcreteComponentA(element: ConcreteComponentA): void {
    console.log(
      `${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor2`
    );
  }

  public visitConcreteComponentB(element: ConcreteComponentB): void {
    console.log(
      `${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor2`
    );
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const comp1 = new ConcreteComponentA();
const comp2 = new ConcreteComponentB();

console.log(
  'Клиент работает с каждым посетителем через базовый интерфейс посетителя'
);
const visitor1 = new ConcreteVisitor1();
const visitor2 = new ConcreteVisitor2();
console.log('Что позволяет клиенту работать с различными посетителями:');

comp1.accept(visitor1);
comp1.accept(visitor2);
comp2.accept(visitor1);
comp2.accept(visitor2);

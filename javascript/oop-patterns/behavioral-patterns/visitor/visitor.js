class ConcreteComponentA {
  accept(visitor) {
    visitor.visitConcreteComponentA(this);
  }
  exclusiveMethodOfConcreteComponentA() {
    return 'A';
  }
}

class ConcreteComponentB {
  accept(visitor) {
    visitor.visitConcreteComponentB(this);
  }

  specialMethodOfConcreteComponentB() {
    return 'B';
  }
}

class ConcreteVisitor1 {
  visitConcreteComponentA(element) {
    console.log(
      `${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor1`
    );
  }

  visitConcreteComponentB(element) {
    console.log(
      `${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor1`
    );
  }
}

class ConcreteVisitor2 {
  visitConcreteComponentA(element) {
    console.log(
      `${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor2`
    );
  }

  visitConcreteComponentB(element) {
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
  'The client code works with all visitors via the base Visitor interface:'
);
const visitor1 = new ConcreteVisitor1();
const visitor2 = new ConcreteVisitor2();
console.log(
  'It allows the same client code to work with different types of visitors:'
);

comp1.accept(visitor1);
comp1.accept(visitor2);
comp2.accept(visitor1);
comp2.accept(visitor2);

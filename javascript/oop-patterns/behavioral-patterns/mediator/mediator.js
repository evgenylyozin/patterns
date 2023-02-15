//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// MEDIATOR (МЕДИАТОР)
// ЦЕЛЬ: избавиться от хаотичных зависимостей между объектами, создав
// объект - медиатор и перенаправив все запросы между объектами через него

// Конкретный медиатор включает в себя логику координации между различными
// объектами
class ConcreteMediator {
  component1;
  component2;

  constructor(c1, c2) {
    this.component1 = c1;
    this.component1.setMediator(this);
    this.component2 = c2;
    this.component2.setMediator(this);
  }
  // Метод notify на медиаторе принимает события и вызывает методы на
  // нужных объектах в соответствии с ними
  notify(sender, event) {
    if (event === 'A') {
      console.log('Mediator reacts on A and triggers following operations:');
      this.component2.doC();
    }

    if (event === 'D') {
      console.log('Mediator reacts on D and triggers following operations:');
      this.component1.doB();
      this.component2.doC();
    }
  }
}

// Все остальные объекты должны хранить ссылку на медиатора, чтобы вызывать
// его метод notify
class BaseComponent {
  mediator;

  constructor(mediator = null) {
    mediator ? (this.mediator = mediator) : undefined;
  }

  setMediator(mediator) {
    this.mediator = mediator;
  }
}

// Конкретные объекты содержат бизнес логику и не зависят ни от других компонентов
// ни от конкретного медиатора (т.к. они сохраняют в себе ссылку на любого
// конкретного медиатора)
class Component1 extends BaseComponent {
  doA() {
    console.log('Component 1 does A.');
    this.mediator.notify(this, 'A');
  }

  doB() {
    console.log('Component 1 does B.');
    this.mediator.notify(this, 'B');
  }
}

class Component2 extends BaseComponent {
  doC() {
    console.log('Component 2 does C.');
    this.mediator.notify(this, 'C');
  }

  doD() {
    console.log('Component 2 does D.');
    this.mediator.notify(this, 'D');
  }
}

// const c1 = new Component1();
// const c2 = new Component2();
// const mediator = new ConcreteMediator(c1, c2);

// console.log('Client triggers operation A.');
// c1.doA();

// console.log('');
// console.log('Client triggers operation D.');
// c2.doD();

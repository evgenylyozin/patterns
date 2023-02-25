// Конкретный посредник включает в себя логику координации между различными
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
  // Метод notify на посреднике принимает события и вызывает методы на
  // нужных объектах в соответствии с ними
  notify(sender, event) {
    if (event === 'А') {
      console.log(`Посредник реагирует на событие "А" и задействует 
следующие операции:`);
      this.component2.doC();
    }

    if (event === 'Г') {
      console.log(`Посредник реагирует на событие "Г" и задействует 
следующие операции:`);
      this.component1.doB();
      this.component2.doC();
    }
  }
}

// Все остальные объекты должны хранить ссылку на посредника, чтобы вызывать
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
// ни от конкретного посредника (т.к. они сохраняют в себе ссылку на любого
// конкретного посредника)
class Component1 extends BaseComponent {
  doA() {
    console.log('Компонент 1 делает А.');
    this.mediator.notify(this, 'А');
  }

  doB() {
    console.log('Компонент 1 делает Б.');
    this.mediator.notify(this, 'Б');
  }
}

class Component2 extends BaseComponent {
  doC() {
    console.log('Компонент 2 делает В.');
    this.mediator.notify(this, 'В');
  }

  doD() {
    console.log('Компонент 2 делает Г.');
    this.mediator.notify(this, 'Г');
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const c1 = new Component1();
const c2 = new Component2();
const mediator = new ConcreteMediator(c1, c2);

console.log('Клиент задействует операцию А.');
c1.doA();

console.log('');
console.log('Клиент задействует операцию Г.');
c2.doD();

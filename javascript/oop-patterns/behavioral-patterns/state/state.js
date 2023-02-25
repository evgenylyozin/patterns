// Контекст - объект, используемый клиентом. Он хранит в себе ссылку на объект
// текущего состояния и меняет своё поведение в зависимости от этого
// состояния
class Context {
  state;

  constructor(state) {
    this.transitionTo(state);
  }

  transitionTo(state) {
    console.log(`Контекст: Переход к ${state.constructor.name}.`);
    this.state = state;
    this.state.setContext(this);
  }

  request1() {
    this.state ? this.state.handle1() : null;
  }

  request2() {
    this.state ? this.state.handle2() : null;
  }
}

// Базовое состояние содержит методы, которые должны присутствовать в каждом
// объекте состояния, а так же ссылку на контекст для того, чтобы
// иметь возможность его изменить
class State {
  context;

  setContext(context) {
    this.context = context;
  }

  handle1() {}

  handle2() {}
}

class ConcreteStateA extends State {
  handle1() {
    console.log('ConcreteStateA обрабатывает request1.');
    console.log('ConcreteStateA хочет изменить состояние контекста.');
    this.context ? this.context.transitionTo(new ConcreteStateB()) : null;
  }

  handle2() {
    console.log('ConcreteStateA обрабатывает request2.');
  }
}

class ConcreteStateB extends State {
  handle1() {
    console.log('ConcreteStateB обрабатывает request1.');
  }

  handle2() {
    console.log('ConcreteStateB обрабатывает request2.');
    console.log('ConcreteStateB хочет изменить состояние контекста.');
    this.context ? this.context.transitionTo(new ConcreteStateA()) : null;
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const context = new Context(new ConcreteStateA());
context.request1();
context.request2();

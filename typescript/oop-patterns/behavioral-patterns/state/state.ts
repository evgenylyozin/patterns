// Контекст - объект, используемый клиентом. Он хранит в себе ссылку на объект
// текущего состояния и меняет своё поведение в зависимости от этого
// состояния
class Context {
  private state: State | undefined;

  constructor(state: State) {
    this.transitionTo(state);
  }

  public transitionTo(state: State): void {
    console.log(`Context: Transition to ${(<any>state).constructor.name}.`);
    this.state = state;
    this.state.setContext(this);
  }

  public request1(): void {
    this.state ? this.state.handle1() : null;
  }

  public request2(): void {
    this.state ? this.state.handle2() : null;
  }
}

// Базовое состояние содержит методы, которые должны присутствовать в каждом
// объекте состояния, а так же ссылку на контекст для того, чтобы
// иметь возможность его изменить
abstract class State {
  protected context: Context | undefined;

  public setContext(context: Context) {
    this.context = context;
  }

  public abstract handle1(): void;

  public abstract handle2(): void;
}

class ConcreteStateA extends State {
  public handle1(): void {
    console.log('ConcreteStateA handles request1.');
    console.log('ConcreteStateA wants to change the state of the context.');
    this.context ? this.context.transitionTo(new ConcreteStateB()) : null;
  }

  public handle2(): void {
    console.log('ConcreteStateA handles request2.');
  }
}

class ConcreteStateB extends State {
  public handle1(): void {
    console.log('ConcreteStateB handles request1.');
  }

  public handle2(): void {
    console.log('ConcreteStateB handles request2.');
    console.log('ConcreteStateB wants to change the state of the context.');
    this.context ? this.context.transitionTo(new ConcreteStateA()) : null;
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const context = new Context(new ConcreteStateA());
context.request1();
context.request2();

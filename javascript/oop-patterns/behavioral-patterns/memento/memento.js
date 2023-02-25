// объект, состояние которого нужно сохранять и восстанавливать
// должен иметь методы для сохранения своего состояния в объект снимка и
// восстановления своего состояния из такого объекта
class Originator {
  state;
  constructor(state) {
    this.state = state;
    console.log(`Источник: Моё изначальное состояние: ${state}`);
  }
  doSomething() {
    console.log('Источник: Делаю что-то важное.');
    this.state = this.generateRandomString(30);
    console.log(`Источник: моё состояние изменилось на: ${this.state}`);
  }

  generateRandomString(length = 10) {
    const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return new Array(length)
      .fill('a')
      .map(() => charSet.charAt(Math.floor(Math.random() * charSet.length)))
      .join('');
  }

  save() {
    return new ConcreteMemento(this.state);
  }

  restore(memento) {
    this.state = memento.getState();
    console.log(`Источник: моё состояние изменилось на: ${this.state}`);
  }
}

class ConcreteMemento {
  state;
  date;

  constructor(state) {
    this.state = state;
    this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  getState() {
    return this.state;
  }

  getName() {
    return `${this.date} / (${this.state.substring(0, 9)}...)`;
  }

  getDate() {
    return this.date;
  }
}

// Смотритель напрямую не зависит от конкретного снимка
// он так же не зависит от конкретного объекта, чьё состояние сохраняется
// его задача - хранить объекты снимков и вызывать соответствующие методы
// других объектов для сохранения и восстановления состояния
class Caretaker {
  mementos = [];

  originator;

  constructor(originator) {
    this.originator = originator;
  }

  backup() {
    console.log('\nСмотритель: Сохраняю состояние источника...');
    this.mementos.push(this.originator.save());
  }

  undo() {
    if (!this.mementos.length) {
      return;
    }
    const memento = this.mementos.pop();

    if (memento) {
      console.log(
        `Смотритель: восстанавливаю состояние источника до: ${memento.getName()}`
      );
      this.originator.restore(memento);
    } else {
      throw new Error(
        'Отсутствуют объекты снимков для восстановления состояния'
      );
    }
  }

  showHistory() {
    console.log('Смотритель: вот весь текущий список объектов-снимков:');
    for (const memento of this.mementos) {
      console.log(memento.getName());
    }
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const originator = new Originator('Изначальное состояние');
const caretaker = new Caretaker(originator);

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

console.log('');
caretaker.showHistory();

console.log('\nКлиент: откатываю состояние\n');
caretaker.undo();

console.log('\nКлиент: откатываю ещё раз\n');
caretaker.undo();

// объект, состояние которого нужно сохранять и восстанавливать
// должен иметь методы для сохранения своего состояния в объект снимка и
// восстановления своего состояния из такого объекта
class Originator {
  private state: string;
  constructor(state: string) {
    this.state = state;
    console.log(`Источник: Моё изначальное состояние: ${state}`);
  }
  public doSomething(): void {
    console.log('Источник: Делаю что-то важное.');
    this.state = this.generateRandomString(30);
    console.log(`Источник: моё состояние изменилось на: ${this.state}`);
  }

  private generateRandomString(length: number = 10): string {
    const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return new Array(length)
      .fill('a')
      .map(() => charSet.charAt(Math.floor(Math.random() * charSet.length)))
      .join('');
  }

  public save(): Memento {
    return new ConcreteMemento(this.state);
  }

  public restore(memento: Memento): void {
    this.state = memento.getState();
    console.log(`Источник: моё состояние изменилось на: ${this.state}`);
  }
}

// Интерфейс снимка должен давать возможность получить данные о состоянии
// обратно
interface Memento {
  getState(): string;

  getName(): string;

  getDate(): string;
}

class ConcreteMemento implements Memento {
  private state: string;
  private date: string;

  constructor(state: string) {
    this.state = state;
    this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  public getState(): string {
    return this.state;
  }

  public getName(): string {
    return `${this.date} / (${this.state.substring(0, 9)}...)`;
  }

  public getDate(): string {
    return this.date;
  }
}

// Смотритель напрямую не зависит от конкретного снимка
// он так же не зависит от конкретного объекта, чьё состояние сохраняется
// его задача - хранить снимки и вызывать соответствующие методы
// других объектов для сохранения и восстановления состояния
class Caretaker {
  private mementos: Memento[] = [];

  private originator: Originator;

  constructor(originator: Originator) {
    this.originator = originator;
  }

  public backup(): void {
    console.log('\nСмотритель: Сохраняю состояние источника...');
    this.mementos.push(this.originator.save());
  }

  public undo(): void {
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

  public showHistory(): void {
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

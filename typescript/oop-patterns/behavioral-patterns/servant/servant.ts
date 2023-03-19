// Слуга предоставляет дополнительную функциональность для обслуживаемых
// объектов, при этом он знает только интерфейс обслуживаемых объектов и
// может вызывать соответствующие методы
class PrintServant {
  // Распечатать информацию об обслуживаемом объекте
  public print(p: Printable) {
    console.log(
      `Меня зовут ${p.getName()}, я ${p.getType()} и мне ${p.getAge()} лет.`
    );
  }
}

// Интерфейс указывает на то, какие методы должны быть определены обслуживаемыми
// классами
interface Printable {
  getName: () => string;
  getAge: () => number;
  getType: () => string;
}

// Конкретные обслуживаемые классы, реализующие интерфейс
class Person implements Printable {
  #name: string;
  #age: number;
  constructor(name: string, age: number) {
    this.#name = name;
    this.#age = age;
  }
  public getName() {
    return this.#name;
  }
  public getAge() {
    return this.#age;
  }
  public getType() {
    return 'Человек';
  }
}

class Dog implements Printable {
  #name: string;
  #age: number;
  constructor(name: string, age: number) {
    this.#name = name;
    this.#age = age;
  }
  public getName() {
    return this.#name;
  }
  public getAge() {
    return this.#age;
  }
  public getType() {
    return 'Собака';
  }
}

class Cat implements Printable {
  #name: string;
  #age: number;
  constructor(name: string, age: number) {
    this.#name = name;
    this.#age = age;
  }
  public getName() {
    return this.#name;
  }
  public getAge() {
    return this.#age;
  }
  public getType() {
    return 'Кот';
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const p = new Person('Марс', 30);
const d = new Dog('Плутон', 6);
const c = new Cat('Юпитер', 8);

const servant = new PrintServant();

servant.print(p);
servant.print(d);
servant.print(c);

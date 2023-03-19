// Слуга предоставляет дополнительную функциональность для обслуживаемых
// объектов
class PrintServant {
  // Распечатать информацию об обслуживаемом объекте
  print(p) {
    console.log(
      `Меня зовут ${p.getName()}, я ${p.getType()} и мне ${p.getAge()} лет.`
    );
  }
}

// Конкретные обслуживаемые классы
class Person {
  #name;
  #age;
  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }
  getName() {
    return this.#name;
  }
  getAge() {
    return this.#age;
  }
  getType() {
    return 'Человек';
  }
}

class Dog {
  #name;
  #age;
  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }
  getName() {
    return this.#name;
  }
  getAge() {
    return this.#age;
  }
  getType() {
    return 'Собака';
  }
}

class Cat {
  #name;
  #age;
  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }
  getName() {
    return this.#name;
  }
  getAge() {
    return this.#age;
  }
  getType() {
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

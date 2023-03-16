const SingletonType = {
  Первый: 1,
  Второй: 2,
  Третий: 3,
};

// Мультитон содержит список ссылок на объекты-одиночки
// разных типов и возвращает ссылку на объект конкретного типа
// в ответ на запрос клиента, либо создаёт объект конкретного
// типа, сохраняет его в своём списке и возвращает ссылку на
// него, если одиночки такого типа ещё нет в списке на
// момент запроса
class Multiton {
  static instances = new Map();

  static getInstance(type) {
    if (!this.instances.has(type)) {
      this.instances.set(type, new Single(type));
    }
    return this.instances.get(type);
  }
}

class Single {
  data;
  constructor(type) {
    this.data = type;
  }
  toString() {
    return `Я одиночка типа ${this.data}`;
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

console.log(Multiton.getInstance(SingletonType.Первый).toString());
console.log(Multiton.getInstance(SingletonType.Второй).toString());
console.log(Multiton.getInstance(SingletonType.Третий).toString());

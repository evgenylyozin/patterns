enum SingletonType {
  Первый = 1,
  Второй,
  Третий,
}

// Мультитон содержит список ссылок на объекты-одиночки
// разных типов и возвращает ссылку на объект конкретного типа
// в ответ на запрос клиента, либо создаёт объект конкретного
// типа, сохраняет его в своём списке и возвращает ссылку на
// него, если одиночки такого типа ещё нет в списке на
// момент запроса
class Multiton {
  private static instances = new Map<SingletonType, Single>();

  public static getInstance(type: SingletonType): Single {
    if (!this.instances.has(type)) {
      this.instances.set(type, new Single(type));
    }
    return this.instances.get(type) as Single;
  }
}

class Single {
  private data: number;
  constructor(type: SingletonType) {
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

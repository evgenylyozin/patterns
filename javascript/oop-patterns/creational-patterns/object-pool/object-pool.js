// Класс, представляющий какой-либо объект, который будет
// храниться внутри пула объектов
class SomeObject {
  order;
  constructor(order) {
    this.order = order;
  }
  toString() {
    return `Я объект из пула, мой порядковый номер ${this.order}.`;
  }
}

// Пул объектов, в частности содержит внутри себя массив,
// содержащий записи о хранимых ссылках на объекты
class ObjectPool {
  static pool = [];
  static retrieve() {
    let order = 1;
    for (let record of this.pool) {
      order++;
      if (!record.inUse) {
        record.inUse = true;
        return record.instance;
      }
    }
    // Если неиспользуемых объектов не
    // обнаружено - создать новый
    const newObj = new SomeObject(order);
    this.pool.push({ instance: newObj, inUse: true });
    return newObj;
  }

  // Отметить объект как не используемый и
  // доступный к использованию другими частями
  // кода
  static release(obj) {
    for (let record of this.pool) {
      if (record.instance === obj) {
        record.inUse = false;
      }
    }
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const obj1 = ObjectPool.retrieve();
console.log(obj1.toString());
const obj2 = ObjectPool.retrieve();
console.log(obj2.toString());
const obj3 = ObjectPool.retrieve();
console.log(obj3.toString());

ObjectPool.release(obj1);
const obj4 = ObjectPool.retrieve();
console.log(obj4.toString());

ObjectPool.release(obj2);
const obj5 = ObjectPool.retrieve();
console.log(obj5.toString());

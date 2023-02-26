// Приспособленец хранит в себе общее для других объектов состояние, а так же
// обрабатывает уникальное состояние. При условии, что есть объект-приспособленец с
// требуемым общим состоянием - мы работаем с ним, а не создаём новый объект.
class Flyweight {
  private sharedState: any;

  constructor(sharedState: any) {
    this.sharedState = sharedState;
  }

  public operation(uniqueState: any): void {
    const s = JSON.stringify(this.sharedState);
    const u = JSON.stringify(uniqueState);
    console.log(
      `Приспособленец: Отображаю общее (${s}) и уникальное (${u}) состояние.`
    );
  }
}

// Фабрика приспособленцев создаёт и управляет ими, когда
// клиент запрашивает очередной объект - фабрика либо возвращает
// подходящий, либо возвращает новый
class FlyweightFactory {
  private flyweights: { [key: string]: Flyweight } = <any>{};

  constructor(initialFlyweights: string[][]) {
    for (const state of initialFlyweights) {
      this.flyweights[this.getKey(state)] = new Flyweight(state);
    }
  }

  private getKey(state: string[]): string {
    return state.join('_');
  }

  public getFlyweight(sharedState: string[]): Flyweight {
    const key = this.getKey(sharedState);

    if (!(key in this.flyweights)) {
      console.log(
        `Фабрика приспособленцев: Не могу найти подходящего 
приспособленца, создаю нового.`
      );
      this.flyweights[key] = new Flyweight(sharedState);
    } else {
      console.log(
        'Фабрика приспособленцев: возвращаю существующего приспособленца.'
      );
    }

    return this.flyweights[key];
  }

  public listFlyweights(): void {
    const count = Object.keys(this.flyweights).length;
    console.log(
      `\nФабрика приспособленцев: В наличии ${count} приспособленцев:`
    );
    for (const key in this.flyweights) {
      console.log(key);
    }
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const factory = new FlyweightFactory([
  ['Chevrolet', 'Camaro2018', 'розовый'],
  ['Mercedes Benz', 'C300', 'черный'],
  ['Mercedes Benz', 'C500', 'красный'],
  ['BMW', 'M5', 'красный'],
  ['BMW', 'X6', 'белый'],
]);
factory.listFlyweights();

// В данном случае в качестве контекста выступает функция addCarToPoliceDatabase
// именно здесь происходит приём уникального состояния, получение соответствующего
// объекта-приспособленца и вызов его метода с уникальным состоянием
// всё это можно оформить в виде отдельного класса/объекта
function addCarToPoliceDatabase(
  ff: FlyweightFactory,
  plates: string,
  owner: string,
  brand: string,
  model: string,
  color: string
) {
  console.log('\nКлиент: Добавляю машину в БД.');
  const flyweight = ff.getFlyweight([brand, model, color]);
  flyweight.operation([plates, owner]);
}

addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'M5', 'красный');
addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'X1', 'красный');

factory.listFlyweights();

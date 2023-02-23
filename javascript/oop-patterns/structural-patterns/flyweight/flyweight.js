// Приспособленец хранит в себе общее для других объектов состояние, а так же
// обрабатывает уникальное состояние. При условии, что есть объект-приспособленец с
// требуемым общим состоянием - мы работаем с ним, а не создаём новый объект.
class Flyweight {
  sharedState;

  constructor(sharedState) {
    this.sharedState = sharedState;
  }

  operation(uniqueState) {
    const s = JSON.stringify(this.sharedState);
    const u = JSON.stringify(uniqueState);
    console.log(`Flyweight: Displaying shared (${s}) and unique (${u}) state.`);
  }
}

// Фабрика приспособленцев создаёт и управляет ими, когда
// клиент запрашивает очередной объект - фабрика либо возвращает
// подходящий, либо возвращает новый
class FlyweightFactory {
  flyweights = {};

  constructor(initialFlyweights) {
    for (const state of initialFlyweights) {
      this.flyweights[this.getKey(state)] = new Flyweight(state);
    }
  }

  getKey(state) {
    return state.join('_');
  }

  getFlyweight(sharedState) {
    const key = this.getKey(sharedState);

    if (!(key in this.flyweights)) {
      console.log(
        "FlyweightFactory: Can't find a flyweight, creating new one."
      );
      this.flyweights[key] = new Flyweight(sharedState);
    } else {
      console.log('FlyweightFactory: Reusing existing flyweight.');
    }

    return this.flyweights[key];
  }

  listFlyweights() {
    const count = Object.keys(this.flyweights).length;
    console.log(`\nFlyweightFactory: I have ${count} flyweights:`);
    for (const key in this.flyweights) {
      console.log(key);
    }
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const factory = new FlyweightFactory([
  ['Chevrolet', 'Camaro2018', 'pink'],
  ['Mercedes Benz', 'C300', 'black'],
  ['Mercedes Benz', 'C500', 'red'],
  ['BMW', 'M5', 'red'],
  ['BMW', 'X6', 'white'],
]);
factory.listFlyweights();

// В данном случае в качестве контекста выступает функция addCarToPoliceDatabase
// именно здесь происходит приём уникального состояния, получение соответствующего
// объекта-приспособленца и вызов его метода с уникальным состоянием
// всё это можно оформить в виде отдельного класса/объекта
function addCarToPoliceDatabase(ff, plates, owner, brand, model, color) {
  console.log('\nClient: Adding a car to database.');
  const flyweight = ff.getFlyweight([brand, model, color]);
  flyweight.operation([plates, owner]);
}

addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'M5', 'red');
addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'X1', 'red');

factory.listFlyweights();

// базовый класс, который содержит логику назначения следующего обработчика и
// базовую логику обработки
class AbstractHandler {
  nextHandler;

  setNext(handler) {
    this.nextHandler = handler;
    return handler;
  }

  handle(request) {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

// Конкретные обработчики либо обрабатывают запрос сами, либо передают его дальше
// по цепочке обработчиков
class MonkeyHandler extends AbstractHandler {
  handle(request) {
    if (request === 'Банан') {
      return `Обезьяна: Я съем ${request}.`;
    }
    return super.handle(request);
  }
}

class SquirrelHandler extends AbstractHandler {
  handle(request) {
    if (request === 'Орех') {
      return `Белка: Я съем ${request}.`;
    }
    return super.handle(request);
  }
}

class DogHandler extends AbstractHandler {
  handle(request) {
    if (request === 'Мясо') {
      return `Собака: Я съем ${request}.`;
    }
    return super.handle(request);
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();

monkey.setNext(squirrel).setNext(dog);

const handler = monkey;

const foods = ['Орех', 'Банан', 'Кофе'];

for (const food of foods) {
  console.log(`Клиент: Кто хочет ${food}?`);
  const result = handler.handle(food);
  if (result) {
    console.log(`  ${result}`);
  } else {
    console.log(`  ${food} никто не захотел.`);
  }
}

// интерфейс для определения методов назначения следующего обработчика
// и непосредственно обработки запроса
interface Handler {
  setNext(handler: Handler): Handler;

  handle(request: string): string | null;
}

// базовый класс, который содержит логику назначения следующего обработчика и
// базовую логику обработки
abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | undefined;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: string): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

// Конкретные обработчики либо обрабатывают запрос сами, либо передают его дальше
// по цепочке обработчиков
class MonkeyHandler extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'Банан') {
      return `Обезьяна: Я съем ${request}.`;
    }
    return super.handle(request);
  }
}

class SquirrelHandler extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'Орех') {
      return `Белка: Я съем ${request}.`;
    }
    return super.handle(request);
  }
}

class DogHandler extends AbstractHandler {
  public handle(request: string): string | null {
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

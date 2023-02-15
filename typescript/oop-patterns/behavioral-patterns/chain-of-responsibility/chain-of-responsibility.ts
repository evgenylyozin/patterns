//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// CHAIN OF RESPONSIBILITY (ЦЕПОЧКА ОБЯЗАННОСТЕЙ)
// ЦЕЛЬ: создать систему из нескольких обработчиков запроса, каждый из которых
// может либо обработать запрос, либо передать его следующему

// интерфейс для определения методов назначения следующего обработчика
// и непосредственно обработки запроса
interface Handler {
  setNext(handler: Handler): Handler;

  handle(request: string): string | null;
}

// базовый класс, который содержит логику назначения следующего хендлера и
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
    if (request === 'Banana') {
      return `Monkey: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

class SquirrelHandler extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'Nut') {
      return `Squirrel: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

class DogHandler extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'MeatBall') {
      return `Dog: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

// const monkey = new MonkeyHandler();
// const squirrel = new SquirrelHandler();
// const dog = new DogHandler();

// monkey.setNext(squirrel).setNext(dog);

// const handler = monkey;

// const foods = ['Nut', 'Banana', 'Cup of coffee'];

// for (const food of foods) {
//   console.log(`Client: Who wants a ${food}?`);

//   const result = handler.handle(food);
//   if (result) {
//     console.log(`  ${result}`);
//   } else {
//     console.log(`  ${food} was left untouched.`);
//   }
// }

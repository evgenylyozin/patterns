// CREATIONAL DESIGN PATTERNS
// Patterns for handling objects creation

// --note--
// Эти классические паттерны создания объектов были исключены:
// 1. Constructor
// reason of exclusion: since ES6 just use class syntax
// 2. Abstract factory
// reason of exclusion: lack of interfaces and type functionality in JS
//------------------------------------------------------------------------------
// FACTORY
// Aim: to hide objects creation details

// Functional approach
class BlackCat {
  constructor() {
    this.color = 'black';
  }
}

class WhiteCat {
  constructor() {
    this.color = 'white';
  }
}

const CatFactoryFunc = (type) => {
  switch (type) {
    case 'black':
      return new BlackCat();
    case 'white':
      return new WhiteCat();
    default:
      throw new Error('unknown type of a cat');
  }
};

// const blackCat = CatFactoryFunc('black');
// console.log(blackCat.color);
// const whiteCat = CatFactoryFunc('white');
// console.log(whiteCat.color);

// Class based approach
class CatFactory {
  constructor() {
    this.createACat = (type) => {
      switch (type) {
        case 'black':
          return new BlackCat();
        case 'white':
          return new WhiteCat();
        default:
          throw new Error('unknown type of a cat');
      }
    };
  }
}

// const catFactory = new CatFactory();

// const blackCat = catFactory.createACat('black');
// console.log(blackCat.color);
// const whiteCat = catFactory.createACat('white');
// console.log(whiteCat.color);
// try {
//   const unknownCat = catFactory.createACat('???');
//   console.log(unknownCat.color);
// } catch (e) {
//   console.log(e.message);
// }
//------------------------------------------------------------------------------
// PROTOTYPE (ПРОТОТИП)
// ЦЕЛЬ: создать схему объекта и посредством её копирования (клонирования)
// получать новые схожие объекты

const someObj = {
  a: 'b',
  c: 'd',
};

// назначение прототипа конкретному объекту в JS рекомендуется делать при помощи
// Object.create
const otherObj = Object.create(someObj, { e: { value: 'f' } });

// console.log(otherObj.a);
// console.log(otherObj.c);
// console.log(otherObj.e);
// console.log(otherObj.__proto__ === someObj);
//------------------------------------------------------------------------------
// SINGLETON (СИНГЛТОН)
// ЦЕЛЬ: создать только 1 объект определённого типа. А в случае повторного
// запроса на получение такого объекта отдавать ссылку на уже созданный.
// ВАРИАНТ ИСПОЛЬЗОВАНИЯ: объект для работы с БД
// -- Уточнение --
// Начиная с ES6 можно создать нужный объект в отдельном модуле и экспортировать
// его, в таком случае не будет необходимости оформлять IIFE

// Пример с IIFE
const Singleton = (() => {
  let instance = null;
  const createInstance = () => {
    return { name: 'DB object' };
  };
  return {
    instantiate: () => {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

// const firstInstance = Singleton.instantiate();
// const secondInstance = Singleton.instantiate();

// console.log(firstInstance.name);
// console.log(secondInstance.name);
// console.log(firstInstance === secondInstance);

// firstInstance.name = 'UPDATED DB object';

// console.log(firstInstance.name);
// console.log(secondInstance.name);
// console.log(firstInstance === secondInstance);
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// BUILDER (СТРОИТЕЛЬ)
// ЦЕЛЬ: организовать систему для пошагового создания сложных настраиваемых
// объектов или разгрузить сложный конструктор, или упростить систему классов и
// субклассов

// Конкретный билдер имеет набор методов для поэтапного строительства конкретного
// объекта
class ConcreteBuilder1 {
  // изначально пустой объект продукта
  product;

  constructor() {
    this.reset();
  }

  reset() {
    this.product = new Product1();
  }

  producePartA() {
    this.product.parts.push('PartA1');
  }

  producePartB() {
    this.product.parts.push('PartB1');
  }

  producePartC() {
    this.product.parts.push('PartC1');
  }

  // Каждый билдер должен иметь метод для возврата созданного продукта
  // После возврата продукта (объекта) обычно происходит сброс ссылки
  // на созданный объект в билдере для подготовки к созданию нового объекта
  getProduct() {
    const result = this.product;
    this.reset();
    return result;
  }
}

// Конкретный продукт изначально представляет из себя стандартный пустой объект,
// который будет наполнен содержимым через вызов методов конкретного билдера
class Product1 {
  parts = [];

  listParts() {
    console.log(`Product parts: ${this.parts.join(', ')}\n`);
  }
}

// Необязательная, но удобная часть паттерна - Директор, в его обязанности
// входит регистрация конкретного билдера и выполнение через него
// шагов по построению нужного объекта в определённой последовательности
class Director {
  builder;

  // Директор должен ументь работать с любым билдером, соответствующим определёному
  // интерфейсу
  setBuilder(builder) {
    this.builder = builder;
  }

  // Директор включает в себя методы, которые клиентский код может использовать
  // для создания объектов. Методы вызывают соответствующие шаги билдера
  // по созданию объекта
  buildMinimalViableProduct() {
    this.builder.producePartA();
  }

  buildFullFeaturedProduct() {
    this.builder.producePartA();
    this.builder.producePartB();
    this.builder.producePartC();
  }
}

// const director = new Director();

// const builder = new ConcreteBuilder1();
// director.setBuilder(builder);

// console.log('Standard basic product:');
// director.buildMinimalViableProduct();
// builder.getProduct().listParts();

// console.log('Standard full featured product:');
// director.buildFullFeaturedProduct();
// builder.getProduct().listParts();

// // Билдер можно использовать и без директора
// console.log('Custom product:');
// builder.producePartA();
// builder.producePartC();
// builder.getProduct().listParts();

//------------------------------------------------------------------------------

// STRUCTURAL DESIGN PATTERNS
// To organize relationships between objects

// --заметки--
// Эти классические паттерны структурирования были исключены:
//
// BRIDGE (МОСТ)
// причина: паттерн можно реализовать в JS, однако из-за сложных связей объектов
// в результирующем коде, без применения интерфейсов и хорошей типизации есть
// большая вероятность наделать ошибок в процессе поддержки, расширения и
// обновления кода. Для реализации лучше использовать TS (см пример на Typescript)
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// ADAPTER (АДАПТЕР)
// ЦЕЛЬ: создать промежуточное звено между двумя объектами, интерфейсы
// которых не сопоставимы, но которым нужно взаимодействовать между собой

// Существует какой-либо объект или класс, который активно используется в коде
// или клиентом
class OldButUsefulLogger {
  log(anything) {
    console.log(
      `Тип переданных для логирования данных: ${typeof anything}, данные: ${anything}`
    );
  }
}

// Появляется новый класс, который мы начинаем активно использовать в коде для
// логирования, т.к. он поддерживает больше методов и может использовать любые
// логгеры с определённым интерфейсом под капотом
class BrandNewLogger {
  constructor(logger) {
    this.logger = logger;
  }
  checkTheTypeOfData = (data) => {
    return typeof data;
  };
  log = (data) => {
    switch (this.checkTheTypeOfData(data)) {
      case 'string':
        this.logger.printString(data);
        break;
      case 'number':
        this.logger.printNumber(data);
        break;
      default:
        this.logger.printAny(data);
    }
  };
}

// Проблема в том, что мы хотели бы продолжать использовать старый логгер,
// но его интерфейс не соответствует новым требованиям
// в таком случае можно создать адаптер и передавать его в качестве логгера
class AdapterForGoodOldLogger {
  constructor() {
    this.logger = new OldButUsefulLogger();
  }
  printString = (data) => {
    this.logger.log(data);
  };
  printNumber = (data) => {
    this.logger.log(data);
  };
  printAny = (data) => {
    this.logger.log(data);
  };
}

// Старый код выглядит так:
//
// const logger = new OldButUsefulLogger();
// logger.log('Привет, я строка');
// logger.log(42);
// logger.log([1, 2, 3, 4, 5]);
//
// В новом коде нужно заменить только создание логгера, остальной код трогать не нужно
// и теперь можно использовать любой логгер с соответствующим интерфейсом,
// в том числе и старый:
//
// const logger = new BrandNewLogger(new AdapterForGoodOldLogger());
// logger.log('Привет, я строка');
// logger.log(42);
// logger.log([1, 2, 3, 4, 5]);

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// Composite (КОМПОНОВЩИК)
// ЦЕЛЬ: создать удобную структуру из объектов в виде дерева
// ПРИМЕНЕНИЕ: система компонентов в современных фронтенд фреймворках,
// html дерево и т.п.

// Есть группа определённых связанных классов/объектов, связи между
// которыми удобно оформить в виде дерева, например File и Folder, где
// Folder может содержать несколько файлов и папок, а так же содержит
// метаданные, а File содержит только метаданные
class SomeFile {
  // класс File назван SomeFile т.к. WebAPI в JS уже имеет встроенный класс File
  constructor(name) {
    this.name = name;
  }
}

class Folder {
  files = [];
  folders = [];
  constructor(name) {
    this.name = name;
  }
  addFolder = (folder) => {
    this.folders.push(folder);
  };
  addFile = (file) => {
    this.files.push(file);
  };
  printDataInside = () => {
    console.log(`\nПапка с названием ${this.name} содержит файлы:`);
    if (this.files.length === 0) {
      console.log('ФАЙЛЫ ОТСУТСТВУЮТ');
    } else {
      for (let file of this.files) {
        console.log(`${file.name}`);
      }
    }
    console.log(`\nИ папки:`);
    if (this.folders.length === 0) {
      console.log('ПАПКИ ОТСУТСТВУЮТ');
    } else {
      for (let folder of this.folders) {
        console.log(`${folder.name}`);
      }
    }
  };
  static RecursivePrint = (folder) => {
    folder.printDataInside();
    const subFolders = folder.folders;
    if (subFolders) {
      for (let folder of subFolders) {
        this.RecursivePrint(folder);
      }
    }
  };
}

// const file1 = new SomeFile('file1.jpg');
// const file2 = new SomeFile('file2.png');
// const file3 = new SomeFile('file3.txt');
// const file4 = new SomeFile('file4.js');
// const file5 = new SomeFile('file5.ts');
// const file6 = new SomeFile('file6.go');
// const file7 = new SomeFile('file7.ogg');
// const file8 = new SomeFile('file8.doc');
// const file9 = new SomeFile('file9.css');
// const file10 = new SomeFile('file10.yml');

// const folder1 = new Folder('folder1');
// const folder2 = new Folder('folder2');
// const folder3 = new Folder('folder3');
// const folder4 = new Folder('folder4');
// const folder5 = new Folder('folder5');

// folder1.addFolder(folder2);
// folder1.addFolder(folder3);
// folder1.addFile(file1);
// folder1.addFile(file2);
// folder1.addFile(file3);
// folder2.addFolder(folder4);
// folder2.addFile(file4);
// folder3.addFile(file5);
// folder3.addFile(file6);
// folder3.addFile(file7);
// folder4.addFolder(folder5);
// folder5.addFile(file8);
// folder5.addFile(file9);
// folder5.addFile(file10);

// Folder.RecursivePrint(folder1);

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// Decorator (ДЕКОРАТОР)
// ЦЕЛЬ: расширить функционал конкретного объекта, не меняя при этом логики
// класса (схемы), из которого был создан объект
// УТОЧНЕНИЕ: паттерн лучше применять в рамках TS в связи с необходимостью
// для декораторов следовать интерфейсу декарируемого объекта

// Конкретный класс со стандартной имплементацией операций
class Decorated {
  log(data) {
    console.log(data);
  }
}

// Базовый декоратор должен следовать интерфейсу оборачиваемого объекта
class Decorator {
  constructor(decorated) {
    this.decorated = decorated;
  }
  log(data) {
    this.decorated.log(data);
  }
}

// Конкретные декораторы следуют интерфейсу оборачиваемого объекта и
// манипулируют данными, передаваемыми в него или получаемыми от него
class ConcreteDecoratorA extends Decorator {
  log(data) {
    data = `Декоратор А преобразовал данные, строка до преобразования:\n${data}`;
    super.log(data);
  }
}

class ConcreteDecoratorB extends Decorator {
  log(data) {
    data = `Декоратор B преобразовал данные, строка до преобразования:\n${data}`;
    super.log(data);
  }
}

// const decorated = new Decorated();
// const decoratorA = new ConcreteDecoratorA(decorated);
// const decoratorB = new ConcreteDecoratorB(decoratorA);

// decorated.log('Привет!');
// decoratorA.log('Привет!');
// decoratorB.log('Привет!');

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// FACADE (ФАСАД)
// ЦЕЛЬ: создать упрощенный интерфейс для использования библиотеки, фреймворка,
// или любого другого сложного модуля/группы классов

// Фасад предлагает простой интерфейс для клиента, при этом скрывая внутри себя
// взаимодействия с одной или несколькими подсистемами. Запрос клиента
// передаётся соответствующим объектам подсистем, при этом происходит инициализация
// нужных объектов, вызов их методов в правильной последовательности и т.п.
// Фасад защищает клиентский код от всех этих сложностей.
// Фасад может предлагать ограниченный функционал по сравнению с реальной
// подсистемой, то есть вызывать исключительно те методы подсистемы,
// которые необходимы клиентскому коду.
class Facade {
  subsystem1;
  subsystem2;
  constructor(subsystem1 = new Subsystem1(), subsystem2 = new Subsystem2()) {
    this.subsystem1 = subsystem1;
    this.subsystem2 = subsystem2;
  }

  operation() {
    let result = 'Facade initializes subsystems:\n';
    result += this.subsystem1.operation1();
    result += this.subsystem2.operation1();
    result += 'Facade orders subsystems to perform the action:\n';
    result += this.subsystem1.operationN();
    result += this.subsystem2.operationZ();
    return result;
  }
}

// Конкретная подсистема может принимать запросы непосредственно от клиента
// или через фасад, но в последнем случае фасад является клиентом подсистемы
// и в саму подсистему не входит
class Subsystem1 {
  operation1() {
    return 'Subsystem1: Ready!\n';
  }
  operationN() {
    return 'Subsystem1: Go!\n';
  }
}

class Subsystem2 {
  operation1() {
    return 'Subsystem2: Get ready!\n';
  }
  operationZ() {
    return 'Subsystem2: Fire!';
  }
}

// const subsystem1 = new Subsystem1();
// const subsystem2 = new Subsystem2();
// const facade = new Facade(subsystem1, subsystem2);
// console.log(facade.operation());

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// FLYWEIGHT (ПРИСПОСОБЛЕНЕЦ)
// ЦЕЛЬ: уменьшить количество оперативной памяти, выделяемое на работу с
// объектами в системе
// УТОЧНЕНИЕ: если в текущем виде программа не расходует большое количество
// оперативной памяти - нет смысла применять этот паттерн

// Flyweight объект хранит в себе общее для других объектов состояние, а так же
// обрабатывает уникальное состояние. При условии, что есть объект Flyweight с
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

// Фабрика Flyweight объектов создаёт и управляет flyweight объектами, когда
// клиент запрашивает очередной flyweight объект - фабрика либо возвращает
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

// const factory = new FlyweightFactory([
//   ['Chevrolet', 'Camaro2018', 'pink'],
//   ['Mercedes Benz', 'C300', 'black'],
//   ['Mercedes Benz', 'C500', 'red'],
//   ['BMW', 'M5', 'red'],
//   ['BMW', 'X6', 'white'],
// ]);
// factory.listFlyweights();

// function addCarToPoliceDatabase(ff, plates, owner, brand, model, color) {
//   console.log('\nClient: Adding a car to database.');
//   const flyweight = ff.getFlyweight([brand, model, color]);
//   flyweight.operation([plates, owner]);
// }

// addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'M5', 'red');
// addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'X1', 'red');

// factory.listFlyweights();

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// PROXY (ПРОКСИ)
// ЦЕЛЬ: контролировать входящие и/или исходящие из проксируемого объекта
// данные
// ВАРИАНТЫ ИСПОЛЬЗОВАНИЯ: проверка прав доступа, кеширование, очистка ввода,
// логирование, статистика и т.д.

// Реальный проксируемый объект, содержит бизнес логику, но может быть слишком
// тяжеловесным, чтобы использовать его для каждого запроса, либо может
// быть слабо защищён и т.п.
class RealSubject {
  request() {
    console.log('RealSubject: Handling request.');
  }
}

// Прокси имеет тот же интерфейс, что и проксируемый объект
class ProxyObj {
  realSubject;

  constructor(realSubject) {
    this.realSubject = realSubject;
  }

  request() {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  checkAccess() {
    console.log('Proxy: Checking access prior to firing a real request.');
    return true;
  }

  logAccess() {
    console.log('Proxy: Logging the time of request.');
  }
}

// const proxy = new ProxyObj(new RealSubject());
// proxy.request();

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//
// BEHAVIORAL DESIGN PATTERNS
// To handle communication between heterogeneous objects

// --note--
//
// --todo--
// - Observer
// - State
// - Strategy
// - Template Method
// - Visitor
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// CHAIN OF RESPONSIBILITY (ЦЕПОЧКА ОБЯЗАННОСТЕЙ)
// ЦЕЛЬ: создать систему из нескольких обработчиков запроса, каждый из которых
// может либо обработать запрос, либо передать его следующему

// базовый класс, который содержит логику назначения следующего хендлера и
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
    if (request === 'Banana') {
      return `Monkey: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

class SquirrelHandler extends AbstractHandler {
  handle(request) {
    if (request === 'Nut') {
      return `Squirrel: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

class DogHandler extends AbstractHandler {
  handle(request) {
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

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// COMMAND (КОМАНДА)
// ЦЕЛЬ: превратить запросы на выполнение определённых действий в объекты,
// которые можно будет использовать для вызова определёных методов (выполнения
// команд), тем самым отделив логику GUI от бизнес логики

// в самом простом варианте объект команды может самостоятельно выполнить
// действия для обработки запроса
class SimpleCommand {
  payload;

  constructor(payload) {
    this.payload = payload;
  }

  execute() {
    console.log(
      `SimpleCommand: See, I can do simple things like printing (${this.payload})`
    );
  }
}

// Более сложные операции выполняются командами за счёт делегирования задач
// другим объектам бизнес логики (Ресиверам)
class ComplexCommand {
  receiver;
  a;
  b;

  // Сложные команды получают один или несколько ресиверов и необходимые
  // данные через конструктор
  constructor(receiver, a, b) {
    this.receiver = receiver;
    this.a = a;
    this.b = b;
  }

  execute() {
    console.log(
      'ComplexCommand: Complex stuff should be done by a receiver object.'
    );
    this.receiver.doSomething(this.a);
    this.receiver.doSomethingElse(this.b);
  }
}

// Ресивер - непосредственный исполнитель сложных бизнес задач (любой объект,
// который знает как обработать запрос)
class Receiver {
  doSomething(a) {
    console.log(`Receiver: Working on (${a}.)`);
  }

  doSomethingElse(b) {
    console.log(`Receiver: Also working on (${b}.)`);
  }
}

// Инвокер - объект, который содержит в себе ссылки на команды
// клиент работает с этим объектом, вызывая его методы и регистрируя
// необходимые команды и ресиверы
class Invoker {
  onStart;

  onFinish;

  setOnStart(command) {
    this.onStart = command;
  }

  setOnFinish(command) {
    this.onFinish = command;
  }

  doSomethingImportant() {
    console.log('Invoker: Does anybody want something done before I begin?');
    if (this.isCommand(this.onStart)) {
      this.onStart.execute();
    }

    console.log('Invoker: ...doing something really important...');

    console.log('Invoker: Does anybody want something done after I finish?');
    if (this.isCommand(this.onFinish)) {
      this.onFinish.execute();
    }
  }

  isCommand(object) {
    return object.execute !== undefined;
  }
}

// const invoker = new Invoker();
// invoker.setOnStart(new SimpleCommand('Say Hi!'));
// const receiver = new Receiver();
// invoker.setOnFinish(new ComplexCommand(receiver, 'Send email', 'Save report'));

// invoker.doSomethingImportant();

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// ITERATOR (ИТЕРАТОР)
// ЦЕЛЬ: создать отдельный от коллекции объект, цель которого - перебор
// коллекции. Таким образом, объект, отвечающий за хранение и организацию
// данных не будет разрастаться и будет выполнять только свою основную
// функцию.

// Конкретный итератор содержит логику прохода по коллекции
class StringsArrayIterator {
  collection;
  position = 0;
  reverse = false;

  constructor(collection, reverse = false) {
    this.collection = collection;
    this.reverse = reverse;

    if (reverse) {
      this.position = collection.getCount() - 1;
    }
  }

  rewind() {
    this.position = this.reverse ? this.collection.getCount() - 1 : 0;
  }

  current() {
    return this.collection.getItems()[this.position];
  }

  key() {
    return this.position;
  }

  next() {
    const item = this.collection.getItems()[this.position];
    this.position += this.reverse ? -1 : 1;
    return item;
  }

  valid() {
    if (this.reverse) {
      return this.position >= 0;
    }

    return this.position < this.collection.getCount();
  }
}

// Конкретная коллекция предоставляет один или несколько методов для
// возвращения сопоставимого с коллекцией итератора
class WordsCollection {
  items = [];

  getItems() {
    return this.items;
  }

  getCount() {
    return this.items.length;
  }

  addItem(item) {
    this.items.push(item);
  }

  getIterator() {
    return new StringsArrayIterator(this);
  }

  getReverseIterator() {
    return new StringsArrayIterator(this, true);
  }
}

// const collection = new WordsCollection();
// collection.addItem('First');
// collection.addItem('Second');
// collection.addItem('Third');

// const iterator = collection.getIterator();

// console.log('Straight traversal:');
// while (iterator.valid()) {
//   console.log(iterator.next());
// }

// console.log('');
// console.log('Reverse traversal:');
// const reverseIterator = collection.getReverseIterator();
// while (reverseIterator.valid()) {
//   console.log(reverseIterator.next());
// }

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// MEDIATOR (МЕДИАТОР)
// ЦЕЛЬ: избавиться от хаотичных зависимостей между объектами, создав
// объект - медиатор и перенаправив все запросы между объектами через него

// Конкретный медиатор включает в себя логику координации между различными
// объектами
class ConcreteMediator {
  component1;
  component2;

  constructor(c1, c2) {
    this.component1 = c1;
    this.component1.setMediator(this);
    this.component2 = c2;
    this.component2.setMediator(this);
  }
  // Метод notify на медиаторе принимает события и вызывает методы на
  // нужных объектах в соответствии с ними
  notify(sender, event) {
    if (event === 'A') {
      console.log('Mediator reacts on A and triggers following operations:');
      this.component2.doC();
    }

    if (event === 'D') {
      console.log('Mediator reacts on D and triggers following operations:');
      this.component1.doB();
      this.component2.doC();
    }
  }
}

// Все остальные объекты должны хранить ссылку на медиатора, чтобы вызывать
// его метод notify
class BaseComponent {
  mediator;

  constructor(mediator = null) {
    mediator ? (this.mediator = mediator) : undefined;
  }

  setMediator(mediator) {
    this.mediator = mediator;
  }
}

// Конкретные объекты содержат бизнес логику и не зависят ни от других компонентов
// ни от конкретного медиатора (т.к. они сохраняют в себе ссылку на любого
// конкретного медиатора)
class Component1 extends BaseComponent {
  doA() {
    console.log('Component 1 does A.');
    this.mediator.notify(this, 'A');
  }

  doB() {
    console.log('Component 1 does B.');
    this.mediator.notify(this, 'B');
  }
}

class Component2 extends BaseComponent {
  doC() {
    console.log('Component 2 does C.');
    this.mediator.notify(this, 'C');
  }

  doD() {
    console.log('Component 2 does D.');
    this.mediator.notify(this, 'D');
  }
}

// const c1 = new Component1();
// const c2 = new Component2();
// const mediator = new ConcreteMediator(c1, c2);

// console.log('Client triggers operation A.');
// c1.doA();

// console.log('');
// console.log('Client triggers operation D.');
// c2.doD();

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// MEMENTO (СНИМОК)
// ЦЕЛЬ: получить созможность восстанавливать предыдущее состояние объекта

// объект, состояние которого нужно сохранять и восстанавливать
// должен иметь методы для сохранения своего состояния в объект снимка и
// восстановления своего состояния из такого объекта
class Originator {
  state;
  constructor(state) {
    this.state = state;
    console.log(`Originator: My initial state is: ${state}`);
  }
  doSomething() {
    console.log("Originator: I'm doing something important.");
    this.state = this.generateRandomString(30);
    console.log(`Originator: and my state has changed to: ${this.state}`);
  }

  generateRandomString(length = 10) {
    const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return new Array(length)
      .fill('a')
      .map(() => charSet.charAt(Math.floor(Math.random() * charSet.length)))
      .join('');
  }

  save() {
    return new ConcreteMemento(this.state);
  }

  restore(memento) {
    this.state = memento.getState();
    console.log(`Originator: My state has changed to: ${this.state}`);
  }
}

class ConcreteMemento {
  state;
  date;

  constructor(state) {
    this.state = state;
    this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  getState() {
    return this.state;
  }

  getName() {
    return `${this.date} / (${this.state.substring(0, 9)}...)`;
  }

  getDate() {
    return this.date;
  }
}

// Объект класса Caretaker напрямую не зависит от конкретного мементо объекта
// он так же не зависит от конкретного объекта, чьё состояние сохраняется
// его задача - хранить объекты мементов и вызывать соответствующие методы
// других объектов для сохранения и восстановления состояния
class Caretaker {
  mementos = [];

  originator;

  constructor(originator) {
    this.originator = originator;
  }

  backup() {
    console.log("\nCaretaker: Saving Originator's state...");
    this.mementos.push(this.originator.save());
  }

  undo() {
    if (!this.mementos.length) {
      return;
    }
    const memento = this.mementos.pop();

    if (memento) {
      console.log(`Caretaker: Restoring state to: ${memento.getName()}`);
      this.originator.restore(memento);
    } else {
      throw new Error(
        'Отсутствуют объекты мементо для восстановления состояния'
      );
    }
  }

  showHistory() {
    console.log("Caretaker: Here's the list of mementos:");
    for (const memento of this.mementos) {
      console.log(memento.getName());
    }
  }
}

// const originator = new Originator('Super-duper-super-puper-super.');
// const caretaker = new Caretaker(originator);

// caretaker.backup();
// originator.doSomething();

// caretaker.backup();
// originator.doSomething();

// caretaker.backup();
// originator.doSomething();

// console.log('');
// caretaker.showHistory();

// console.log("\nClient: Now, let's rollback!\n");
// caretaker.undo();

// console.log('\nClient: Once more!\n');
// caretaker.undo();

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// OBSERVER (НАБЛЮДАТЕЛЬ)
// ЦЕЛЬ: организовать систему оповещений о событиях, происходящих с каким-либо
// объектом
class ConcreteObserver1 {
  notify(evt) {
    console.log('Первый конкретный наблюдатель получил уведомление:', evt);
  }
  getName() {
    return 'ConcreteObserver1';
  }
}

class ConcreteObserver2 {
  notify(evt) {
    console.log('Второй конкретный наблюдатель получил уведомление:', evt);
  }
  getName() {
    return 'ConcreteObserver2';
  }
}

class ConcreteObserver3 {
  notify(evt) {
    console.log('Третий конкретный наблюдатель получил уведомление:', evt);
  }
  getName() {
    return 'ConcreteObserver3';
  }
}

class ConcretePublisher {
  observers = [];
  notifyAll(evt) {
    for (let observer of this.observers) {
      observer.notify(evt);
    }
  }
  subscribe(obs) {
    this.observers.push(obs);
    return this;
  }

  unsubscribe(obs) {
    const idx = this.observers.findIndex((observ) => observ === obs);
    if (idx !== -1) {
      this.observers = [
        ...this.observers.slice(0, idx),
        ...this.observers.slice(idx + 1),
      ];
    }
    return this;
  }
  printObservers() {
    for (let obs of this.observers) {
      console.log(obs.getName());
    }
  }
}

// const publisher = new ConcretePublisher();

// const observer1 = new ConcreteObserver1();
// const observer2 = new ConcreteObserver2();
// const observer3 = new ConcreteObserver3();

// publisher.subscribe(observer1).subscribe(observer2).subscribe(observer3);

// publisher.printObservers();

// publisher.notifyAll('ПРИВЕТ!');

// publisher.unsubscribe(observer2);

// publisher.printObservers();

// publisher.notifyAll('ПОКА!');

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// STATE (СОСТОЯНИЕ)
// ЦЕЛЬ: организовать систему объектов внути которой при изменении состояния
// меняется поведение объектов
// ВАРИАНТ ПРИМЕНЕНИЯ: разгрузка массивных блоков if или swith, когда они
// работают с состоянием

// Контекст - объект, используемый клиентом. Он хранит в себе ссылку на объект
// текущего состояния и меняет своё поведение в зависимости от этого
// состояния
class Context {
  state;

  constructor(state) {
    this.transitionTo(state);
  }

  transitionTo(state) {
    console.log(`Context: Transition to ${state.constructor.name}.`);
    this.state = state;
    this.state.setContext(this);
  }

  request1() {
    this.state ? this.state.handle1() : null;
  }

  request2() {
    this.state ? this.state.handle2() : null;
  }
}

// Базовое состояние содержит методы, которые должны присутствовать в каждом
// объекте состояния, а так же ссылку на контекст для того, чтобы
// иметь возможность его изменить
class State {
  context;

  setContext(context) {
    this.context = context;
  }

  handle1() {}

  handle2() {}
}

class ConcreteStateA extends State {
  handle1() {
    console.log('ConcreteStateA handles request1.');
    console.log('ConcreteStateA wants to change the state of the context.');
    this.context ? this.context.transitionTo(new ConcreteStateB()) : null;
  }

  handle2() {
    console.log('ConcreteStateA handles request2.');
  }
}

class ConcreteStateB extends State {
  handle1() {
    console.log('ConcreteStateB handles request1.');
  }

  handle2() {
    console.log('ConcreteStateB handles request2.');
    console.log('ConcreteStateB wants to change the state of the context.');
    this.context ? this.context.transitionTo(new ConcreteStateA()) : null;
  }
}

// const context = new Context(new ConcreteStateA());
// context.request1();
// context.request2();

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// STRATEGY (СТРАТЕГИЯ)
// ЦЕЛЬ: создать объект контекста, а так же несколько объектов, имплементирующих
// разные подходы к решению бизнес задачи. Клиент может выбирать стратегию,
// передавать её в контекст, тем самым меняя поведение класса контекста
// без его расширения
// ВАРИАНТ ИСПОЛЬЗОВАНИЯ: в приложении поиска маршрута заменять внутри контекста
// логику поиска на поиск для авто или пешехода в зависимости от нужд клиента

// Контекст используется клиентом для вызова методов, решающих бизнес
// задачи
class StrategyContext {
  strategy;

  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  // Контекст передаёт выполнение задачи в конкретный объект стратегии, при
  // этом не имея методов для её непосредственного решения внутри себя
  doSomeBusinessLogic() {
    console.log(
      "Context: Sorting data using the strategy (not sure how it'll do it)"
    );
    const result = this.strategy.doAlgorithm(['a', 'b', 'c', 'e', 'd']);
    console.log(result.join(','));
  }
}

// Конкретные стратегии непосредственно включают реализацию интерфейса стратегий
class ConcreteStrategyA {
  doAlgorithm(data) {
    return data.sort();
  }
}

class ConcreteStrategyB {
  doAlgorithm(data) {
    return data.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
  }
}

// const context = new StrategyContext(new ConcreteStrategyA());
// console.log('Client: Strategy is set to normal sorting.');
// context.doSomeBusinessLogic();

// console.log('');

// console.log('Client: Strategy is set to reverse sorting.');
// context.setStrategy(new ConcreteStrategyB());
// context.doSomeBusinessLogic();

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// TEMPLATE METHOD (ШАБЛОННЫЙ МЕТОД)
// ЦЕЛЬ: устранить повторный код внутри похожих объектов путём переноса общих
// частей в 1  базовый класс, и определения методов для перезаписи субклассами
// ВАРИАНТ ИСПОЛЬЗОВАНИЯ: в приложении обработки файлов различных текстовых
// форматов возможно создание массы классов обработчиков, которые будут
// отличаться только логикой прохода по файлу, а в остальном будут идентичны
// в таких случаях можно создать базовый класс и перенести туда все общие части,
// а отличающиеся методы определить в базовом классе и переписать в субклассах

// Абстрактный класс определяет структуру конкретных объектов, в частности
// методы, которые:
// - могут быть общими для всех и соответственно имплементированы внутри базового класса
// - могут быть разными для всех и поэтому абстрактны и не определены внутри базового класса
// - могут быть общими для некоторых и не использоваться или перезаписываться остальными,
// а потому определены в базовом классе и могут перезаписываться или игнорироваться
// субклассами
class AbstractClass {
  // Шаблонный метод - скелет всего алгоритма
  templateMethod() {
    this.baseOperation1();
    this.requiredOperations1();
    this.baseOperation2();
    this.hook1();
    this.requiredOperation2();
    this.baseOperation3();
    this.hook2();
  }

  baseOperation1() {
    console.log('AbstractClass says: I am doing the bulk of the work');
  }

  baseOperation2() {
    console.log(
      'AbstractClass says: But I let subclasses override some operations'
    );
  }

  baseOperation3() {
    console.log(
      'AbstractClass says: But I am doing the bulk of the work anyway'
    );
  }

  // эти операции должны быть определены субклассами
  requiredOperations1() {
    throw new Error(
      'requiredOperations1 нужно переопределить в конкретном субклассе'
    );
  }
  requiredOperations2() {
    throw new Error(
      'requiredOperation2 нужно переопределить в конкретном субклассе'
    );
  }

  // Эти операции могут быть переопределены субклассами или проигнорированы
  hook1() {}
  hook2() {}
}

class ConcreteClass1 extends AbstractClass {
  requiredOperations1() {
    console.log('ConcreteClass1 says: Implemented Operation1');
  }

  requiredOperation2() {
    console.log('ConcreteClass1 says: Implemented Operation2');
  }
}

class ConcreteClass2 extends AbstractClass {
  requiredOperations1() {
    console.log('ConcreteClass2 says: Implemented Operation1');
  }

  requiredOperation2() {
    console.log('ConcreteClass2 says: Implemented Operation2');
  }

  hook1() {
    console.log('ConcreteClass2 says: Overridden Hook1');
  }
}

// console.log('Same client code can work with different subclasses:');
// new ConcreteClass1().templateMethod();
// console.log('');

// console.log('Same client code can work with different subclasses:');
// new ConcreteClass2().templateMethod();

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// VISITOR (ПОСЕТИТЕЛЬ)
// ЦЕЛЬ: Отделить алгоритмы от объектов на которых они оперируют
// ВАРИАНТ ИСПОЛЬЗОВАНИЯ: Предположим, есть структура с узлами разных типов,
// например HTML дерево и есть задача превратить это дерево в XML документ без
// определения доп. методов для возврата данных для XML на каждом типе узлов.
// Можно создать специальный
// объект, который сможет принимать любой тип узла, забирать из него нужную
// информацию и строить XML документ

class ConcreteComponentA {
  accept(visitor) {
    visitor.visitConcreteComponentA(this);
  }
  exclusiveMethodOfConcreteComponentA() {
    return 'A';
  }
}

class ConcreteComponentB {
  accept(visitor) {
    visitor.visitConcreteComponentB(this);
  }

  specialMethodOfConcreteComponentB() {
    return 'B';
  }
}

class ConcreteVisitor1 {
  visitConcreteComponentA(element) {
    console.log(
      `${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor1`
    );
  }

  visitConcreteComponentB(element) {
    console.log(
      `${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor1`
    );
  }
}

class ConcreteVisitor2 {
  visitConcreteComponentA(element) {
    console.log(
      `${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor2`
    );
  }

  visitConcreteComponentB(element) {
    console.log(
      `${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor2`
    );
  }
}

// const comp1 = new ConcreteComponentA();
// const comp2 = new ConcreteComponentB();

// console.log(
//   'The client code works with all visitors via the base Visitor interface:'
// );
// const visitor1 = new ConcreteVisitor1();
// const visitor2 = new ConcreteVisitor2();
// console.log(
//   'It allows the same client code to work with different types of visitors:'
// );

// comp1.accept(visitor1);
// comp1.accept(visitor2);
// comp2.accept(visitor1);
// comp2.accept(visitor2);

//------------------------------------------------------------------------------

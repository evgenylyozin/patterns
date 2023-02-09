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
//
// --сделать--
// - Facade
// - Flyweight
// - Proxy
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
//
// BEHAVIORAL DESIGN PATTERNS
// To handle communication between heterogeneous objects

// --note--
//
// --todo--
// - Chain of Responsibility
// - Command
// - Iterator
// - Mediator
// - Memento
// - Observer
// - State
// - Strategy
//------------------------------------------------------------------------------

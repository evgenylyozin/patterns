// CREATIONAL DESIGN PATTERNS
// Patterns for handling objects creation

// --note--
// these classic patterns were excluded:
// 1. Constructor
// reason of exclusion: since ES6 just use class syntax
//
//------------------------------------------------------------------------------
// FACTORY
// Aim: to hide objects creation details

// Functional approach
class BlackCat {
  color: 'black';
  constructor() {
    this.color = 'black';
  }
}

class WhiteCat {
  color: 'white';
  constructor() {
    this.color = 'white';
  }
}

type CatTypes = {
  black: BlackCat;
  white: WhiteCat;
};

const CatFactoryFunc = <T extends keyof CatTypes>(type: T): CatTypes[T] => {
  switch (type) {
    case 'black':
      return new BlackCat() as CatTypes[T];
    case 'white':
      return new WhiteCat() as CatTypes[T];
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
  createACat<T extends keyof CatTypes>(type: T): CatTypes[T] {
    switch (type) {
      case 'black':
        return new BlackCat() as CatTypes[T];
      case 'white':
        return new WhiteCat() as CatTypes[T];
      default:
        throw new Error('unknown type of a cat');
    }
  }
}

// const catFactory = new CatFactory();
// const blackCat = catFactory.createACat('black');
// console.log(blackCat.color);
// const whiteCat = catFactory.createACat('white');
// console.log(whiteCat.color);
// try {
//   const unknownCat = catFactory.createACat('???'); // should introduce and error at compile time
//   console.log(unknownCat.color);
// } catch (e) {
//   console.log(e.message);
// }
//------------------------------------------------------------------------------
// ABSTRACT FACTORY
// Aim: to produce compatible but different objects

// интерфейс абстрактной фабрики делает совместимыми конкретные фабрики и стандартизирует
// типы продуктов, которые они выпускают
interface AbstractFactory {
  createProductA: () => AbstractProductA;
  createProductB: () => AbstractProductB;
}

// Абстрактный интерфейс для каждого выпускаемого типа продуктов стандартизирует
// признаки, присущие конкретному типу продукта, что делает их взаимозаменяемыми
interface AbstractProductA {
  mondatoryFeatureOfA: () => void;
}

interface AbstractProductB {
  mondatoryFeatureOfB: () => void;
}

// Конкретный продукт следует интерфейсу своего типа, но может иметь и свои особенные черты
class ConcreteProductAType1 implements AbstractProductA {
  mondatoryFeatureOfA() {
    console.log('All A products have this feature');
  }
  specialFeatureOfAType1() {
    console.log('This feature is only in As of type 1');
  }
}

class ConcreteProductBType1 implements AbstractProductB {
  mondatoryFeatureOfB() {
    console.log('All B products have this feature');
  }
  specialFeatureOfBType1() {
    console.log('This feature is only in Bs of type 1');
  }
}

class ConcreteProductAType2 implements AbstractProductA {
  mondatoryFeatureOfA() {
    console.log('All A products have this feature');
  }
  specialFeatureOfAType2() {
    console.log('This feature is only in As of type 2');
  }
}

class ConcreteProductBType2 implements AbstractProductB {
  mondatoryFeatureOfB() {
    console.log('All B products have this feature');
  }
  specialFeatureOfBType2() {
    console.log('This feature is only in Bs of type 2');
  }
}

// Конкретная фабрика, следуя интерфейсу абстрактной фабрики, выпускает все необходимые
// типы конкретных продуктов, при этом каждая фабрика производит ряд этих продуктов со
// своими особенностями (например, одна фабрика производит набор кнопок черного цвета, а другая
// тот же набор белого цвета)
class ConcreteFactory1 implements AbstractFactory {
  createProductA() {
    return new ConcreteProductAType1();
  }
  createProductB() {
    return new ConcreteProductBType1();
  }
}

class ConcreteFactory2 implements AbstractFactory {
  createProductA() {
    return new ConcreteProductAType2();
  }
  createProductB() {
    return new ConcreteProductBType2();
  }
}

// const FactoryOfType1Products = new ConcreteFactory1();
// const FactoryOfType2Products = new ConcreteFactory2();

// const productAType1 = FactoryOfType1Products.createProductA();
// const productAType2 = FactoryOfType2Products.createProductA();
// const productBType1 = FactoryOfType1Products.createProductB();
// const productBType2 = FactoryOfType2Products.createProductB();

// productAType1.mondatoryFeatureOfA();
// productAType1.specialFeatureOfAType1();
// productAType2.mondatoryFeatureOfA();
// productAType2.specialFeatureOfAType2();
// productBType1.mondatoryFeatureOfB();
// productBType1.specialFeatureOfBType1();
// productBType2.mondatoryFeatureOfB();
// productBType2.specialFeatureOfBType2();

//------------------------------------------------------------------------------
// PROTOTYPE (ПРОТОТИП)
// ЦЕЛЬ: создать схему объекта и посредством её копирования (клонирования)
// получать новые схожие объекты

const someObj = {
  a: 'b',
  c: 'd',
} as const;

type otherObj<T> = T & { e: 'f'; __proto__: T };

// назначение прототипа конкретному объекту в TS рекомендуется делать при помощи
// Object.create
const otherObj: otherObj<typeof someObj> = Object.create(someObj, {
  e: { value: 'f' },
});

// console.log(otherObj.a);
// console.log(otherObj.c);
// console.log(otherObj.e);
// console.log(otherObj.__proto__ === someObj);
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// SINGLETON (СИНГЛТОН)
// ЦЕЛЬ: создать только 1 объект определённого типа. А в случае повторного
// запроса на получение такого объекта отдавать ссылку на уже созданный.
// ВАРИАНТ ИСПОЛЬЗОВАНИЯ: объект для работы с БД
// -- Уточнение --
// Начиная с ES6 можно создать нужный объект в отдельном модуле и экспортировать
// его, в таком случае не будет необходимости оформлять IIFE

// Пример с IIFE
type DBObj = {
  name: string;
};
const Singleton = (() => {
  let instance: DBObj | null = null;
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
// BUILDER (СТРОИТЕЛЬ)
// ЦЕЛЬ: организовать систему для пошагового создания сложных настраиваемых
// объектов или разгрузить сложный конструктор, или упростить систему классов и
// субклассов

// Конкретный билдер имеет набор методов для поэтапного строительства конкретного
// объекта

interface Builder {
  producePartA(): void;
  producePartB(): void;
  producePartC(): void;
}

class ConcreteBuilder1 implements Builder {
  // изначально пустой объект продукта
  private product: Product1 = new Product1();

  private reset(): void {
    this.product = new Product1();
  }

  public producePartA(): void {
    this.product.parts.push('PartA1');
  }

  public producePartB(): void {
    this.product.parts.push('PartB1');
  }

  public producePartC(): void {
    this.product.parts.push('PartC1');
  }

  // Каждый билдер должен иметь метод для возврата созданного продукта
  // После возврата продукта (объекта) обычно происходит сброс ссылки
  // на созданный объект в билдере для подготовки к созданию нового объекта
  public getProduct(): Product1 {
    const result = this.product;
    this.reset();
    return result;
  }
}

// Конкретный продукт изначально представляет из себя стандартный пустой объект,
// который будет наполнен содержимым через вызов методов конкретного билдера
class Product1 {
  public parts: string[] = [];

  listParts() {
    console.log(`Product parts: ${this.parts.join(', ')}\n`);
  }
}

// Необязательная, но удобная часть паттерна - Директор, в его обязанности
// входит регистрация конкретного билдера и выполнение через него
// шагов по построению нужного объекта в определённой последовательности
class Director {
  private builder: Builder | undefined;

  // Директор должен уметь работать с любым билдером, соответствующим определёному
  // интерфейсу
  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  // Директор включает в себя методы, которые клиентский код может использовать
  // для создания объектов. Методы вызывают соответствующие шаги билдера
  // по созданию объекта
  public buildMinimalViableProduct(): void {
    if (!this.builder) {
      throw new Error(
        'Builder was not set, call setBuilder on the Director object'
      );
    }
    this.builder.producePartA();
  }

  public buildFullFeaturedProduct(): void {
    if (!this.builder) {
      throw new Error(
        'Builder was not set, call setBuilder on the Director object'
      );
    }
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
//------------------------------------------------------------------------------
//
// STRUCTURAL DESIGN PATTERNS
// To organize relationships between objects
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// ADAPTER (АДАПТЕР)
// ЦЕЛЬ: создать промежуточное звено между двумя объектами, интерфейсы
// которых не сопоставимы, но которым нужно взаимодействовать между собой

// Существует какой-либо объект или класс, который активно используется в коде
// или клиентом
class OldButUsefulLogger {
  public log(anything: any): void {
    console.log(
      `Тип переданных для логирования данных: ${typeof anything}, данные: ${anything}`
    );
  }
}

interface Logger {
  printString(data: string): void;
  printNumber(data: number): void;
  printAny(data: any): void;
}

// Появляется новый класс, который мы начинаем активно использовать в коде для
// логирования, т.к. он поддерживает больше методов и может использовать любые
// логгеры с определённым интерфейсом под капотом
class BrandNewLogger {
  logger: Logger;
  constructor(logger: Logger) {
    this.logger = logger;
  }
  private checkTheTypeOfData = (data: any): string => {
    return typeof data;
  };
  public log = (data: any): void => {
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
  logger: OldButUsefulLogger;
  constructor() {
    this.logger = new OldButUsefulLogger();
  }
  public printString = (data: string): void => {
    this.logger.log(data);
  };
  public printNumber = (data: number): void => {
    this.logger.log(data);
  };
  public printAny = (data: any): void => {
    this.logger.log(data);
  };
}

// Старый код выглядит так:

// const logger = new OldButUsefulLogger();
// logger.log('Привет, я строка');
// logger.log(42);
// logger.log([1, 2, 3, 4, 5]);

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
// BRIDGE (МОСТ)
// ЦЕЛЬ: разгрузить сложную систему классов и отделить конкретные операции от
// высокоуровневых (более абстрактных)
// ПРИМЕНЕНИЕ: при необходимости поддерживать различные платформы, использовать
// разные внешние API или структуры

// Абстрактный мост содержит ссылку на конкретную имплементацию требуемых операций
// и вызывается клиентом
class AbstractBridge {
  protected implementation: Implementation;

  constructor(implementation: Implementation) {
    this.implementation = implementation;
  }

  public operation(): string {
    const result = this.implementation.operationImplementation();
    return `Abstraction: Base operation with:\n${result}`;
  }
}

// Абстрактную часть можно расширять независимо от имплементаций
class ExtendedAbstractBridge extends AbstractBridge {
  public operation(): string {
    const result = this.implementation.operationImplementation();
    return `ExtendedAbstraction: Extended operation with:\n${result}`;
  }
}

// Интерфейс для каждого класса имплементации
interface Implementation {
  operationImplementation(): string;
}

// Конкретная имплементация представляет из себя конкретные операции, которые потом
// будут использованы через абстрактный мост клиентом
// таким образом, при условии соответствия интерфейсу имплементации, можно
// использовать разные внешние API объекты и т.д. внутри разных имплементаций
class ConcreteImplementationA implements Implementation {
  public operationImplementation(): string {
    return "ConcreteImplementationA: Here's the result on the platform A.";
  }
}

class ConcreteImplementationB implements Implementation {
  public operationImplementation(): string {
    return "ConcreteImplementationB: Here's the result on the platform B.";
  }
}

// let implementation = new ConcreteImplementationA();
// let abstraction = new AbstractBridge(implementation);
// console.log(abstraction.operation());

// implementation = new ConcreteImplementationB();
// abstraction = new ExtendedAbstractBridge(implementation);
// console.log(abstraction.operation());

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
  public name: string;
  // класс File назван SomeFile т.к. WebAPI в JS уже имеет встроенный класс File
  constructor(name: string) {
    this.name = name;
  }
}

class Folder {
  private files: SomeFile[] = [];
  private folders: Folder[] = [];
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  public addFolder = (folder: Folder): void => {
    this.folders.push(folder);
  };
  public addFile = (file: SomeFile): void => {
    this.files.push(file);
  };
  public printDataInside = (): void => {
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
  public static RecursivePrint = (folder: Folder): void => {
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

// Интерфейс объекта, который оборачивается
// ему должны так же следовать все обёртки, чтобы клиентский код
// мог без труда использовать столько декораторов, сколько угодно
interface IDecorated {
  log(data: string): void;
}

// Конкретный класс со стандартной имплементацией операций
class Decorated implements IDecorated {
  public log(data: string): void {
    console.log(data);
  }
}

// Базовый декоратор должен так же следовать интерфейсу оборачиваемого объекта
class Decorator implements IDecorated {
  protected decorated: IDecorated;

  constructor(decorated: IDecorated) {
    this.decorated = decorated;
  }
  public log(data: string): void {
    this.decorated.log(data);
  }
}

// Конкретные декораторы следуют интерфейсу оборачиваемого объекта и
// манипулируют данными, передаваемыми в него или получаемыми от него
class ConcreteDecoratorA extends Decorator {
  public log(data: string): void {
    data = `Декоратор А преобразовал данные, строка до преобразования:\n${data}`;
    super.log(data);
  }
}

class ConcreteDecoratorB extends Decorator {
  public log(data: string): void {
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
  protected subsystem1: Subsystem1;
  protected subsystem2: Subsystem2;
  constructor(subsystem1?: Subsystem1, subsystem2?: Subsystem2) {
    this.subsystem1 = subsystem1 || new Subsystem1();
    this.subsystem2 = subsystem2 || new Subsystem2();
  }

  public operation(): string {
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
  public operation1(): string {
    return 'Subsystem1: Ready!\n';
  }
  public operationN(): string {
    return 'Subsystem1: Go!\n';
  }
}

class Subsystem2 {
  public operation1(): string {
    return 'Subsystem2: Get ready!\n';
  }
  public operationZ(): string {
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
  private sharedState: any;

  constructor(sharedState: any) {
    this.sharedState = sharedState;
  }

  public operation(uniqueState: any): void {
    const s = JSON.stringify(this.sharedState);
    const u = JSON.stringify(uniqueState);
    console.log(`Flyweight: Displaying shared (${s}) and unique (${u}) state.`);
  }
}

// Фабрика Flyweight объектов создаёт и управляет flyweight объектами, когда
// клиент запрашивает очередной flyweight объект - фабрика либо возвращает
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
        "FlyweightFactory: Can't find a flyweight, creating new one."
      );
      this.flyweights[key] = new Flyweight(sharedState);
    } else {
      console.log('FlyweightFactory: Reusing existing flyweight.');
    }

    return this.flyweights[key];
  }

  public listFlyweights(): void {
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

// function addCarToPoliceDatabase(
//   ff: FlyweightFactory,
//   plates: string,
//   owner: string,
//   brand: string,
//   model: string,
//   color: string
// ) {
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

// Интерфейс, который ожидает видеть клиент, ему должен соответствовать
// как реальный объект, так и прокси
interface Subject {
  request(): void;
}

// Реальный проксируемый объект, содержит бизнес логику, но может быть слишком
// тяжеловесным, чтобы использовать его для каждого запроса, либо может
// быть слабо защищён и т.п.
class RealSubject implements Subject {
  public request(): void {
    console.log('RealSubject: Handling request.');
  }
}

// Прокси имеет тот же интерфейс, что и проксируемый объект
class ProxyObj implements Subject {
  private realSubject: RealSubject;

  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }

  public request(): void {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  private checkAccess(): boolean {
    console.log('Proxy: Checking access prior to firing a real request.');
    return true;
  }

  private logAccess(): void {
    console.log('Proxy: Logging the time of request.');
  }
}

// const proxy = new ProxyObj(new RealSubject());
// proxy.request();

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// BEHAVIORAL DESIGN PATTERNS
// To handle communication between heterogeneous objects

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

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// COMMAND (КОМАНДА)
// ЦЕЛЬ: превратить запросы на выполнение определённых действий в объекты,
// которые можно будет использовать для вызова определёных методов (выполнения
// команд), тем самым отделив логику GUI от бизнес логики

// интерфейс для определения методов для выполнения команды
interface Command {
  execute(): void;
}

// в самом простом варианте объект команды может самостоятельно выполнить
// действия для обработки запроса
class SimpleCommand implements Command {
  private payload: string;

  constructor(payload: string) {
    this.payload = payload;
  }

  public execute(): void {
    console.log(
      `SimpleCommand: See, I can do simple things like printing (${this.payload})`
    );
  }
}

// Более сложные операции выполняются командами за счёт делегирования задач
// другим объектам бизнес логики (Ресиверам)
class ComplexCommand implements Command {
  private receiver: Receiver;

  private a: string;

  private b: string;

  // Сложные команды получают один или несколько ресиверов и необходимые
  // данные через конструктор
  constructor(receiver: Receiver, a: string, b: string) {
    this.receiver = receiver;
    this.a = a;
    this.b = b;
  }

  public execute(): void {
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
  public doSomething(a: string): void {
    console.log(`Receiver: Working on (${a}.)`);
  }

  public doSomethingElse(b: string): void {
    console.log(`Receiver: Also working on (${b}.)`);
  }
}

// Инвокер - объект, который содержит в себе ссылки на команды
// клиент работает с этим объектом, вызывая его методы и регистрируя
// необходимые команды и ресиверы
class Invoker {
  private onStart: Command | undefined;

  private onFinish: Command | undefined;

  public setOnStart(command: Command): void {
    this.onStart = command;
  }

  public setOnFinish(command: Command): void {
    this.onFinish = command;
  }

  public doSomethingImportant(): void {
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

  private isCommand(object: any): object is Command {
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

// Интерфейс итератора устанавливает, какие именно методы должен иметь каждый
// итератор
interface iIterator<T> {
  current(): T;
  next(): T;
  key(): number;
  valid(): boolean;
  rewind(): void;
}

// Интерфейс агрегатор - устанавливает методы, которые должны иметь объекты -
// коллекции, чтобы возвращать соответствующий итератор
interface Aggregator {
  getIterator(): iIterator<string>;
}

// Конкретный итератор содержит логику прохода по коллекции
class StringsArrayIterator implements iIterator<string> {
  private collection: WordsCollection;
  private position: number = 0;
  private reverse: boolean = false;

  constructor(collection: WordsCollection, reverse: boolean = false) {
    this.collection = collection;
    this.reverse = reverse;

    if (reverse) {
      this.position = collection.getCount() - 1;
    }
  }

  public rewind() {
    this.position = this.reverse ? this.collection.getCount() - 1 : 0;
  }

  public current(): string {
    return this.collection.getItems()[this.position];
  }

  public key(): number {
    return this.position;
  }

  public next(): string {
    const item = this.collection.getItems()[this.position];
    this.position += this.reverse ? -1 : 1;
    return item;
  }

  public valid(): boolean {
    if (this.reverse) {
      return this.position >= 0;
    }

    return this.position < this.collection.getCount();
  }
}

// Конкретная коллекция предоставляет один или несколько методов для
// возвращения сопоставимого с коллекцией итератора
class WordsCollection implements Aggregator {
  private items: string[] = [];

  public getItems(): string[] {
    return this.items;
  }

  public getCount(): number {
    return this.items.length;
  }

  public addItem(item: string): void {
    this.items.push(item);
  }

  public getIterator(): iIterator<string> {
    return new StringsArrayIterator(this);
  }

  public getReverseIterator(): iIterator<string> {
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

// Метод notify на медиаторе принимает события и вызывает методы на
// нужных объектах в соответствии с ними
interface Mediator {
  notify(sender: object, event: string): void;
}

// Конкретный медиатор включает в себя логику координации между различными
// объектами
class ConcreteMediator implements Mediator {
  private component1: Component1;
  private component2: Component2;

  constructor(c1: Component1, c2: Component2) {
    this.component1 = c1;
    this.component1.setMediator(this);
    this.component2 = c2;
    this.component2.setMediator(this);
  }

  public notify(sender: object, event: string): void {
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
  protected mediator: Mediator;

  constructor(mediator?: Mediator) {
    this.mediator = mediator!;
  }

  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}

// Конкретные объекты содержат бизнес логику и не зависят ни от других компонентов
// ни от конкретного медиатора (т.к. они сохраняют в себе ссылку на любого
// конкретного медиатора)
class Component1 extends BaseComponent {
  public doA(): void {
    console.log('Component 1 does A.');
    this.mediator.notify(this, 'A');
  }

  public doB(): void {
    console.log('Component 1 does B.');
    this.mediator.notify(this, 'B');
  }
}

class Component2 extends BaseComponent {
  public doC(): void {
    console.log('Component 2 does C.');
    this.mediator.notify(this, 'C');
  }

  public doD(): void {
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
  private state: string;
  constructor(state: string) {
    this.state = state;
    console.log(`Originator: My initial state is: ${state}`);
  }
  public doSomething(): void {
    console.log("Originator: I'm doing something important.");
    this.state = this.generateRandomString(30);
    console.log(`Originator: and my state has changed to: ${this.state}`);
  }

  private generateRandomString(length: number = 10): string {
    const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return new Array(length)
      .fill('a')
      .map(() => charSet.charAt(Math.floor(Math.random() * charSet.length)))
      .join('');
  }

  public save(): Memento {
    return new ConcreteMemento(this.state);
  }

  public restore(memento: Memento): void {
    this.state = memento.getState();
    console.log(`Originator: My state has changed to: ${this.state}`);
  }
}

// Интерфейс мементо объекта должен давать возможность получить данные о состоянии
// обратно
interface Memento {
  getState(): string;

  getName(): string;

  getDate(): string;
}

class ConcreteMemento implements Memento {
  private state: string;
  private date: string;

  constructor(state: string) {
    this.state = state;
    this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  public getState(): string {
    return this.state;
  }

  public getName(): string {
    return `${this.date} / (${this.state.substring(0, 9)}...)`;
  }

  public getDate(): string {
    return this.date;
  }
}

// Объект класса Caretaker напрямую не зависит от конкретного мементо объекта
// он так же не зависит от конкретного объекта, чьё состояние сохраняется
// его задача - хранить объекты мементов и вызывать соответствующие методы
// других объектов для сохранения и восстановления состояния
class Caretaker {
  private mementos: Memento[] = [];

  private originator: Originator;

  constructor(originator: Originator) {
    this.originator = originator;
  }

  public backup(): void {
    console.log("\nCaretaker: Saving Originator's state...");
    this.mementos.push(this.originator.save());
  }

  public undo(): void {
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

  public showHistory(): void {
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

// Интерфейс наблюдателя содержит методы, которые дают каблюдателю
// возможность получать уведомления от субъекта
interface Observer {
  notify(evt: string): void;
  getName(): string;
}
// Интерфейс Publisher определяет возможность подписываться и отписываться от
// уведомлений от субъекта, а так же имеет метод для оповещения всех
// текущих подписчиков субъекта
interface Publisher {
  subscribe(obs: Observer): Publisher;
  unsubscribe(obs: Observer): Publisher;
  notifyAll(evt: string): void;
}

class ConcreteObserver1 implements Observer {
  public notify(evt: string): void {
    console.log('Первый конкретный наблюдатель получил уведомление:', evt);
  }
  public getName(): string {
    return 'ConcreteObserver1';
  }
}

class ConcreteObserver2 implements Observer {
  public notify(evt: string): void {
    console.log('Второй конкретный наблюдатель получил уведомление:', evt);
  }
  public getName(): string {
    return 'ConcreteObserver2';
  }
}

class ConcreteObserver3 implements Observer {
  public notify(evt: string): void {
    console.log('Третий конкретный наблюдатель получил уведомление:', evt);
  }
  public getName(): string {
    return 'ConcreteObserver3';
  }
}

class ConcretePublisher implements Publisher {
  private observers: Observer[] = [];
  public notifyAll(evt: string): void {
    for (let observer of this.observers) {
      observer.notify(evt);
    }
  }
  public subscribe(obs: Observer): Publisher {
    this.observers.push(obs);
    return this;
  }

  public unsubscribe(obs: Observer): Publisher {
    const idx = this.observers.findIndex((observ) => observ === obs);
    if (idx !== -1) {
      this.observers = [
        ...this.observers.slice(0, idx),
        ...this.observers.slice(idx + 1),
      ];
    }
    return this;
  }
  public printObservers(): void {
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
  private state: State | undefined;

  constructor(state: State) {
    this.transitionTo(state);
  }

  public transitionTo(state: State): void {
    console.log(`Context: Transition to ${(<any>state).constructor.name}.`);
    this.state = state;
    this.state.setContext(this);
  }

  public request1(): void {
    this.state ? this.state.handle1() : null;
  }

  public request2(): void {
    this.state ? this.state.handle2() : null;
  }
}

// Базовое состояние содержит методы, которые должны присутствовать в каждом
// объекте состояния, а так же ссылку на контекст для того, чтобы
// иметь возможность его изменить
abstract class State {
  protected context: Context | undefined;

  public setContext(context: Context) {
    this.context = context;
  }

  public abstract handle1(): void;

  public abstract handle2(): void;
}

class ConcreteStateA extends State {
  public handle1(): void {
    console.log('ConcreteStateA handles request1.');
    console.log('ConcreteStateA wants to change the state of the context.');
    this.context ? this.context.transitionTo(new ConcreteStateB()) : null;
  }

  public handle2(): void {
    console.log('ConcreteStateA handles request2.');
  }
}

class ConcreteStateB extends State {
  public handle1(): void {
    console.log('ConcreteStateB handles request1.');
  }

  public handle2(): void {
    console.log('ConcreteStateB handles request2.');
    console.log('ConcreteStateB wants to change the state of the context.');
    this.context ? this.context.transitionTo(new ConcreteStateA()) : null;
  }
}

// const context = new Context(new ConcreteStateA());
// context.request1();
// context.request2();

//------------------------------------------------------------------------------

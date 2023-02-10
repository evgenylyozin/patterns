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
// - Command
// - Iterator
// - Mediator
// - Memento
// - Observer
// - State
// - Strategy
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

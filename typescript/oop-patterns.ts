// CREATIONAL DESIGN PATTERNS
// Patterns for handling objects creation

// --note--
// these classic patterns were excluded:
// 1. Constructor
// reason of exclusion: since ES6 just use class syntax
//
// --todo--
// - Builder
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

const firstInstance = Singleton.instantiate();
const secondInstance = Singleton.instantiate();

console.log(firstInstance.name);
console.log(secondInstance.name);
console.log(firstInstance === secondInstance);

firstInstance.name = 'UPDATED DB object';

console.log(firstInstance.name);
console.log(secondInstance.name);
console.log(firstInstance === secondInstance);
//------------------------------------------------------------------------------
//
// STRUCTURAL DESIGN PATTERNS
// To organize relationships between objects

// --note--
//
// --todo--
// - Adapter
// - Bridge
// - Composite
// - Decorator
// - Facade
// - Flyweight
// - Proxy
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

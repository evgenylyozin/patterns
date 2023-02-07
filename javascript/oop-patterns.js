// CREATIONAL DESIGN PATTERNS
// Patterns for handling objects creation

// --note--
// these classic patterns were excluded:
// 1. Constructor
// reason of exclusion: since ES6 just use class syntax
//
// --todo--
// - Abstract factory
// - Prototype
// - Singleton
// - Builder
//
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

/* CREATIONAL DESIGN PATTERNS

Patterns for handling objects creation

--note--
these classic patterns were excluded:

1. Constructor
reason of exclusion: since ES6 just use class syntax
*/

/* FACTORY
Aim: to hide objects creation details
*/
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

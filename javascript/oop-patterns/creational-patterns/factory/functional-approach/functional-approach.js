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

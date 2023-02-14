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

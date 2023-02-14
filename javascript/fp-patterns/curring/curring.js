//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// Curring (Каррирование)
// Цель: зафиксировать повторяющиеся аргументы при вызове функции, получив
// новую функцию

const curry = (func) => {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
};

const addThreeNums = (a, b, c) => {
  return a + b + c;
};

const curriedAddThreeNums = curry(addThreeNums);

// console.log(curriedAddThreeNums(1, 2, 3));
// console.log(curriedAddThreeNums(1)(2, 3));
// console.log(curriedAddThreeNums(1, 2)(3));
// console.log(curriedAddThreeNums(1)(2)(3));
// console.log(curriedAddThreeNums(1, 2, 3, 4, 5, 6, 7, 8));

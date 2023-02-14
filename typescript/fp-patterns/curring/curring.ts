//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// Curring (Каррирование)
// Цель: зафиксировать повторяющиеся аргументы при вызове функции, получив
// новую функцию

const curry = (func: (...args: any) => any) => {
  return function curried(...args: any) {
    if (args.length >= func.length) {
      return func.apply(null, args);
    } else {
      return function (...args2: any) {
        return curried.apply(null, args.concat(args2));
      };
    }
  };
};

const addThreeNums = (a: number, b: number, c: number) => {
  return a + b + c;
};

const curriedAddThreeNums = curry(addThreeNums);

// console.log(curriedAddThreeNums(1, 2, 3));
// console.log(curriedAddThreeNums(1)(2, 3));
// console.log(curriedAddThreeNums(1, 2)(3));
// console.log(curriedAddThreeNums(1)(2)(3));
// console.log(curriedAddThreeNums(1, 2, 3, 4, 5, 6, 7, 8));

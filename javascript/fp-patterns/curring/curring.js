// Обобщенная функция высшего порядка, вернёт функцию,
// которая будет ожидать аргументы и будет запоминать их
// и возвращать очередную функцию, ожидающую аргументы до
// тех пор, пока их не наберётся достаточное количество
// (для первоначальной выполнения каррированной функции)
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

// каррируем функцию addThreeNums,
// получим функцию, которой можно передать от 0
// аргументов
const curriedAddThreeNums = curry(addThreeNums);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

console.log(curriedAddThreeNums(1, 2, 3));
console.log(curriedAddThreeNums()()()(1)(2, 3));
console.log(curriedAddThreeNums(1, 2)(3));
console.log(curriedAddThreeNums(1)(2)(3));
console.log(curriedAddThreeNums(1, 2, 3, 4, 5, 6, 7, 8));

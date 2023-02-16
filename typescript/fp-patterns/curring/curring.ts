// Обобщенная функция высшего порядка, вернёт функцию,
// которая будет ожидать аргументы и будет запоминать их
// и возвращать очередную функцию, ожидающую аргументы до
// тех пор, пока их не наберётся достаточное количество
// (для первоначальной выполнения каррированной функции)
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

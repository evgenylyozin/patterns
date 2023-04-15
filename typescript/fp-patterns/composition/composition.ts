// Пример простой композиции за счёт возможности передавать вызов функции в
// качестве аргумента другой функции

const addTwo = (number: number) => number + 2;
const divideByTwo = (number: number) => number/2;

const addTwoThenDivideByTwo = (number: number) => divideByTwo(addTwo(number));

console.log(addTwoThenDivideByTwo(6)); // 4

// Пример композиции через reduce, когда значение получается путём последовательного
// применения переданных функций к передаваемому аргументу
const composeRight =
  (...fs: Function[]) =>
  (x: number) =>
    fs.reduceRight((acc, f) => f(acc), x);

const composeLeft =
  (...fs: Function[]) =>
  (x: number) =>
    fs.reduce((acc, f) => f(acc), x);

const addTwoThenDivideByTwoReduced = composeRight(divideByTwo, addTwo);
const divideByTwoThenAddTwo = composeLeft(divideByTwo, addTwo);


console.log(addTwoThenDivideByTwoReduced(6)) // 4
console.log(divideByTwoThenAddTwo(6)) // 5


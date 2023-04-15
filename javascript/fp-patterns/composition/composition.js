// Пример простой композиции за счёт возможности передавать вызов функции в
// качестве аргумента другой функции

const addTwo = (number) => number + 2;
const divideByTwo = (number) => number/2;

const addTwoThenDivideByTwo = (number) => divideByTwo(addTwo(number));

console.log(addTwoThenDivideByTwo(6)); // 4

// Пример композиции через reduce, когда значение получается путём последовательного
// применения переданных функций к передаваемому аргументу
const composeRight =
  (...fs) =>
  (x) =>
    fs.reduceRight((acc, f) => f(acc), x);

const composeLeft =
  (...fs) =>
  (x) =>
    fs.reduce((acc, f) => f(acc), x);

const addTwoThenDivideByTwoReduced = composeRight(divideByTwo, addTwo);
const divideByTwoThenAddTwo = composeLeft(divideByTwo, addTwo);


console.log(addTwoThenDivideByTwoReduced(6)) // 4
console.log(divideByTwoThenAddTwo(6)) // 5


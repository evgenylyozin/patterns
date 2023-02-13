//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// CALLBACK (КОЛБЭК)
// Цель: передать функцию внутрь другой функции для вызова в будущем
// Вариант применения: чтобы сделать функцию обобщенной и сосредоточенной на
// одной конкретной задаче - можно выделить части логики в колбэки и вызывать
// их по мере необходимости. Так же активно используется в обработке событий и
// таймаутов.
const someFunctionWhichOnlyReturnsSomeString = (cb) => {
  const str = 'ПрИвЕт!';
  return cb(str);
};

const someCBWhichDoesSomeAdditionalUsefulWork = (str) => {
  return str.toUpperCase();
};

// console.log(
//   someFunctionWhichOnlyReturnsSomeString(
//     someCBWhichDoesSomeAdditionalUsefulWork
//   )
// );

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// LAZY FUNCTION DEFINITION (ЛЕНИВОЕ ОПРЕДЕЛЕНИЕ ФУНКЦИИ)
// Цель: создать функцию, которая выполнит какие-либо действия при первом вызове,
// а потом будет выполнять другие действия
// Применение: нужно выполнить какую-лтбо инициализацию 1 раз и получить
// полезную функцию для дальнейшего использования
// Примечание: паттерн называется ленивое определение функции, т.к. реальное
// определение функции происходит только после первого её вызова

let lazilyDefinedFunc = () => {
  console.log('Функция выполнила инициализацию');
  lazilyDefinedFunc = () => {
    console.log('Теперь функция делает другую работу');
  };
};

// lazilyDefinedFunc();
// lazilyDefinedFunc();
// lazilyDefinedFunc();

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// IIFE (Immediately Invoked Function Expression) (НЕМЕДЛЕННО ВЫЗЫВАЕМАЯ ФУНКЦИЯ)
// Цель: создать функцию, которая определяется (обычно) в анонимном блоке
// и тут же вызывается.
// Варианты применения: для создания модуля, для инициализации, для создания
// синглтона и т.п.

// Простая IIFE
// (() => {
//   console.log('Привет от простой IIFE');
// })();

// // IIFE с параметрами
// ((str) => {
//   console.log(`${str} от IIFE с параметрами`);
// })('Привет');

// // IIFE с возвращаемым значением
// const singleton = ((str) => {
//   console.log(`${str} от IIFE, создающей синглтон`);
//   console.log('Создаю Синглтон');
//   return {
//     name: 'Синглтон',
//   };
// })('Привет');

// console.log('Меня зовут', singleton.name);

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// Immediate Object Initialization (НЕМЕДЛЕННО ИНИЦИАЛИЗИРУЕМЫЙ ОБЪЕКТ)
// Цель: инициализировать и вернуть готовый объект в единственном экземпляре или
// провести другие операции инициализации с использованием данных из объекта

// const ImmediatelyInitializedObj = {
//   name: '',
//   age: 0,
//   init: function () {
//     console.log('Инициализация через метод init() началась');
//     this.name = 'Имя';
//     this.age = 25;
//     console.log('Инициализация закончена, возвращаю готовый объект');
//     return this;
//   },
// }.init();

// console.log(ImmediatelyInitializedObj);

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// Memoization (Кеширование/Запоминание)
// Цель: запомнить результат операции и при повторе аргументов функции
// вернуть его вместо повторения рассчетов

// Вариант с полем внутри объекта функции
const memoizedFib = (n) => {
  if (n in memoizedFib.results) {
    console.count('Возвращаю значение из кеша');
    return memoizedFib.results[n];
  } else {
    console.count('Считаю новое значение');
    const res = memoizedFib(n - 2) + memoizedFib(n - 1);
    memoizedFib.results[n] = res;
    return res;
  }
};

memoizedFib.results = { 0: 0, 1: 1, 2: 1 };

// console.log(memoizedFib(100));

// Вариант с функцией высшего порядка
const memoizedFibHOF = (n) => {
  const results = { 0: 0, 1: 1, 2: 1 };
  const fib = (n) => {
    if (n in results) {
      console.count('Возвращаю значение из кеша');
      return results[n];
    } else {
      console.count('Считаю новое значение');
      const res = fib(n - 2) + fib(n - 1);
      results[n] = res;
      return res;
    }
  };
  return fib(n);
};

// console.log(memoizedFibHOF(100));

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// Configuration Object (Объект конфигурации)
// Цель: уменьшить количество принимаемых функцией аргументов

const printThisDude = (dude) => {
  const { name, surname, age, gender } = dude;
  console.log(
    `Имя: ${name}, Фамилия: ${surname}, Возраст: ${age}, Пол: ${
      gender || 'Ещё не определился'
    }`
  );
};

const dude1 = {
  name: 'Иван',
  surname: 'Иванов',
  age: 27,
  gender: 'Муж.',
};

const dude2 = {
  name: 'Иван',
  surname: 'Петров',
  age: 28,
};

// printThisDude(dude1);
// printThisDude(dude2);

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

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

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// CALLBACK (КОЛБЭК)
// Цель: передать функцию внутрь другой функции для вызова в будущем
// Вариант применения: чтобы сделать функцию обобщенной и сосредоточенной на
// одной конкретной задаче - можно выделить части логики в колбэки и вызывать
// их по мере необходимости.

type callback<T> = (arg: T) => T;

const someFunctionWhichOnlyReturnsSomeString = (cb: callback<string>) => {
  const str = 'ПрИвЕт!';
  return cb(str);
};

const someCBWhichDoesSomeAdditionalUsefulWork = (str: string) => {
  return str.toUpperCase();
};

// console.log(
//   someFunctionWhichOnlyReturnsSomeString(
//     someCBWhichDoesSomeAdditionalUsefulWork
//   )
// );
//------------------------------------------------------------------------------

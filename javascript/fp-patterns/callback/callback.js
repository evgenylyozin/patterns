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


// client
console.log(
  someFunctionWhichOnlyReturnsSomeString(
    someCBWhichDoesSomeAdditionalUsefulWork
  )
);

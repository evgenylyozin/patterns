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

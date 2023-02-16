// Вариант с полем внутри объекта функции
// результаты операции сохраняются в поле results
const memoizedFib = (n: number): number => {
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

// фактическое сохранение первичных результатов в поле results
memoizedFib.results = { 0: 0, 1: 1, 2: 1 } as { [key: number]: number };

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ------------------------------- Клиентский код -------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
console.log(memoizedFib(100));

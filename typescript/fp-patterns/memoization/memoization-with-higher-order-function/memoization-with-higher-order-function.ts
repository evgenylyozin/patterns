// Вариант с функцией высшего порядка
const memoizedFibHOF = (n: number) => {
  const results = { 0: 0, 1: 1, 2: 1 } as { [key: number]: number };
  const fib = (n: number): number => {
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

console.log(memoizedFibHOF(100));

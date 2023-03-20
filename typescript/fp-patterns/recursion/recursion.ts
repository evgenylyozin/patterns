// Пример рекурсивного расчета факториала
const factorial = (n: number): number => {
  // Базовый случай
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
};

// Другой пример рекурсивной функции
function countDown(n: number) {
  // Базовый случай
  if (n <= 0) {
    console.log('Поехали!');
  } else {
    console.log(n);
    countDown(n - 1);
  }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ------------------------------- Клиентский код -------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

console.log(factorial(5)); // => 120
countDown(5); // => 5 4 3 2 1 Поехали!

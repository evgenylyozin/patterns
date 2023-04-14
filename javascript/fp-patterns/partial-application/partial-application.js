// Простое частичное применение при помощи bind
const add = (a, b) => {
  return a + b;
};

const addFive = add.bind(null, 5); // привяжем часть аргументов

console.log(addFive(3)); // 8
console.log(addFive(7)); // 12

// Частичное применения при помощи вспомогательной функции и apply
function apply(fn, args) {
  return fn.apply(null, args);
}

const addFiveApply = apply.bind(null, add, [5]); // partial application of add function with [5] argument

console.log(addFive(3)); // 8
console.log(addFive(7)); // 12

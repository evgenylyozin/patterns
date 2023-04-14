// Простое частичное применение при помощи bind
const add = (a: number, b: number): number => {
  return a + b;
};

const addFive = add.bind(null, 5); // привяжем часть аргументов

console.log(addFive(3)); // 8
console.log(addFive(7)); // 12

// Частичное применения при помощи вспомогательной функции и apply
function apply(fn: Function, args: any[]) {
  return fn.apply(null, args);
}

const addFiveApply = apply.bind(null, add, [5]); // partial application of add function with [5] argument

console.log(addFive(3)); // 8
console.log(addFive(7)); // 12

// Обобщение частичного применения средствами Typescript
type PartiallyApplyArgs<TArgs extends any[], TReturn> = (
  ...args: TArgs
) => TReturn;

type PartialApply<TArgs extends any[], TReturn> = (
  fn: PartiallyApplyArgs<TArgs, TReturn>,
  ...args: TArgs
) => PartiallyApplyArgs<TArgs, TReturn>;

const partialApply: PartialApply<number[], number> =
  (fn, ...appliedArgs) =>
  (...args) =>
    fn(...appliedArgs, ...args);

const addPartial = partialApply(add, 1);
const result = addPartial(2);
console.log(result); // 3

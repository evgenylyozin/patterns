//------------------------------------------------------------------------------
// PROTOTYPE (ПРОТОТИП)
// ЦЕЛЬ: создать схему объекта и посредством её копирования (клонирования)
// получать новые схожие объекты

const someObj = {
  a: 'b',
  c: 'd',
} as const;

type otherObj<T> = T & { e: 'f'; __proto__: T };

// назначение прототипа конкретному объекту в TS рекомендуется делать при помощи
// Object.create
const otherObj: otherObj<typeof someObj> = Object.create(someObj, {
  e: { value: 'f' },
});

// console.log(otherObj.a);
// console.log(otherObj.c);
// console.log(otherObj.e);
// console.log(otherObj.__proto__ === someObj);

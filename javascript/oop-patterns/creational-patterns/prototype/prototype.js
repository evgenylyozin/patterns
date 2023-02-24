const someObj = {
  a: 'b',
  c: 'd',
};

// назначение прототипа конкретному объекту в JS рекомендуется делать при помощи
// Object.create
const otherObj = Object.create(someObj, { e: { value: 'f' } });

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
console.log(otherObj.a);
console.log(otherObj.c);
console.log(otherObj.e);
console.log(otherObj.__proto__ === someObj);

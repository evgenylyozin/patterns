// IIFE с возвращаемым значением
const singleton = ((str) => {
  console.log(`${str} от IIFE, создающей одиночку`);
  console.log('Создаю одиночку');
  return {
    name: 'Одиночка',
  };
})('Привет');

console.log('Меня зовут', singleton.name);

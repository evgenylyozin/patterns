// IIFE с возвращаемым значением
const singleton = ((str: string) => {
  console.log(`${str} от IIFE, создающей синглтон`);
  console.log('Создаю Синглтон');
  return {
    name: 'Синглтон',
  };
})('Привет');

console.log('Меня зовут', singleton.name);

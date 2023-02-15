// Функция-конструктор, которая вернёт настроенный объект
const newBlackCat = () => {
  const blackCat = {
    color: 'black',
    meow: () => {
      console.log('Мяу, я черный кот!');
    },
  };
  return blackCat;
};

// КЛИЕНТ
const blackCat = newBlackCat();
blackCat.meow();
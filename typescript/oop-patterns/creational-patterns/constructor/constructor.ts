type blackCat = {
  color: 'black';
  meow: () => void;
};

// Функция-конструктор, которая вернёт настроенный объект
const newBlackCat = () => {
  const blackCat: blackCat = {
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
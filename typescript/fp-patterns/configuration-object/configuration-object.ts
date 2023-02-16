// Тип объекта конфигурации
type config = {
  name: string;
  surname: string;
  age: number;
  gender?: string;
};

// Функция, которая принимает объект в качестве
// аргумента, вместо того, чтобы принимать массу
// аргументов одновременно
const printThisDude = (dude: config) => {
  const { name, surname, age, gender } = dude;
  console.log(
    `Имя: ${name}, Фамилия: ${surname}, Возраст: ${age}, Пол: ${
      gender || 'Ещё не определился'
    }`
  );
};

const dude1: config = {
  name: 'Иван',
  surname: 'Иванов',
  age: 27,
  gender: 'Муж.',
};

const dude2: config = {
  name: 'Иван',
  surname: 'Петров',
  age: 28,
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
printThisDude(dude1);
printThisDude(dude2);

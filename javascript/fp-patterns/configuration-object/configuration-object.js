// Функция, которая принимает объект в качестве
// аргумента, вместо того, чтобы принимать массу
// аргументов одновременно
const printThisDude = (dude) => {
  const { name, surname, age, gender } = dude;
  console.log(
    `Имя: ${name}, Фамилия: ${surname}, Возраст: ${age}, Пол: ${
      gender || 'Ещё не определился'
    }`
  );
};

const dude1 = {
  name: 'Иван',
  surname: 'Иванов',
  age: 27,
  gender: 'Муж.',
};

const dude2 = {
  name: 'Иван',
  surname: 'Петров',
  age: 28,
};



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
printThisDude(dude1);
printThisDude(dude2);

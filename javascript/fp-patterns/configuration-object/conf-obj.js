//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// Configuration Object (Объект конфигурации)
// Цель: уменьшить количество принимаемых функцией аргументов

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


// КЛИЕНТ
printThisDude(dude1);
printThisDude(dude2);

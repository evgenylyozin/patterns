// -- Уточнение --
// Начиная с ES6 можно создать нужный объект в отдельном модуле и экспортировать
// его, в таком случае не будет необходимости оформлять IIFE или специальный
// класс

// Пример с классом
class SingletonClass {
  private static instance: SingletonClass | null = null;
  constructor() {
    if (SingletonClass.instance) {
      return SingletonClass.instance;
    }
    SingletonClass.instance = this;
    return SingletonClass.instance;
  }
}

// Пример с IIFE
type DBObj = {
  name: string;
};
const Singleton = (() => {
  let instance: DBObj | null = null;
  const createInstance = () => {
    return { name: 'Объект базы данных' };
  };
  return {
    instantiate: () => {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Тест классового подхода
console.log(new SingletonClass() === new SingletonClass());

// Тест IIFE
const firstInstance = Singleton.instantiate();
const secondInstance = Singleton.instantiate();

console.log(firstInstance.name);
console.log(secondInstance.name);
console.log(firstInstance === secondInstance);

firstInstance.name = 'ОБНОВЛЁННЫЙ объект базы данных';

console.log(firstInstance.name);
console.log(secondInstance.name);
console.log(firstInstance === secondInstance);

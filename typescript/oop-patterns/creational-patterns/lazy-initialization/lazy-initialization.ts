type InitData = {
  ops: number;
};

// При создании экземпляра класса, возвращается объект без данных и ещё не
// выполнивший ряд трудоёмких операций
// Созданный объект имеет метод init, только после вызова которого всё
// вышеперечисленное происходит
class LazilyInitialized {
  private initData: InitData;
  private data: string = '';
  constructor(initData: InitData) {
    this.initData = initData;
    console.log(`Создали объект, который ещё не 
    настроен и не выполнил ряд трудоёмких
    операций, ожидаем запроса на его инициализацию...`);
  }

  public async init() {
    if (!this.data) {
      console.log(`Получили запрос на инициализацию, выполняем столько 
    трудоёмких операций: ${this.initData.ops} `);
      this.handleExpensiveOperations();
      await sleep(this.initData.ops);
      console.log(`Операции завершены, наполняем объект данными...`);
      await sleep(2);
      this.data = 'Данные, хранящиеся внутри объекта';
      console.log(
        `Инициализация объекта завершена, данные внутри объекта: ${this.data}`
      );
      // Повторный запрос на инициализацию того же объекта обычно не должен вновь
      // запускать цикл операций и заполнения данными
    } else {
      console.log(
        `Объект уже был инициализирован ранее, данные внутри объекта: ${this.data}`
      );
    }
  }

  private handleExpensiveOperations() {
    console.log('Выполняю затратные операции...');
  }
}

// Вспомогательная функция для того, чтобы показать задержки
// при выполнении трудоёмких операций
const sleep = (seconds: number) => {
  return new Promise((res) => {
    setTimeout(res, seconds * 1000);
  });
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const testLazilyInitializedObject = async () => {
  // сколько операций передано - столько секунд будет "работать" метод выполнения трудоёмких операций
  const lazy = new LazilyInitialized({ ops: 5 });
  await sleep(4);
  await lazy.init();
  await sleep(4);
  console.log('Пробуем инициализировать снова...');
  await lazy.init();
};

testLazilyInitializedObject();

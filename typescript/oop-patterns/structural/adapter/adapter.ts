// ADAPTER (АДАПТЕР)
// ЦЕЛЬ: создать промежуточное звено между двумя объектами, интерфейсы
// которых не сопоставимы, но которым нужно взаимодействовать между собой

// Существует какой-либо объект или класс, который активно используется в коде
// или клиентом
class OldButUsefulLogger {
  public log(anything: any): void {
    console.log(
      `Тип переданных для логирования данных: ${typeof anything}, данные: ${anything}`
    );
  }
}

interface Logger {
  printString(data: string): void;
  printNumber(data: number): void;
  printAny(data: any): void;
}

// Появляется новый класс, который мы начинаем активно использовать в коде для
// логирования, т.к. он поддерживает больше методов и может использовать любые
// логгеры с определённым интерфейсом под капотом
class BrandNewLogger {
  logger: Logger;
  constructor(logger: Logger) {
    this.logger = logger;
  }
  private checkTheTypeOfData = (data: any): string => {
    return typeof data;
  };
  public log = (data: any): void => {
    switch (this.checkTheTypeOfData(data)) {
      case 'string':
        this.logger.printString(data);
        break;
      case 'number':
        this.logger.printNumber(data);
        break;
      default:
        this.logger.printAny(data);
    }
  };
}

// Проблема в том, что мы хотели бы продолжать использовать старый логгер,
// но его интерфейс не соответствует новым требованиям
// в таком случае можно создать адаптер и передавать его в качестве логгера
class AdapterForGoodOldLogger {
  logger: OldButUsefulLogger;
  constructor() {
    this.logger = new OldButUsefulLogger();
  }
  public printString = (data: string): void => {
    this.logger.log(data);
  };
  public printNumber = (data: number): void => {
    this.logger.log(data);
  };
  public printAny = (data: any): void => {
    this.logger.log(data);
  };
}

// Старый код выглядит так:

// const logger = new OldButUsefulLogger();
// logger.log('Привет, я строка');
// logger.log(42);
// logger.log([1, 2, 3, 4, 5]);

// В новом коде нужно заменить только создание логгера, остальной код трогать не нужно
// и теперь можно использовать любой логгер с соответствующим интерфейсом,
// в том числе и старый:
//
// const logger = new BrandNewLogger(new AdapterForGoodOldLogger());
// logger.log('Привет, я строка');
// logger.log(42);
// logger.log([1, 2, 3, 4, 5]);

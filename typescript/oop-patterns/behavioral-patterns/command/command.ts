// интерфейс для определения методов для выполнения команды
interface Command {
  execute(): void;
}

// в самом простом варианте объект команды может самостоятельно выполнить
// действия для обработки запроса
class SimpleCommand implements Command {
  private payload: string;

  constructor(payload: string) {
    this.payload = payload;
  }

  public execute(): void {
    console.log(
      `Простая команда: Я могу делать простые вещи, например вывести это: \
(${this.payload})`
    );
  }
}

// Более сложные операции выполняются командами за счёт делегирования задач
// другим объектам бизнес логики (Ресиверам)
class ComplexCommand implements Command {
  private receiver: Receiver;

  private a: string;

  private b: string;

  // Сложные команды получают один или несколько ресиверов и необходимые
  // данные через конструктор
  constructor(receiver: Receiver, a: string, b: string) {
    this.receiver = receiver;
    this.a = a;
    this.b = b;
  }

  public execute(): void {
    console.log(
      'Сложная команда: Сложные вещи должны исполняться объектом-получателем.'
    );
    this.receiver.doSomething(this.a);
    this.receiver.doSomethingElse(this.b);
  }
}

// Ресивер - непосредственный исполнитель сложных бизнес задач (любой объект,
// который знает как обработать запрос)
class Receiver {
  public doSomething(a: string): void {
    console.log(`Получатель: Работаю над (${a}.)`);
  }

  public doSomethingElse(b: string): void {
    console.log(`Получатель: Так же работаю над (${b}.)`);
  }
}

// Инвокер - объект, который содержит в себе ссылки на команды
// клиент работает с этим объектом, вызывая его методы и регистрируя
// необходимые команды и ресиверы
class Invoker {
  private onStart: Command | undefined;

  private onFinish: Command | undefined;

  public setOnStart(command: Command): void {
    this.onStart = command;
  }

  public setOnFinish(command: Command): void {
    this.onFinish = command;
  }

  public doSomethingImportant(): void {
    console.log(
      'Инвокер: Если кто-то хочет сделать что-то перед тем, как я \
начну работу - самое время. '
    );
    if (this.isCommand(this.onStart)) {
      this.onStart.execute();
    }

    console.log('Инвокер: ...делаю что-то очень важное...');

    console.log(
      'Инвокер: Если кто-то хочет сделать что-то после того, как я \
закончил свою работу - самое время.'
    );
    if (this.isCommand(this.onFinish)) {
      this.onFinish.execute();
    }
  }

  private isCommand(object: any): object is Command {
    return object.execute !== undefined;
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand('Скажи привет!'));
const receiver = new Receiver();
invoker.setOnFinish(
  new ComplexCommand(receiver, 'Отправить письмо', 'Сохранить отчет')
);

invoker.doSomethingImportant();

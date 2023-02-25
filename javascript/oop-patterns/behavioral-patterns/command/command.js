// в самом простом варианте объект команды может самостоятельно выполнить
// действия для обработки запроса
class SimpleCommand {
  payload;

  constructor(payload) {
    this.payload = payload;
  }

  execute() {
    console.log(
      `Простая команда: Я могу делать простые вещи, например вывести это: \
(${this.payload})`
    );
  }
}

// Более сложные операции выполняются командами за счёт делегирования задач
// другим объектам бизнес логики (Ресиверам)
class ComplexCommand {
  receiver;
  a;
  b;

  // Сложные команды получают один или несколько ресиверов и необходимые
  // данные через конструктор
  constructor(receiver, a, b) {
    this.receiver = receiver;
    this.a = a;
    this.b = b;
  }

  execute() {
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
  doSomething(a) {
    console.log(`Получатель: Работаю над (${a}.)`);
  }

  doSomethingElse(b) {
    console.log(`Получатель: Так же работаю над (${b}.)`);
  }
}

// Инвокер - объект, который содержит в себе ссылки на команды
// клиент работает с этим объектом, вызывая его методы и регистрируя
// необходимые команды и ресиверы
class Invoker {
  onStart;

  onFinish;

  setOnStart(command) {
    this.onStart = command;
  }

  setOnFinish(command) {
    this.onFinish = command;
  }

  doSomethingImportant() {
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

  isCommand(object) {
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
  new ComplexCommand(receiver, 'Отправить почту', 'Сохранить отчет')
);

invoker.doSomethingImportant();

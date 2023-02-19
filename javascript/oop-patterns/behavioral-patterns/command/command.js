// в самом простом варианте объект команды может самостоятельно выполнить
// действия для обработки запроса
class SimpleCommand {
  payload;

  constructor(payload) {
    this.payload = payload;
  }

  execute() {
    console.log(
      `SimpleCommand: See, I can do simple things like printing (${this.payload})`
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
      'ComplexCommand: Complex stuff should be done by a receiver object.'
    );
    this.receiver.doSomething(this.a);
    this.receiver.doSomethingElse(this.b);
  }
}

// Ресивер - непосредственный исполнитель сложных бизнес задач (любой объект,
// который знает как обработать запрос)
class Receiver {
  doSomething(a) {
    console.log(`Receiver: Working on (${a}.)`);
  }

  doSomethingElse(b) {
    console.log(`Receiver: Also working on (${b}.)`);
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
    console.log('Invoker: Does anybody want something done before I begin?');
    if (this.isCommand(this.onStart)) {
      this.onStart.execute();
    }

    console.log('Invoker: ...doing something really important...');

    console.log('Invoker: Does anybody want something done after I finish?');
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
invoker.setOnStart(new SimpleCommand('Say Hi!'));
const receiver = new Receiver();
invoker.setOnFinish(new ComplexCommand(receiver, 'Send email', 'Save report'));

invoker.doSomethingImportant();

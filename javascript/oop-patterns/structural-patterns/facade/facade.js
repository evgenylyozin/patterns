// Фасад предлагает простой интерфейс для клиента, при этом скрывая внутри себя
// взаимодействия с одной или несколькими подсистемами. Запрос клиента
// передаётся соответствующим объектам подсистем, при этом происходит инициализация
// нужных объектов, вызов их методов в правильной последовательности и т.п.
// Фасад защищает клиентский код от всех этих сложностей.
// Фасад может предлагать ограниченный функционал по сравнению с реальной
// подсистемой, то есть вызывать исключительно те методы подсистемы,
// которые необходимы клиентскому коду.
class Facade {
  subsystem1;
  subsystem2;
  constructor(subsystem1 = new Subsystem1(), subsystem2 = new Subsystem2()) {
    this.subsystem1 = subsystem1;
    this.subsystem2 = subsystem2;
  }

  operation() {
    let result = 'Фасад инициализирует подсистемы:\n';
    result += this.subsystem1.operation1();
    result += this.subsystem2.operation1();
    result += 'Фасад вызывает определённые операции на подсистемах:\n';
    result += this.subsystem1.operationN();
    result += this.subsystem2.operationZ();
    return result;
  }
}

// Конкретная подсистема может принимать запросы непосредственно от клиента
// или через фасад, но в последнем случае фасад является клиентом подсистемы
// и в саму подсистему не входит
class Subsystem1 {
  operation1() {
    return 'Подсистема 1: Готов!\n';
  }
  operationN() {
    return 'Подсистема 1: Поехали!\n';
  }
}

class Subsystem2 {
  operation1() {
    return 'Подсистема 2: Всегда готов!\n';
  }
  operationZ() {
    return 'Подсистема 2: Огонь!';
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();
const facade = new Facade(subsystem1, subsystem2);
console.log(facade.operation());

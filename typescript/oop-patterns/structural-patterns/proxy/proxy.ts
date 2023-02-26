// Интерфейс, который ожидает видеть клиент, ему должен соответствовать
// как реальный объект, так и прокси
interface Subject {
  request(): void;
}

// Реальный объект, содержит бизнес логику, но может быть слишком
// тяжеловесным, чтобы использовать его для каждого запроса, либо может
// быть слабо защищён и т.п.
class RealSubject implements Subject {
  public request(): void {
    console.log('Реальный объект: Работаю с запросом.');
  }
}

// Прокси имеет тот же интерфейс, что и реальный объект
class ProxyObj implements Subject {
  private realSubject: RealSubject;

  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }

  public request(): void {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  private checkAccess(): boolean {
    console.log(
      'Заместитель: Проверяю права доступа перед тем, как обработать запрос.'
    );
    return true;
  }

  private logAccess(): void {
    console.log('Заместитель: Записываю время и дату запроса.');
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const proxy = new ProxyObj(new RealSubject());
proxy.request();

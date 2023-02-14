//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// PROXY (ПРОКСИ)
// ЦЕЛЬ: контролировать входящие и/или исходящие из проксируемого объекта
// данные
// ВАРИАНТЫ ИСПОЛЬЗОВАНИЯ: проверка прав доступа, кеширование, очистка ввода,
// логирование, статистика и т.д.

// Реальный проксируемый объект, содержит бизнес логику, но может быть слишком
// тяжеловесным, чтобы использовать его для каждого запроса, либо может
// быть слабо защищён и т.п.
class RealSubject {
  request() {
    console.log('RealSubject: Handling request.');
  }
}

// Прокси имеет тот же интерфейс, что и проксируемый объект
class ProxyObj {
  realSubject;

  constructor(realSubject) {
    this.realSubject = realSubject;
  }

  request() {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  checkAccess() {
    console.log('Proxy: Checking access prior to firing a real request.');
    return true;
  }

  logAccess() {
    console.log('Proxy: Logging the time of request.');
  }
}

// const proxy = new ProxyObj(new RealSubject());
// proxy.request();

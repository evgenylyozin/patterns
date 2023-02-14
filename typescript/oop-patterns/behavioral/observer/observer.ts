//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// OBSERVER (НАБЛЮДАТЕЛЬ)
// ЦЕЛЬ: организовать систему оповещений о событиях, происходящих с каким-либо
// объектом

// Интерфейс наблюдателя содержит методы, которые дают каблюдателю
// возможность получать уведомления от субъекта
interface Observer {
  notify(evt: string): void;
  getName(): string;
}
// Интерфейс Publisher определяет возможность подписываться и отписываться от
// уведомлений от субъекта, а так же имеет метод для оповещения всех
// текущих подписчиков субъекта
interface Publisher {
  subscribe(obs: Observer): Publisher;
  unsubscribe(obs: Observer): Publisher;
  notifyAll(evt: string): void;
}

class ConcreteObserver1 implements Observer {
  public notify(evt: string): void {
    console.log('Первый конкретный наблюдатель получил уведомление:', evt);
  }
  public getName(): string {
    return 'ConcreteObserver1';
  }
}

class ConcreteObserver2 implements Observer {
  public notify(evt: string): void {
    console.log('Второй конкретный наблюдатель получил уведомление:', evt);
  }
  public getName(): string {
    return 'ConcreteObserver2';
  }
}

class ConcreteObserver3 implements Observer {
  public notify(evt: string): void {
    console.log('Третий конкретный наблюдатель получил уведомление:', evt);
  }
  public getName(): string {
    return 'ConcreteObserver3';
  }
}

class ConcretePublisher implements Publisher {
  private observers: Observer[] = [];
  public notifyAll(evt: string): void {
    for (let observer of this.observers) {
      observer.notify(evt);
    }
  }
  public subscribe(obs: Observer): Publisher {
    this.observers.push(obs);
    return this;
  }

  public unsubscribe(obs: Observer): Publisher {
    const idx = this.observers.findIndex((observ) => observ === obs);
    if (idx !== -1) {
      this.observers = [
        ...this.observers.slice(0, idx),
        ...this.observers.slice(idx + 1),
      ];
    }
    return this;
  }
  public printObservers(): void {
    for (let obs of this.observers) {
      console.log(obs.getName());
    }
  }
}

// const publisher = new ConcretePublisher();

// const observer1 = new ConcreteObserver1();
// const observer2 = new ConcreteObserver2();
// const observer3 = new ConcreteObserver3();

// publisher.subscribe(observer1).subscribe(observer2).subscribe(observer3);

// publisher.printObservers();

// publisher.notifyAll('ПРИВЕТ!');

// publisher.unsubscribe(observer2);

// publisher.printObservers();

// publisher.notifyAll('ПОКА!');

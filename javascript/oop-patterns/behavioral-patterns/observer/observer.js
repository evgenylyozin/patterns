class ConcreteObserver1 {
  notify(evt) {
    console.log('Первый конкретный наблюдатель получил уведомление:', evt);
  }
  getName() {
    return 'ConcreteObserver1';
  }
}

class ConcreteObserver2 {
  notify(evt) {
    console.log('Второй конкретный наблюдатель получил уведомление:', evt);
  }
  getName() {
    return 'ConcreteObserver2';
  }
}

class ConcreteObserver3 {
  notify(evt) {
    console.log('Третий конкретный наблюдатель получил уведомление:', evt);
  }
  getName() {
    return 'ConcreteObserver3';
  }
}

class ConcretePublisher {
  observers = [];
  notifyAll(evt) {
    for (let observer of this.observers) {
      observer.notify(evt);
    }
  }
  subscribe(obs) {
    this.observers.push(obs);
    return this;
  }

  unsubscribe(obs) {
    const idx = this.observers.findIndex((observ) => observ === obs);
    if (idx !== -1) {
      this.observers = [
        ...this.observers.slice(0, idx),
        ...this.observers.slice(idx + 1),
      ];
    }
    return this;
  }
  printObservers() {
    for (let obs of this.observers) {
      console.log(obs.getName());
    }
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const publisher = new ConcretePublisher();

const observer1 = new ConcreteObserver1();
const observer2 = new ConcreteObserver2();
const observer3 = new ConcreteObserver3();

publisher.subscribe(observer1).subscribe(observer2).subscribe(observer3);

publisher.printObservers();

publisher.notifyAll('ПРИВЕТ!');

publisher.unsubscribe(observer2);

publisher.printObservers();

publisher.notifyAll('ПОКА!');

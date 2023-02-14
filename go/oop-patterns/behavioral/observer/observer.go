package main

import "fmt"

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// OBSERVER (НАБЛЮДАТЕЛЬ)
// ЦЕЛЬ: организовать систему оповещений о событиях, происходящих с каким-либо
// объектом

// Интерфейс наблюдателя содержит методы, которые дают каблюдателю
// возможность получать уведомления от субъекта
type observer interface {
	notify(evt string)
	getName() string
}

// Интерфейс Publisher определяет возможность подписываться и отписываться от
// уведомлений от субъекта, а так же имеет метод для оповещения всех
// текущих подписчиков субъекта
type publisher interface {
	subscribe(obs observer) publisher
	unsubscribe(obs observer) publisher
	notifyAll(evt string)
}

type concreteObserver1 struct {
}

func (o *concreteObserver1) notify(evt string) {
	fmt.Println("Первый конкретный наблюдатель получил уведомление:", evt)
}
func (o *concreteObserver1) getName() string {
	return "ConcreteObserver1"
}

type concreteObserver2 struct {
}

func (o *concreteObserver2) notify(evt string) {
	fmt.Println("Второй конкретный наблюдатель получил уведомление:", evt)
}
func (o *concreteObserver2) getName() string {
	return "ConcreteObserver2"
}

type concreteObserver3 struct {
}

func (o *concreteObserver3) notify(evt string) {
	fmt.Println("Третий конкретный наблюдатель получил уведомление:", evt)
}
func (o *concreteObserver3) getName() string {
	return "ConcreteObserver3"
}

type concretePublisher struct {
	observers []observer
}

func (p *concretePublisher) notifyAll(evt string) {
	for _, observer := range p.observers {
		(observer).notify(evt)
	}
}
func (p *concretePublisher) subscribe(obs observer) publisher {
	p.observers = append(p.observers, obs)
	return p
}

func (p *concretePublisher) unsubscribe(obs observer) publisher {
	idx := -1
	for i, observer := range p.observers {

		if observer == obs {
			idx = i
			break
		}
	}
	if idx != -1 {
		rest := make([]observer, 0)
		if (idx + 1) < len(p.observers) {
			rest = append(rest, p.observers[idx+1:]...)
		}
		p.observers = append(p.observers[0:idx], rest...)
	}
	return p
}
func (p *concretePublisher) printObservers() {
	for _, obs := range p.observers {
		fmt.Println((obs).getName())
	}
}

// publisher := concretePublisher{}

// observer1 := &concreteObserver1{}
// observer2 := &concreteObserver2{}
// observer3 := &concreteObserver3{}

// publisher.subscribe(observer1).subscribe(observer2).subscribe(observer3)

// publisher.printObservers()

// publisher.notifyAll("ПРИВЕТ!")

// publisher.unsubscribe(observer2)

// publisher.printObservers()

// publisher.notifyAll("ПОКА!")


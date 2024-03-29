package main

import "fmt"

// Контекст - объект, используемый клиентом. Он хранит в себе ссылку на объект
// текущего состояния и меняет своё поведение в зависимости от этого
// состояния
type context struct {
	state iState
}

func (c *context) transitionTo(s iState) {
	fmt.Println("Контекст: Переход к", s.getName())
	c.state = s
	s.setContext(*c)
}

func (c *context) request1() {
	c.state.handle1()
}

func (c *context) request2() {
	c.state.handle2()
}

// Базовое состояние содержит методы, которые должны присутствовать в каждом
// объекте состояния, а так же ссылку на контекст для того, чтобы
// иметь возможность его изменить
type state struct {
	context *context
	name    string
}

type iState interface {
	getName() string
	setContext(context context)
	handle1()
	handle2()
}

func (s *state) setContext(context context) {
	s.context = &context
}
func (s *state) handle1() {
}
func (s *state) handle2() {
}
func (s *state) getName() string {
	return s.name
}

type concreteStateA struct {
	state
}

func (s *concreteStateA) handle1() {
	fmt.Println("ConcreteStateA обрабатывает request1.")
	fmt.Println("ConcreteStateA хочет изменить состояние контекста.")
	s.context.transitionTo(&concreteStateB{state{name: "concreteStateB"}})
}

func (s *concreteStateA) handle2() {
	fmt.Println("ConcreteStateA обрабатывает request2.")

}

type concreteStateB struct {
	state
}

func (s *concreteStateB) handle1() {
	fmt.Println("ConcreteStateB обрабатывает request2.")
}

func (s *concreteStateB) handle2() {
	fmt.Println("ConcreteStateB обрабатывает request2.")
	fmt.Println("ConcreteStateB хочет изменить состояние контекста.")
	s.context.transitionTo(&concreteStateA{state{name: "concreteStateA"}})
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

func main() {
	context := context{}
	initialState := &concreteStateA{state{name: "concreteStateA", context: &context}}
	context.state = initialState
	context.request1()
	context.request2()
}

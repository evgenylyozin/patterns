package main

import "fmt"

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// STATE (СОСТОЯНИЕ)
// ЦЕЛЬ: организовать систему объектов внути которой при изменении состояния
// меняется поведение объектов
// ВАРИАНТ ПРИМЕНЕНИЯ: разгрузка массивных блоков if или swith, когда они
// работают с состоянием

// Контекст - объект, используемый клиентом. Он хранит в себе ссылку на объект
// текущего состояния и меняет своё поведение в зависимости от этого
// состояния
type context struct {
	state iState
}

func (c *context) transitionTo(s iState) {
	fmt.Println("Context: Transition to", s.getName())
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
	fmt.Println("ConcreteStateA handles request1.")
	fmt.Println("ConcreteStateA wants to change the state of the context.")
	s.context.transitionTo(&concreteStateB{state{name: "concreteStateB", context: s.context}})
}

func (s *concreteStateA) handle2() {
	fmt.Println("ConcreteStateA handles request2.")

}

type concreteStateB struct {
	state
}

func (s *concreteStateB) handle1() {
	fmt.Println("ConcreteStateB handles request2.")
}

func (s *concreteStateB) handle2() {
	fmt.Println("ConcreteStateB handles request2.")
	fmt.Println("ConcreteStateB wants to change the state of the context.")
	s.context.transitionTo(&concreteStateA{state{name: "concreteStateA", context: s.context}})
}

// context := context{}
// initialState := &concreteStateA{state{name: "concreteStateA", context: &context}}
// context.state = initialState
// context.request1()
// context.request2()

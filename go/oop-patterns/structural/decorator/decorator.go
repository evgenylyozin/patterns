package main

import "fmt"

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// Decorator (ДЕКОРАТОР)
// ЦЕЛЬ: расширить функционал конкретного объекта, не меняя при этом логики
// класса (схемы), из которого был создан объект

// Интерфейс объекта, который оборачивается
// ему должны так же следовать все обёртки, чтобы клиентский код
// мог без труда использовать столько декораторов, сколько угодно
type iDecorated interface {
	log(data string)
}

// Конкретный объект со стандартной имплементацией операций
type decorated struct {
}

func (d *decorated) log(data string) {
	fmt.Println(data)
}

// Базовый декоратор должен так же следовать интерфейсу оборачиваемого объекта
type decorator struct {
	decorated iDecorated
}

func (d *decorator) log(data string) {
	d.decorated.log(data)
}

// Конкретные декораторы следуют интерфейсу оборачиваемого объекта и
// манипулируют данными, передаваемыми в него или получаемыми от него
type concreteDecoratorA struct {
	decorator
}

func (d *concreteDecoratorA) log(data string) {
	data = fmt.Sprintf("Декоратор А преобразовал данные, строка до преобразования:\n%v", data)
	d.decorator.log(data)
}

func newConcreteDecoratorA(d iDecorated) *concreteDecoratorA {
	return &concreteDecoratorA{decorator{decorated: d}}
}

type concreteDecoratorB struct {
	decorator
}

func (d *concreteDecoratorB) log(data string) {
	data = fmt.Sprintf("Декоратор B преобразовал данные, строка до преобразования:\n%v", data)
	d.decorator.log(data)
}

func newConcreteDecoratorB(d iDecorated) *concreteDecoratorB {
	return &concreteDecoratorB{decorator{decorated: d}}
}

// decorated := &decorated{}
// decoratorA := newConcreteDecoratorA(decorated)
// decoratorB := newConcreteDecoratorB(decoratorA)

// decorated.log("Привет!")
// decoratorA.log("Привет!")
// decoratorB.log("Привет!")

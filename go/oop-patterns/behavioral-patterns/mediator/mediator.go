package main

import "fmt"

// Метод notify на посреднике принимает события и вызывает методы на
// нужных объектах в соответствии с ними
type mediator interface {
	notify(sender any, event string)
}

// Конкретный посредник включает в себя логику координации между различными
// объектами
type concreteMediator struct {
	component1 component1
	component2 component2
}

func (m *concreteMediator) notify(sender any, event string) {
	if event == "A" {
		fmt.Println("Mediator reacts on A and triggers following operations:")
		m.component2.doC()
	}

	if event == "D" {
		fmt.Println("Mediator reacts on D and triggers following operations:")
		m.component1.doB()
		m.component2.doC()
	}
}

// Все остальные объекты должны хранить ссылку на посредника, чтобы вызывать
// его метод notify
type baseComponent struct {
	mediator mediator
}

// Конкретные объекты содержат бизнес логику и не зависят ни от других компонентов
// ни от конкретного посредника (т.к. они сохраняют в себе ссылку на любого
// конкретного посредника)
type component1 struct {
	baseComponent
}

func (c *component1) doA() {
	fmt.Println("Component 1 does A.")
	c.mediator.notify(c, "A")
}

func (c *component1) doB() {
	fmt.Println("Component 1 does B.")
	c.mediator.notify(c, "B")
}

type component2 struct {
	baseComponent
}

func (c *component2) doC() {
	fmt.Println("Component 2 does C.")
	c.mediator.notify(c, "C")
}

func (c *component2) doD() {
	fmt.Println("Component 2 does D.")
	c.mediator.notify(c, "D")
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ------------------------------- Клиентский код -------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
func main() {
	mediator := &concreteMediator{}
	c1 := component1{baseComponent{mediator: mediator}}
	c2 := component2{baseComponent{mediator: mediator}}

	mediator.component1 = c1
	mediator.component2 = c2

	fmt.Println("Client triggers operation A.")
	c1.doA()

	fmt.Println("")
	fmt.Println("Client triggers operation D.")
	c2.doD()
}

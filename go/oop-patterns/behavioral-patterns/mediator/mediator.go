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
	if event == "А" {
		fmt.Println(`Посредник реагирует на событие "А" и задействует 
следующие операции:`)
		m.component2.doC()
	}

	if event == "Г" {
		fmt.Println(`Посредник реагирует на событие "Г" и задействует 
следующие операции:`)
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
	fmt.Println("Компонент 1 делает А.")
	c.mediator.notify(c, "А")
}

func (c *component1) doB() {
	fmt.Println("Компонент 1 делает Б.")
	c.mediator.notify(c, "Б")
}

type component2 struct {
	baseComponent
}

func (c *component2) doC() {
	fmt.Println("Компонент 2 делает В.")
	c.mediator.notify(c, "В")
}

func (c *component2) doD() {
	fmt.Println("Компонент 2 делает Г.")
	c.mediator.notify(c, "Г")
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

	fmt.Println("Клиент задействует операцию А.")
	c1.doA()

	fmt.Println("")
	fmt.Println("Клиент задействует операцию Г.")
	c2.doD()
}

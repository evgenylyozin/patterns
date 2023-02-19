package main

import "fmt"

// интерфейс для определения методов для выполнения команды
type command interface {
	execute()
}

// в самом простом варианте объект команды может самостоятельно выполнить
// действия для обработки запроса
type simpleCommand struct {
	payload string
}

func (c *simpleCommand) execute() {
	fmt.Printf("SimpleCommand: See, I can do simple things like printing (%v)\n", c.payload)
}

// Более сложные операции выполняются командами за счёт делегирования задач
// другим объектам бизнес логики (Ресиверам)
type complexCommand struct {
	receiver receiver

	a string

	b string
}

func (c *complexCommand) execute() {
	fmt.Println(
		"ComplexCommand: Complex stuff should be done by a receiver object.")
	c.receiver.doSomething(c.a)
	c.receiver.doSomethingElse(c.b)
}

// Ресивер - непосредственный исполнитель сложных бизнес задач (любой объект,
// который знает как обработать запрос)
type receiver struct {
}

func (r *receiver) doSomething(a string) {
	fmt.Printf("Receiver: Working on (%v)\n", a)
}
func (r *receiver) doSomethingElse(b string) {
	fmt.Printf("Receiver: Also working on (%v)\n", b)
}

// Инвокер - объект, который содержит в себе ссылки на команды
// клиент работает с этим объектом, вызывая его методы и регистрируя
// необходимые команды и ресиверы
type invoker struct {
	onStart  command
	onFinish command
}

func (i *invoker) setOnStart(command command) {
	i.onStart = command
}
func (i *invoker) setOnFinish(command command) {
	i.onFinish = command
}

func (i *invoker) doSomethingImportant() {
	fmt.Println("Invoker: Does anybody want something done before I begin?")
	if i.onStart != nil {
		i.onStart.execute()
	}

	fmt.Println("Invoker: ...doing something really important...")

	fmt.Println("Invoker: Does anybody want something done after I finish?")
	if i.onFinish != nil {
		i.onFinish.execute()
	}
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

func main() {
	receiver := receiver{}
	command1 := simpleCommand{}
	command2 := complexCommand{receiver: receiver, a: "Send email", b: "Send report"}
	invoker := invoker{}
	invoker.setOnStart(&command1)
	invoker.setOnFinish(&command2)
	invoker.doSomethingImportant()
}

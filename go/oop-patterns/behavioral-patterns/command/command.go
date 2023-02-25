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
	fmt.Printf(
		"Простая команда: Я могу делать простые вещи, например вывести это:  (%v)\n",
		c.payload)
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
		"Сложная команда: Сложные вещи должны исполняться объектом-получателем.")
	c.receiver.doSomething(c.a)
	c.receiver.doSomethingElse(c.b)
}

// Ресивер - непосредственный исполнитель сложных бизнес задач (любой объект,
// который знает как обработать запрос)
type receiver struct {
}

func (r *receiver) doSomething(a string) {
	fmt.Printf("Получатель: Работаю над (%v)\n", a)
}
func (r *receiver) doSomethingElse(b string) {
	fmt.Printf("Получатель: Так же работаю над (%v)\n", b)
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
	fmt.Println(`Инвокер: Если кто-то хочет сделать что-то перед тем,
	 как я начну работу - самое время.`)
	if i.onStart != nil {
		i.onStart.execute()
	}

	fmt.Println("Инвокер: ...делаю что-то очень важное...")

	fmt.Println(`Инвокер: Если кто-то хочет сделать что-то после того, как я 
	закончил свою работу - самое время.`)
	if i.onFinish != nil {
		i.onFinish.execute()
	}
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

func main() {
	receiver := receiver{}
	command1 := simpleCommand{payload: "ПРИВЕТ!"}
	command2 := complexCommand{
		receiver: receiver,
		a:        "Отправить письмо",
		b:        "Сохранить отчет"}
	invoker := invoker{}
	invoker.setOnStart(&command1)
	invoker.setOnFinish(&command2)
	invoker.doSomethingImportant()
}

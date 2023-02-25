package main

import (
	"fmt"
	"math/rand"
	"time"
)

// объект, состояние которого нужно сохранять и восстанавливать
// должен иметь методы для сохранения своего состояния в объект снимка и
// восстановления своего состояния из такого объекта
type originator struct {
	state string
}

func (o *originator) doSomething() {
	fmt.Println("Источник: Делаю что-то важное.")
	o.state = o.generateRandomString(30)
	fmt.Printf("Источник: моё состояние изменилось на:  %v\n", o.state)
}

func (o *originator) generateRandomString(length int) string {
	charSet := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	randChars := make([]rune, length)
	randNums := rand.Perm(len(charSet))
	for i := range randChars {
		randChars[i] = rune(charSet[randNums[i]])
	}
	return string(randChars)
}

func (o *originator) save() memento {
	return &concreteMemento{state: o.state, date: time.Now().Format(time.RFC822)}
}

func (o *originator) restore(memento memento) {
	o.state = memento.getState()
	fmt.Printf("Источник: моё состояние изменилось на:  %v\n", o.state)
}

// Интерфейс снимка должен давать возможность получить данные о состоянии
// обратно
type memento interface {
	getState() string

	getName() string

	getDate() string
}

type concreteMemento struct {
	state string
	date  string
}

func (m *concreteMemento) getState() string {
	return m.state
}

func (m *concreteMemento) getName() string {

	return fmt.Sprintf("%v / (%v...)", m.date, m.state[:10])
}

func (m *concreteMemento) getDate() string {
	return m.date
}

// Смотритель напрямую не зависит от конкретного снимка
// он так же не зависит от конкретного объекта, чьё состояние сохраняется
// его задача - хранить снимки и вызывать соответствующие методы
// других объектов для сохранения и восстановления состояния
type caretaker struct {
	mementos []memento

	originator *originator
}

func (c *caretaker) backup() {
	fmt.Println("\nСмотритель: Сохраняю состояние источника...")
	c.mementos = append(c.mementos, c.originator.save())
}

func (c *caretaker) undo() {
	length := len(c.mementos)
	if length < 1 {
		return
	}
	memento := c.mementos[length-1]
	c.mementos = c.mementos[:length-1]

	fmt.Printf("Смотритель: восстанавливаю состояние источника до: %v\n", memento.getName())
	c.originator.restore(memento)
}

func (c *caretaker) showHistory() {
	fmt.Println("Смотритель: вот весь текущий список объектов-снимков:")
	for _, memento := range c.mementos {
		fmt.Println(memento.getName())
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ------------------------------- Клиентский код -------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
func main() {
	originator := &originator{state: "Изначальное состояние"}
	caretaker := caretaker{originator: originator}

	caretaker.backup()
	originator.doSomething()

	caretaker.backup()
	originator.doSomething()

	caretaker.backup()
	originator.doSomething()

	fmt.Println("")
	caretaker.showHistory()

	fmt.Println("\nКлиент: откатываю состояние")
	caretaker.undo()

	fmt.Println("\nКлиент: откатываю ещё раз")
	caretaker.undo()
}

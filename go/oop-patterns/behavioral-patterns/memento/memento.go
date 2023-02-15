package main

import (
	"fmt"
	"math/rand"
	"time"
)

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// MEMENTO (СНИМОК)
// ЦЕЛЬ: получить созможность восстанавливать предыдущее состояние объекта

// объект, состояние которого нужно сохранять и восстанавливать
// должен иметь методы для сохранения своего состояния в объект снимка и
// восстановления своего состояния из такого объекта
type originator struct {
	state string
}

func (o *originator) doSomething() {
	fmt.Println("Originator: I'm doing something important.")
	o.state = o.generateRandomString(30)
	fmt.Printf("Originator: and my state has changed to: %v\n", o.state)
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
	fmt.Printf("Originator: My state has changed to: %v\n", o.state)
}

// Интерфейс мементо объекта должен давать возможность получить данные о состоянии
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

// Объект класса Caretaker напрямую не зависит от конкретного мементо объекта
// он так же не зависит от конкретного объекта, чьё состояние сохраняется
// его задача - хранить объекты мементов и вызывать соответствующие методы
// других объектов для сохранения и восстановления состояния
type caretaker struct {
	mementos []memento

	originator *originator
}

func (c *caretaker) backup() {
	fmt.Println("\nCaretaker: Saving Originator's state...")
	c.mementos = append(c.mementos, c.originator.save())
}

func (c *caretaker) undo() {
	length := len(c.mementos)
	if length < 1 {
		return
	}
	memento := c.mementos[length-1]
	c.mementos = c.mementos[:length-1]

	fmt.Printf("Caretaker: Restoring state to: %v\n", memento.getName())
	c.originator.restore(memento)
}

func (c *caretaker) showHistory() {
	fmt.Println("Caretaker: Here's the list of mementos:")
	for _, memento := range c.mementos {
		fmt.Println(memento.getName())
	}
}

// originator := &originator{state: "Super-duper-super-puper-super."}
// caretaker := caretaker{originator: originator}

// caretaker.backup()
// originator.doSomething()

// caretaker.backup()
// originator.doSomething()

// caretaker.backup()
// originator.doSomething()

// fmt.Println("")
// caretaker.showHistory()

// fmt.Println("\nClient: Now, let's rollback!")
// caretaker.undo()

// fmt.Println("\nClient: Once more!")
// caretaker.undo()
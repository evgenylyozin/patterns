package main

import "fmt"

// Слуга предоставляет дополнительную функциональность для обслуживаемых
// объектов, при этом он знает только интерфейс обслуживаемых объектов и
// может вызывать соответствующие методы
type printServant struct {
}

// Распечатать информацию об обслуживаемом объекте
func (ps *printServant) print(p printable) {
	fmt.Printf("Меня зовут %v, я %v и мне %v лет.\n", p.getName(), p.getType(), p.getAge())
}

// Интерфейс указывает на то, какие методы должны быть определены обслуживаемыми
// классами
type printable interface {
	getName() string
	getAge() int
	getType() string
}

// Конкретные обслуживаемые типы, реализующие интерфейс
type person struct {
	name string
	age  int
}

func (p *person) getName() string {
	return p.name
}
func (p *person) getAge() int {
	return p.age
}
func (p *person) getType() string {
	return "Человек"
}

func newPerson(name string, age int) *person {
	return &person{name, age}
}

type dog struct {
	name string
	age  int
}

func (d *dog) getName() string {
	return d.name
}
func (d *dog) getAge() int {
	return d.age
}
func (d *dog) getType() string {
	return "Собака"
}

func newDog(name string, age int) *dog {
	return &dog{name, age}
}

type cat struct {
	name string
	age  int
}

func (c *cat) getName() string {
	return c.name
}
func (c *cat) getAge() int {
	return c.age
}
func (c *cat) getType() string {
	return "Кот"
}

func newCat(name string, age int) *cat {
	return &cat{name, age}
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

func main() {
	p := newPerson("Марс", 30)
	d := newDog("Плутон", 6)
	c := newCat("Юпитер", 8)

	servant := printServant{}

	servant.print(p)
	servant.print(d)
	servant.print(c)
}

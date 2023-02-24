package main

import "fmt"

// абстрактный прототип указывает на методы, которые обязаны присутствовать
// в конкретных прототипах
type prototype interface {
	print()
	clone() prototype
}

// конкретные прототипы имеют свои специфические данные, но обязаны иметь метод
// для копирования своих данных и возвращения нового объекта того же типа на их основе
type concretePrototype1 struct {
	name string
}

func (p *concretePrototype1) print() {
	fmt.Println(p.name)
}
func (p *concretePrototype1) clone() prototype {
	return &concretePrototype1{name: p.name}
}

type concretePrototype2 struct {
	name string
	age  int
}

func (p *concretePrototype2) print() {
	fmt.Println(p.name, "my age is", p.age)
}
func (p *concretePrototype2) clone() prototype {
	return &concretePrototype2{name: p.name, age: p.age}
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

func main() {
	cp1 := concretePrototype1{name: "I'm prototype 1"}
	cp2 := concretePrototype2{name: "I'm prototype 2", age: 30}

	cloneOfProto1 := cp1.clone()
	cloneOfProto2 := cp2.clone()

	cloneOfProto1.print()
	cloneOfProto2.print()

	cloneOfProto1.(*concretePrototype1).name = "I'm a clone of prototype 1"
	cloneOfProto2.(*concretePrototype2).name = "I'm a clone of prototype 2"
	cloneOfProto2.(*concretePrototype2).age = 21

	cloneOfProto1.print()
	cloneOfProto2.print()

	cp1.print()
	cp2.print()
}

package main

import "fmt"

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// VISITOR (ПОСЕТИТЕЛЬ)
// ЦЕЛЬ: Отделить алгоритмы от объектов на которых они оперируют
// ВАРИАНТ ИСПОЛЬЗОВАНИЯ: Предположим, есть структура с узлами разных типов,
// например HTML дерево и есть задача превратить это дерево в XML документ без
// определения доп. методов для возврата данных для XML на каждом типе узлов.
// Можно создать специальный
// объект, который сможет принимать любой тип узла, забирать из него нужную
// информацию и строить XML документ

// Каждый компонент, который нужно посетить должен содержать метод,
// который позволит принять посетителя
type component interface {
	accept(visitor visitor)
}

type concreteComponentA struct {
}

func (cc *concreteComponentA) accept(visitor visitor) {
	visitor.visitConcreteComponentA(cc)
}
func (cc *concreteComponentA) exclusiveMethodOfConcreteComponentA() string {
	return "A"
}

type concreteComponentB struct {
}

func (cc *concreteComponentB) accept(visitor visitor) {
	visitor.visitConcreteComponentB(cc)
}
func (cc *concreteComponentB) exclusiveMethodOfConcreteComponentB() string {
	return "B"
}

// Каждый посетитель должен иметь методы для посещения конкретных компонентов
type visitor interface {
	visitConcreteComponentA(element *concreteComponentA)
	visitConcreteComponentB(element *concreteComponentB)
}

type concreteVisitor1 struct {
}

func (cv *concreteVisitor1) visitConcreteComponentA(element *concreteComponentA) {

	fmt.Println(element.exclusiveMethodOfConcreteComponentA(), "+ ConcreteVisitor1")

}

func (cv *concreteVisitor1) visitConcreteComponentB(element *concreteComponentB) {

	fmt.Println(element.exclusiveMethodOfConcreteComponentB(), "+ ConcreteVisitor1")

}

type concreteVisitor2 struct {
}

func (cv *concreteVisitor2) visitConcreteComponentA(element *concreteComponentA) {

	fmt.Println(element.exclusiveMethodOfConcreteComponentA(), "+ ConcreteVisitor2")

}

func (cv *concreteVisitor2) visitConcreteComponentB(element *concreteComponentB) {

	fmt.Println(element.exclusiveMethodOfConcreteComponentB(), "+ ConcreteVisitor2")

}

// comp1 := concreteComponentA{}
// comp2 := concreteComponentB{}

// fmt.Println(
// 	"The client code works with all visitors via the base Visitor interface:")
// visitor1 := &concreteVisitor1{}
// visitor2 := &concreteVisitor2{}
// fmt.Println("It allows the same client code to work with different types of visitors:")

// comp1.accept(visitor1)
// comp1.accept(visitor2)
// comp2.accept(visitor1)
// comp2.accept(visitor2)

//------------------------------------------------------------------------------

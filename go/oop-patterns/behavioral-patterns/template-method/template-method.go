package main

import (
	"fmt"
	"os"
)

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// TEMPLATE METHOD (ШАБЛОННЫЙ МЕТОД)
// ЦЕЛЬ: устранить повторный код внутри похожих объектов путём переноса общих
// частей в 1  базовую структуру, и определения методов для перезаписи объектами,
// основанными на базовой структуре
// ВАРИАНТ ИСПОЛЬЗОВАНИЯ: в приложении обработки файлов различных текстовых
// форматов возможно создание массы объектов обработчиков, которые будут
// отличаться только логикой прохода по файлу, а в остальном будут идентичны
// в таких случаях можно создать базовую структуру и перенести туда все общие части,
// а отличающиеся методы определить в базовой структуре и переписать в объектах,
// основанных на базовом

// Базовый объект определяет структуру конкретных объектов, в частности
// методы, которые:
// - могут быть общими для всех и соответственно имплементированы внутри базового объекта
// - могут быть разными для всех и поэтому абстрактны и не определены внутри базового объекта
// - могут быть общими для некоторых и не использоваться или перезаписываться остальными,
// а потому определены в базовом объекте и могут перезаписываться или игнорироваться
// объектами, основанными на нём
type abstractClass struct {
}

// Шаблонный метод - скелет всего алгоритма
func (ac *abstractClass) templateMethod() {
	ac.baseOperation1()
	error := ac.requiredOperations1()
	if error != nil {
		fmt.Println(error.Error())
		os.Exit(1)
	}
	ac.baseOperation2()
	ac.hook1()
	error = ac.requiredOperation2()
	if error != nil {
		fmt.Println(error.Error())
		os.Exit(1)
	}
	ac.baseOperation3()
	ac.hook2()
}

func (ac *abstractClass) baseOperation1() {
	fmt.Println("AbstractClass says: I am doing the bulk of the work")
}

func (ac *abstractClass) baseOperation2() {
	fmt.Println(
		"AbstractClass says: But I let subclasses override some operations")
}

func (ac *abstractClass) baseOperation3() {
	fmt.Println(
		"AbstractClass says: But I am doing the bulk of the work anyway")
}

// Эти операции должны быть переопределены наследующими объектами
func (ac *abstractClass) requiredOperations1() error {
	return fmt.Errorf("requiredOperations1 нужно переопределить в наследующем объекте")
}
func (ac *abstractClass) requiredOperation2() error {
	return fmt.Errorf("requiredOperation2 нужно переопределить в наследующем объекте")
}

// Эти операции могут быть переопределены наследующими объектами или проигнорированы
func (ac *abstractClass) hook1() {}
func (ac *abstractClass) hook2() {}

type concreteClass1 struct {
	abstractClass
}

// Шаблонный метод - скелет всего алгоритма
func (cc *concreteClass1) templateMethod() {
	cc.baseOperation1()
	error := cc.requiredOperations1()
	if error != nil {
		fmt.Println(error.Error())
		os.Exit(1)
	}
	cc.baseOperation2()
	cc.hook1()
	error = cc.requiredOperation2()
	if error != nil {
		fmt.Println(error.Error())
		os.Exit(1)
	}
	cc.baseOperation3()
	cc.hook2()
}

func (cc *concreteClass1) requiredOperations1() error {
	fmt.Println("ConcreteClass1 says: Implemented Operation1")
	return nil
}

func (cc *concreteClass1) requiredOperation2() error {
	fmt.Println("ConcreteClass1 says: Implemented Operation2")
	return nil
}

type concreteClass2 struct {
	abstractClass
}

func (cc *concreteClass2) templateMethod() {
	cc.baseOperation1()
	error := cc.requiredOperations1()
	if error != nil {
		fmt.Println(error.Error())
		os.Exit(1)
	}
	cc.baseOperation2()
	cc.hook1()
	error = cc.requiredOperation2()
	if error != nil {
		fmt.Println(error.Error())
		os.Exit(1)
	}
	cc.baseOperation3()
	cc.hook2()
}

func (cc *concreteClass2) requiredOperations1() error {
	fmt.Println("ConcreteClass2 says: Implemented Operation1")
	return nil
}

func (cc *concreteClass2) requiredOperation2() error {
	fmt.Println("ConcreteClass2 says: Implemented Operation2")
	return nil
}

func (cc *concreteClass2) hook1() {
	fmt.Println("ConcreteClass2 says: Overridden Hook1")
}

// Интерфейс, который будет использоваться в клиентском коде
type iAbstractClass interface {
	templateMethod()
	baseOperation1()

	baseOperation2()
	baseOperation3()
	requiredOperations1() error
	requiredOperation2() error

	hook1()
	hook2()
}

// import "fmt"

// func clientCode(concreteClass iAbstractClass) {
// 	fmt.Println("Same client code can work with different subclasses:")
// 	concreteClass.templateMethod()
// }

// func main() {
// 	clientCode(&concreteClass1{abstractClass: abstractClass{}})
// 	clientCode(&concreteClass2{abstractClass: abstractClass{}})
// }
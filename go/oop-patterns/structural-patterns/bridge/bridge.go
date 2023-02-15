package main

import "fmt"

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// BRIDGE (МОСТ)
// ЦЕЛЬ: разгрузить сложную систему объектов и отделить конкретные операции от
// высокоуровневых (более абстрактных)
// ПРИМЕНЕНИЕ: при необходимости поддерживать различные платформы, использовать
// разные внешние API или структуры

// Абстрактный мост содержит ссылку на конкретную имплементацию требуемых операций
// и вызывается клиентом
type abstractBridge struct {
	implementation implementation
}

func (b *abstractBridge) operation() string {
	result := b.implementation.operationImplementation()
	return fmt.Sprintf("Abstraction: Base operation with:\n%v", result)
}

func newAbscractBridge(i implementation) *abstractBridge {
	return &abstractBridge{implementation: i}
}

// Абстрактную часть можно расширять независимо от имплементаций
type extendedAbstractBridge struct {
	abstractBridge
}

func (b *extendedAbstractBridge) operation() string {
	result := b.implementation.operationImplementation()
	return fmt.Sprintf("ExtendedAbstraction: Extended operation with:\n%v", result)
}

func newExtendedAbscractBridge(i implementation) *extendedAbstractBridge {
	return &extendedAbstractBridge{abstractBridge: abstractBridge{implementation: i}}
}

// Интерфейс для каждого класса имплементации
type implementation interface {
	operationImplementation() string
}

// Конкретная имплементация представляет из себя конкретные операции, которые потом
// будут использованы через абстрактный мост клиентом
// таким образом, при условии соответствия интерфейсу имплементации, можно
// использовать разные внешние API объекты и т.д. внутри разных имплементаций
type concreteImplementationA struct {
}

func (i *concreteImplementationA) operationImplementation() string {
	return "ConcreteImplementationA: Here's the result on the platform A."
}

type concreteImplementationB struct {
}

func (i *concreteImplementationB) operationImplementation() string {
	return "ConcreteImplementationB: Here's the result on the platform B."
}

// implA := concreteImplementationA{}
// implB := concreteImplementationB{}
// absBridge := newAbscractBridge(&implA)
// extendedAbsBridge := newExtendedAbscractBridge(&implB)

// fmt.Println(absBridge.operation())
// fmt.Println(extendedAbsBridge.operation())

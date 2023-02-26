package main

import "fmt"

// Абстрактный мост содержит ссылку на конкретную реализацию требуемых операций
// и вызывается клиентом
type abstractBridge struct {
	implementation implementation
}

func (b *abstractBridge) operation() string {
	result := b.implementation.operationImplementation()
	return fmt.Sprintf("Абстракция: Базовая операция вместе с конкретной реализацией:\n%v", result)
}

func newAbstractBridge(i implementation) *abstractBridge {
	return &abstractBridge{implementation: i}
}

// Абстрактную часть можно расширять независимо от реализаций
type extendedAbstractBridge struct {
	abstractBridge
}

func (b *extendedAbstractBridge) operation() string {
	result := b.implementation.operationImplementation()
	return fmt.Sprintf(`Расширенная абстракция: Расширенная операция вместе с 
конкретной реализацией: %v`, result)
}

func newExtendedAbstractBridge(i implementation) *extendedAbstractBridge {
	return &extendedAbstractBridge{abstractBridge: abstractBridge{implementation: i}}
}

// Интерфейс для каждого класса реализации
type implementation interface {
	operationImplementation() string
}

// Конкретная реализация представляет из себя конкретные операции, которые потом
// будут использованы через абстрактный мост клиентом
// таким образом, при условии соответствия интерфейсу реализации, можно
// использовать разные внешние API объекты и т.д. внутри разных реализаций
type concreteImplementationA struct {
}

func (i *concreteImplementationA) operationImplementation() string {
	return "Конкретная реализация типа \"А\": Результат на платформе \"А\"."
}

type concreteImplementationB struct {
}

func (i *concreteImplementationB) operationImplementation() string {
	return "Конкретная реализация типа \"Б\": Результат на платформе \"Б\"."
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ------------------------------- Клиентский код -------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
func main() {
	implA := concreteImplementationA{}
	implB := concreteImplementationB{}
	absBridge := newAbstractBridge(&implA)
	extendedAbsBridge := newExtendedAbstractBridge(&implB)

	fmt.Println(absBridge.operation())
	fmt.Println(extendedAbsBridge.operation())
}

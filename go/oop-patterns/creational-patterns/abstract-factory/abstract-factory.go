package main

import "fmt"

// интерфейс абстрактной фабрики делает совместимыми конкретные фабрики и стандартизирует
// типы продуктов, которые они выпускают
type abstractFactory interface {
	createProductA() *abstractProductA
	createProductB() *abstractProductB
}

// интерфейс для каждого выпускаемого типа продуктов стандартизирует
// признаки, присущие конкретному типу продукта, что делает их взаимозаменяемыми
type abstractProductA interface {
	mandatoryFeatureOfA()
}

type abstractProductB interface {
	mandatoryFeatureOfB()
}

// Конкретный продукт следует интерфейсу своего типа, но может иметь и свои особенные черты
type concreteProductAType1 struct {
}

func (p *concreteProductAType1) mandatoryFeatureOfA() {
	fmt.Println("All A products have this feature")
}
func (p *concreteProductAType1) specialFeatureOfAType1() {
	fmt.Println("This feature is only in As of type 1")
}

type concreteProductAType2 struct {
}

func (p *concreteProductAType2) mandatoryFeatureOfA() {
	fmt.Println("All A products have this feature")
}
func (p *concreteProductAType2) specialFeatureOfAType2() {
	fmt.Println("This feature is only in As of type 2")
}

type concreteProductBType1 struct {
}

func (p *concreteProductBType1) mandatoryFeatureOfB() {
	fmt.Println("All B products have this feature")
}
func (p *concreteProductBType1) specialFeatureOfBType1() {
	fmt.Println("This feature is only in Bs of type 1")
}

type concreteProductBType2 struct {
}

func (p *concreteProductBType2) mandatoryFeatureOfB() {
	fmt.Println("All B products have this feature")
}
func (p *concreteProductBType2) specialFeatureOfBType2() {
	fmt.Println("This feature is only in Bs of type 2")
}

// Конкретная фабрика, следуя интерфейсу абстрактной фабрики, выпускает все необходимые
// типы конкретных продуктов, при этом каждая фабрика производит ряд этих продуктов со
// своими особенностями (например, одна фабрика производит набор кнопок черного цвета, а другая
// тот же набор белого цвета)
type concreteFactory1 struct {
}

func (f *concreteFactory1) createProductA() abstractProductA {
	return &concreteProductAType1{}
}
func (f *concreteFactory1) createProductB() abstractProductB {
	return &concreteProductBType1{}
}

type concreteFactory2 struct {
}

func (f *concreteFactory2) createProductA() abstractProductA {
	return &concreteProductAType2{}
}
func (f *concreteFactory2) createProductB() abstractProductB {
	return &concreteProductBType2{}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ------------------------------- Клиентский код -------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
func main() {
	factoryOfType1Products := &concreteFactory1{}
	factoryOfType2Products := &concreteFactory2{}

	productAType1 := factoryOfType1Products.createProductA()
	productAType2 := factoryOfType2Products.createProductA()
	productBType1 := factoryOfType1Products.createProductB()
	productBType2 := factoryOfType2Products.createProductB()

	productAType1.mandatoryFeatureOfA()
	productAType1.(*concreteProductAType1).specialFeatureOfAType1()
	productAType2.mandatoryFeatureOfA()
	productAType2.(*concreteProductAType2).specialFeatureOfAType2()

	productBType1.mandatoryFeatureOfB()
	productBType1.(*concreteProductBType1).specialFeatureOfBType1()
	productBType2.mandatoryFeatureOfB()
	productBType2.(*concreteProductBType2).specialFeatureOfBType2()
}

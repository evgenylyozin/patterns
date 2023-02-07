package main

import "fmt"

// CREATIONAL DESIGN PATTERNS
// Patterns for handling objects creation
//
// --todo--
// - Prototype
// - Singleton
// - Builder
//
// ------------------------------------------------------------------------------
// CONSTRUCTOR
// Aim: to create an object with the specified settings
type blackCat struct {
	color string
}

func (c *blackCat) meow() {
	fmt.Println("Meow, my color is", c.color)
}

type whiteCat struct {
	color string
}

func (c *whiteCat) meow() {
	fmt.Println("Meow, my color is", c.color)
}

type meower interface {
	meow()
}

func newBlackCat() *blackCat {
	return &blackCat{color: "black"}
}

func newWhiteCat() *whiteCat {
	return &whiteCat{color: "white"}
}

// whiteCat := newWhiteCat()
// blackCat := newBlackCat()
// fmt.Println(whiteCat.color, blackCat.color)
//------------------------------------------------------------------------------

// ------------------------------------------------------------------------------
// FACTORY
// Aim: to hide objects creation details
func catsFactory(t string) (meower, error) {
	switch t {
	case "black":
		return newBlackCat(), nil
	case "white":
		return newWhiteCat(), nil
	default:
		return nil, fmt.Errorf("Unknown cat type")
	}
}

// whiteCat, error := catsFactory("white")
//
//	if error == nil {
//		whiteCat.meow()
//	}
//	blackCat, error := catsFactory("black")
//	if error == nil {
//		blackCat.meow()
//	}
//	unknownCat, error := catsFactory("???")
//	if error == nil {
//		unknownCat.meow()
//	} else {
//		fmt.Println(error.Error())
//	}
//
// ------------------------------------------------------------------------------
// ABSTRACT FACTORY
// Aim: to produce compatible but different objects
type abstractFactory interface {
	createProductA() *abstractProductA
	createProductB() *abstractProductB
}

type abstractProductA interface {
	mondatoryFeatureOfA()
}

type abstractProductB interface {
	mondatoryFeatureOfB()
}

type concreteProductAType1 struct {
}

func (p *concreteProductAType1) mondatoryFeatureOfA() {
	fmt.Println("All A products have this feature")
}
func (p *concreteProductAType1) specialFeatureOfAType1() {
	fmt.Println("This feature is only in As of type 1")
}

type concreteProductAType2 struct {
}

func (p *concreteProductAType2) mondatoryFeatureOfA() {
	fmt.Println("All A products have this feature")
}
func (p *concreteProductAType2) specialFeatureOfAType2() {
	fmt.Println("This feature is only in As of type 2")
}

type concreteProductBType1 struct {
}

func (p *concreteProductBType1) mondatoryFeatureOfB() {
	fmt.Println("All B products have this feature")
}
func (p *concreteProductBType1) specialFeatureOfBType1() {
	fmt.Println("This feature is only in Bs of type 1")
}

type concreteProductBType2 struct {
}

func (p *concreteProductBType2) mondatoryFeatureOfB() {
	fmt.Println("All B products have this feature")
}
func (p *concreteProductBType2) specialFeatureOfBType2() {
	fmt.Println("This feature is only in Bs of type 2")
}

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

// factoryOfType1Products := &concreteFactory1{}
// factoryOfType2Products := &concreteFactory2{}

// productAType1 := factoryOfType1Products.createProductA()
// productAType2 := factoryOfType2Products.createProductA()
// productBType1 := factoryOfType1Products.createProductB()
// productBType2 := factoryOfType2Products.createProductB()

// productAType1.mondatoryFeatureOfA()
// productAType1.(*concreteProductAType1).specialFeatureOfAType1()
// productAType2.mondatoryFeatureOfA()
// productAType2.(*concreteProductAType2).specialFeatureOfAType2()

// productBType1.mondatoryFeatureOfB()
// productBType1.(*concreteProductBType1).specialFeatureOfBType1()
// productBType2.mondatoryFeatureOfB()
// productBType2.(*concreteProductBType2).specialFeatureOfBType2()
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//
// STRUCTURAL DESIGN PATTERNS
// To organize relationships between objects

// --note--
//
// --todo--
// - Adapter
// - Bridge
// - Composite
// - Decorator
// - Facade
// - Flyweight
// - Proxy
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//
// BEHAVIORAL DESIGN PATTERNS
// To handle communication between heterogeneous objects

// --note--
//
// --todo--
// - Chain of Responsibility
// - Command
// - Iterator
// - Mediator
// - Memento
// - Observer
// - State
// - Strategy
//------------------------------------------------------------------------------

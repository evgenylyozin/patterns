package main

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"strings"
	"sync"
	"time"
)

// CREATIONAL DESIGN PATTERNS
// Patterns for handling objects creation
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
// PROTOTYPE (ПРОТОТИП)
// ЦЕЛЬ: создать схему объекта и посредством её копирования (клонирования)
// получать новые схожие объекты

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

// cp1 := concretePrototype1{name: "I'm prototype 1"}
// cp2 := concretePrototype2{name: "I'm prototype 2", age: 30}

// cloneOfProto1 := cp1.clone()
// cloneOfProto2 := cp2.clone()

// cloneOfProto1.print()
// cloneOfProto2.print()

// cloneOfProto1.(*concretePrototype1).name = "I'm a clone of prototype 1"
// cloneOfProto2.(*concretePrototype2).name = "I'm a clone of prototype 2"
// cloneOfProto2.(*concretePrototype2).age = 21

// cloneOfProto1.print()
// cloneOfProto2.print()

// cp1.print()
// cp2.print()

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// SINGLETON (СИНГЛТОН)
// ЦЕЛЬ: создать только 1 объект определённого типа. А в случае повторного
// запроса на получение такого объекта отдавать ссылку на уже созданный.
// ВАРИАНТ ИСПОЛЬЗОВАНИЯ: объект для работы с БД

var lock = &sync.Mutex{}

type singleton struct {
	name string
}

var singleInstance *singleton

func getSingletonInstance() *singleton {
	if singleInstance == nil {
		lock.Lock()
		defer lock.Unlock()
		if singleInstance == nil {
			fmt.Println("Creating single instance now.")
			singleInstance = &singleton{name: "DB Object"}
		} else {
			fmt.Println("Single instance already created.")
		}
	} else {
		fmt.Println("Single instance already created.")
	}
	return singleInstance
}

// singleton1 := getSingletonInstance()
// singleton2 := getSingletonInstance()

// fmt.Println(singleton1.name)
// fmt.Println(singleton2.name)

// singleton1.name = "UPDATED DB Object"

// fmt.Println(singleton1.name)
// fmt.Println(singleton2.name)

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// BUILDER (СТРОИТЕЛЬ)
// ЦЕЛЬ: организовать систему для пошагового создания сложных настраиваемых
// объектов или разгрузить сложную функцию-конструктор

// Тип для объекта, который будут строить билдеры
type house struct {
	windowType string
	doorType   string
	floor      int
}

// Интерфейс, которого должен придерживаться каждый билдер
type iHouseBuilder interface {
	setWindowType()
	setDoorType()
	setNumFloor()
	getHouse() house
}

// Конкретный билдер
type normalBuilder struct {
	house
}

func newNormalBuilder() *normalBuilder {
	return &normalBuilder{}
}

func (b *normalBuilder) setWindowType() {
	b.windowType = "Wooden Window"
}

func (b *normalBuilder) setDoorType() {
	b.doorType = "Wooden Door"
}

func (b *normalBuilder) setNumFloor() {
	b.floor = 2
}

func (b *normalBuilder) getHouse() house {
	return house{
		doorType:   b.doorType,
		windowType: b.windowType,
		floor:      b.floor,
	}
}

type iglooBuilder struct {
	house
}

func newIglooBuilder() *iglooBuilder {
	return &iglooBuilder{}
}

func (b *iglooBuilder) setWindowType() {
	b.windowType = "Snow Window"
}

func (b *iglooBuilder) setDoorType() {
	b.doorType = "Snow Door"
}

func (b *iglooBuilder) setNumFloor() {
	b.floor = 1
}

func (b *iglooBuilder) getHouse() house {
	return house{
		doorType:   b.doorType,
		windowType: b.windowType,
		floor:      b.floor,
	}
}

// Хелпер для получения нужного типа билдера
func getBuilder(builderType string) iHouseBuilder {
	if builderType == "normal" {
		return newNormalBuilder()
	}

	if builderType == "igloo" {
		return newIglooBuilder()
	}
	return nil
}

// Тип для директора билдеров, хранит в себе конкретного билдера для постройки объекта
type director struct {
	builder iHouseBuilder
}

func newDirector(b iHouseBuilder) *director {
	return &director{
		builder: b,
	}
}

func (d *director) setBuilder(b iHouseBuilder) {
	d.builder = b
}

// Основной метод, нужный клиенту для того, чтобы получить созданный объект
func (d *director) buildHouse() house {
	d.builder.setDoorType()
	d.builder.setWindowType()
	d.builder.setNumFloor()
	return d.builder.getHouse()
}

// normalBuilder := getBuilder("normal")
// iglooBuilder := getBuilder("igloo")

// director := newDirector(normalBuilder)
// normalHouse := director.buildHouse()

// fmt.Printf("Normal House Door Type: %s\n", normalHouse.doorType)
// fmt.Printf("Normal House Window Type: %s\n", normalHouse.windowType)
// fmt.Printf("Normal House Num Floor: %d\n", normalHouse.floor)

// director.setBuilder(iglooBuilder)
// iglooHouse := director.buildHouse()

// fmt.Printf("\nIgloo House Door Type: %s\n", iglooHouse.doorType)
// fmt.Printf("Igloo House Window Type: %s\n", iglooHouse.windowType)
// fmt.Printf("Igloo House Num Floor: %d\n", iglooHouse.floor)

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//
// STRUCTURAL DESIGN PATTERNS
// To organize relationships between objects
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// ADAPTER (АДАПТЕР)
// ЦЕЛЬ: создать промежуточное звено между двумя объектами, интерфейсы
// которых не сопоставимы, но которым нужно взаимодействовать между собой

// Существует какой-либо объект, который активно используется в коде
// или клиентом
type oldButUsefulLogger struct {
}

func (l *oldButUsefulLogger) log(data interface{}) {
	fmt.Printf("Тип переданных для логирования данных: %T, данные: %v\n", data, data)
}

type any interface{}
type logger interface {
	printString(data string)
	printInt(data int)
	printAny(data any)
}

// Появляется новый объект, который мы начинаем активно использовать в коде для
// логирования, т.к. он поддерживает больше методов и может использовать любые
// логгеры с определённым интерфейсом под капотом
type brandNewLogger struct {
	logger logger
}

func (l *brandNewLogger) log(data any) {
	switch fmt.Sprintf("%T", data) {
	case "string":
		l.logger.printString(data.(string))
		break
	case "int":
		l.logger.printInt(data.(int))
		break
	default:
		l.logger.printAny(data)
	}
}

// Проблема в том, что мы хотели бы продолжать использовать старый логгер,
// но его интерфейс не соответствует новым требованиям
// в таком случае можно создать адаптер и передавать его в качестве логгера
type adapterForGoodOldLogger struct {
	logger oldButUsefulLogger
}

func (a *adapterForGoodOldLogger) printString(data string) {
	a.logger.log(data)
}
func (a *adapterForGoodOldLogger) printInt(data int) {
	a.logger.log(data)
}
func (a *adapterForGoodOldLogger) printAny(data any) {
	a.logger.log(data)
}

func newBrandNewLogger() *brandNewLogger {
	return &brandNewLogger{logger: &adapterForGoodOldLogger{logger: oldButUsefulLogger{}}}
}

// Старый код выглядит так:

// logger := oldButUsefulLogger{}
// logger.log("Привет, я строка")
// logger.log(42)
// logger.log([]int{1, 2, 3, 4, 5})

// В новом коде нужно заменить только создание логгера, остальной код трогать не нужно
// и теперь можно использовать любой логгер с соответствующим интерфейсом,
// в том числе и старый:

// logger := newBrandNewLogger()
// logger.log("Привет, я строка")
// logger.log(42)
// logger.log([]int{1, 2, 3, 4, 5})

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

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// Composite (КОМПОНОВЩИК)
// ЦЕЛЬ: создать удобную структуру из объектов в виде дерева
// ПРИМЕНЕНИЕ: система компонентов в современных фронтенд фреймворках,
// html дерево и т.п.

// Есть группа определённых связанных классов/объектов, связи между
// которыми удобно оформить в виде дерева, например File и Folder, где
// Folder может содержать несколько файлов и папок, а так же содержит
// метаданные, а File содержит только метаданные
type file struct {
	name string
}

type folder struct {
	files   []*file
	folders []*folder
	name    string
}

func (f *folder) addFolder(folder *folder) {
	f.folders = append(f.folders, folder)
}
func (f *folder) addFile(file *file) {
	f.files = append(f.files, file)
}

func (f *folder) printDataInside() {
	fmt.Printf("\nПапка с названием %v содержит файлы:\n", f.name)
	if len(f.files) == 0 {
		fmt.Println("ФАЙЛЫ ОТСУТСТВУЮТ")
	} else {
		for _, file := range f.files {
			fmt.Printf("%v\n", file.name)
		}
	}
	fmt.Println("И папки:")
	if len(f.folders) == 0 {
		fmt.Println("ПАПКИ ОТСУТСТВУЮТ")
	} else {
		for _, folder := range f.folders {
			fmt.Printf("%v\n", folder.name)
		}
	}
}
func recursivelyPrintFoldersData(folder folder) {
	folder.printDataInside()
	subFolders := folder.folders
	if len(subFolders) > 0 {
		for _, subfolder := range subFolders {
			recursivelyPrintFoldersData(*subfolder)
		}
	}
}

// file1 := &file{name: "file1.jpg"}
// file2 := &file{name: "file2.png"}
// file3 := &file{name: "file3.txt"}
// file4 := &file{name: "file4.js"}
// file5 := &file{name: "file5.ts"}
// file6 := &file{name: "file6.go"}
// file7 := &file{name: "file7.ogg"}
// file8 := &file{name: "file8.doc"}
// file9 := &file{name: "file9.css"}
// file10 := &file{name: "file10.yml"}

// folder1 := &folder{name: "folder1"}
// folder2 := &folder{name: "folder2"}
// folder3 := &folder{name: "folder3"}
// folder4 := &folder{name: "folder4"}
// folder5 := &folder{name: "folder5"}

// folder1.addFolder(folder2)
// folder1.addFolder(folder3)
// folder1.addFile(file1)
// folder1.addFile(file2)
// folder1.addFile(file3)
// folder2.addFolder(folder4)
// folder2.addFile(file4)
// folder3.addFile(file5)
// folder3.addFile(file6)
// folder3.addFile(file7)
// folder4.addFolder(folder5)
// folder5.addFile(file8)
// folder5.addFile(file9)
// folder5.addFile(file10)

// recursivelyPrintFoldersData(*folder1)

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// Decorator (ДЕКОРАТОР)
// ЦЕЛЬ: расширить функционал конкретного объекта, не меняя при этом логики
// класса (схемы), из которого был создан объект

// Интерфейс объекта, который оборачивается
// ему должны так же следовать все обёртки, чтобы клиентский код
// мог без труда использовать столько декораторов, сколько угодно
type iDecorated interface {
	log(data string)
}

// Конкретный объект со стандартной имплементацией операций
type decorated struct {
}

func (d *decorated) log(data string) {
	fmt.Println(data)
}

// Базовый декоратор должен так же следовать интерфейсу оборачиваемого объекта
type decorator struct {
	decorated iDecorated
}

func (d *decorator) log(data string) {
	d.decorated.log(data)
}

// Конкретные декораторы следуют интерфейсу оборачиваемого объекта и
// манипулируют данными, передаваемыми в него или получаемыми от него
type concreteDecoratorA struct {
	decorator
}

func (d *concreteDecoratorA) log(data string) {
	data = fmt.Sprintf("Декоратор А преобразовал данные, строка до преобразования:\n%v", data)
	d.decorator.log(data)
}

func newConcreteDecoratorA(d iDecorated) *concreteDecoratorA {
	return &concreteDecoratorA{decorator{decorated: d}}
}

type concreteDecoratorB struct {
	decorator
}

func (d *concreteDecoratorB) log(data string) {
	data = fmt.Sprintf("Декоратор B преобразовал данные, строка до преобразования:\n%v", data)
	d.decorator.log(data)
}

func newConcreteDecoratorB(d iDecorated) *concreteDecoratorB {
	return &concreteDecoratorB{decorator{decorated: d}}
}

// decorated := &decorated{}
// decoratorA := newConcreteDecoratorA(decorated)
// decoratorB := newConcreteDecoratorB(decoratorA)

// decorated.log("Привет!")
// decoratorA.log("Привет!")
// decoratorB.log("Привет!")

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// FACADE (ФАСАД)
// ЦЕЛЬ: создать упрощенный интерфейс для использования библиотеки, фреймворка,
// или любого другого сложного модуля/группы объектов

// Фасад предлагает простой интерфейс для клиента, при этом скрывая внутри себя
// взаимодействия с одной или несколькими подсистемами. Запрос клиента
// передаётся соответствующим объектам подсистем, при этом происходит инициализация
// нужных объектов, вызов их методов в правильной последовательности и т.п.
// Фасад защищает клиентский код от всех этих сложностей.
// Фасад может предлагать ограниченный функционал по сравнению с реальной
// подсистемой, то есть вызывать исключительно те методы подсистемы,
// которые необходимы клиентскому коду.
type facade struct {
	subsystem1 subsystem1
	subsystem2 subsystem2
}

func (f *facade) operation() string {
	result := "Facade initializes subsystems:\n"
	result += f.subsystem1.operation1()
	result += f.subsystem2.operation1()
	result += "Facade orders subsystems to perform the action:\n"
	result += f.subsystem1.operationN()
	result += f.subsystem2.operationZ()
	return result
}

// Конкретная подсистема может принимать запросы непосредственно от клиента
// или через фасад, но в последнем случае фасад является клиентом подсистемы
// и в саму подсистему не входит
type subsystem1 struct {
}

func (s *subsystem1) operation1() string {
	return "Subsystem1: Ready!\n"
}
func (s *subsystem1) operationN() string {
	return "Subsystem1: Go!\n"
}

type subsystem2 struct {
}

func (s *subsystem2) operation1() string {
	return "Subsystem2: Get ready!\n"
}
func (s *subsystem2) operationZ() string {
	return "Subsystem2: Fire!"
}

// subsystem1 := subsystem1{}
// subsystem2 := subsystem2{}
// facade := facade{subsystem1: subsystem1, subsystem2: subsystem2}
// fmt.Println(facade.operation())

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// FLYWEIGHT (ПРИСПОСОБЛЕНЕЦ)
// ЦЕЛЬ: уменьшить количество оперативной памяти, выделяемое на работу с
// объектами в системе
// УТОЧНЕНИЕ: если в текущем виде программа не расходует большое количество
// оперативной памяти - нет смысла применять этот паттерн

// Flyweight объект хранит в себе общее для других объектов состояние, а так же
// обрабатывает уникальное состояние. При условии, что есть объект Flyweight с
// требуемым общим состоянием - мы работаем с ним, а не создаём новый объект.
type flyweight struct {
	sharedState any
}

func (f *flyweight) operation(uniqueState any) {
	s, _ := json.Marshal(f.sharedState)
	u, _ := json.Marshal(uniqueState)
	fmt.Printf("Flyweight: Displaying shared %s and unique %s state.", s, u)
}

// Фабрика Flyweight объектов создаёт и управляет flyweight объектами, когда
// клиент запрашивает очередной flyweight объект - фабрика либо возвращает
// подходящий, либо возвращает новый
type flyweightFactory struct {
	flyweights map[string]flyweight
}

func makeKey(state []string) string {
	return strings.Join(state, "_")
}

func (f *flyweightFactory) getFlyweight(sharedState []string) flyweight {
	key := makeKey(sharedState)
	_, ok := f.flyweights[key]
	if !ok {
		fmt.Println("FlyweightFactory: Can't find a flyweight, creating new one.")
		f.flyweights[key] = flyweight{sharedState: sharedState}
	} else {
		fmt.Println("FlyweightFactory: Reusing existing flyweight.")
	}

	return f.flyweights[key]
}

func (f *flyweightFactory) listFlyweights() {
	fmt.Printf("\nFlyweightFactory: I have %v flyweights:\n", len(f.flyweights))
	for key := range f.flyweights {
		fmt.Println(key)
	}
}

func newFlyweightFactory(initialFlyweights [][]string) *flyweightFactory {
	mapOfFlyweights := make(map[string]flyweight)
	for _, state := range initialFlyweights {
		mapOfFlyweights[makeKey(state)] = flyweight{sharedState: state}
	}
	return &flyweightFactory{flyweights: mapOfFlyweights}
}

// хелпер для демонстрации

func addCarToPoliceDatabase(ff flyweightFactory, plates, owner, brand, model, color string) {
	fmt.Println("\nClient: Adding a car to database.")
	flyweight := ff.getFlyweight([]string{brand, model, color})
	flyweight.operation([]string{plates, owner})
}

// factory := newFlyweightFactory([][]string{
// 	{"Chevrolet", "Camaro2018", "pink"},
// 	{"Mercedes Benz", "C300", "black"},
// 	{"Mercedes Benz", "C500", "red"},
// 	{"BMW", "M5", "red"},
// 	{"BMW", "X6", "white"}})

// factory.listFlyweights()

// addCarToPoliceDatabase(*factory, "CL234IR", "James Doe", "BMW", "M5", "red")
// addCarToPoliceDatabase(*factory, "CL234IR", "James Doe", "BMW", "X1", "red")

// factory.listFlyweights()

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// PROXY (ПРОКСИ)
// ЦЕЛЬ: контролировать входящие и/или исходящие из проксируемого объекта
// данные
// ВАРИАНТЫ ИСПОЛЬЗОВАНИЯ: проверка прав доступа, кеширование, очистка ввода,
// логирование, статистика и т.д.

// Интерфейс, который ожидает видеть клиент, ему должен соответствовать
// как реальный объект, так и прокси
type subject interface {
	request()
}

// Реальный проксируемый объект, содержит бизнес логику, но может быть слишком
// тяжеловесным, чтобы использовать его для каждого запроса, либо может
// быть слабо защищён и т.п.
type realSubject struct {
}

func (s *realSubject) request() {
	fmt.Println("RealSubject: Handling request.")
}

// Прокси имеет тот же интерфейс, что и проксируемый объект
type proxy struct {
	realSubject realSubject
}

func (p *proxy) checkAccess() bool {
	fmt.Println("Proxy: Checking access prior to firing a real request.")
	return true
}

func (p *proxy) logAccess() {
	fmt.Println("Proxy: Logging the time of request.")
}

func (p *proxy) request() {
	if p.checkAccess() {
		p.realSubject.request()
		p.logAccess()
	}
}

// proxy := proxy{realSubject: realSubject{}}
// proxy.request()

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//
// BEHAVIORAL DESIGN PATTERNS
// To handle communication between heterogeneous objects
// --todo--
// - Observer
// - State
// - Strategy
// - Template Method
// - Visitor
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// CHAIN OF RESPONSIBILITY (ЦЕПОЧКА ОБЯЗАННОСТЕЙ)
// ЦЕЛЬ: создать систему из нескольких обработчиков запроса, каждый из которых
// может либо обработать запрос, либо передать его следующему

// интерфейс для определения методов назначения следующего обработчика
// и непосредственно обработки запроса
type handler interface {
	setNext(handler handler) handler

	handle(request string) string
}

// базовый тип, который содержит логику назначения следующего хендлера и
// базовую логику обработки
type abstractHandler struct {
	nextHandler handler
}

func (h *abstractHandler) setNext(handler handler) handler {
	h.nextHandler = handler
	return handler
}

func (h *abstractHandler) handle(request string) string {
	if h.nextHandler != nil {
		return h.nextHandler.handle(request)
	}
	return ""
}

// Конкретные обработчики либо обрабатывают запрос сами, либо передают его дальше
// по цепочке обработчиков
type monkeyHandler struct {
	abstractHandler
}

func (h *monkeyHandler) handle(request string) string {
	if request == "Banana" {
		return "Monkey: I'll eat the Banana."
	}
	return h.abstractHandler.handle(request)
}

type squirrelHandler struct {
	abstractHandler
}

func (h *squirrelHandler) handle(request string) string {
	if request == "Nut" {
		return "Squirrel: I'll eat the Nut."
	}
	return h.abstractHandler.handle(request)
}

type dogHandler struct {
	abstractHandler
}

func (h *dogHandler) handle(request string) string {
	if request == "MeatBall" {
		return "Dog: I'll eat the MeatBall."
	}

	return h.abstractHandler.handle(request)
}

// monkey := monkeyHandler{}
// squirrel := squirrelHandler{}
// dog := dogHandler{}

// monkey.setNext(&squirrel).setNext(&dog)

// handler := monkey

// foods := []string{"Nut", "Banana", "Cup of coffee"}

// for _, food := range foods {
// 	fmt.Printf("Client: Who wants a %v?\n", food)

// 	result := handler.handle(food)
// 	if result != "" {
// 		fmt.Println(result)
// 	} else {
// 		fmt.Printf("%v was left untouched.\n", food)
// 	}
// }
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// COMMAND (КОМАНДА)
// ЦЕЛЬ: превратить запросы на выполнение определённых действий в объекты,
// которые можно будет использовать для вызова определёных методов (выполнения
// команд), тем самым отделив логику GUI от бизнес логики

// интерфейс для определения методов для выполнения команды
type command interface {
	execute()
}

// в самом простом варианте объект команды может самостоятельно выполнить
// действия для обработки запроса
type simpleCommand struct {
	payload string
}

func (c *simpleCommand) execute() {
	fmt.Printf("SimpleCommand: See, I can do simple things like printing (%v)\n", c.payload)
}

// Более сложные операции выполняются командами за счёт делегирования задач
// другим объектам бизнес логики (Ресиверам)
type complexCommand struct {
	receiver receiver

	a string

	b string
}

func (c *complexCommand) execute() {
	fmt.Println(
		"ComplexCommand: Complex stuff should be done by a receiver object.")
	c.receiver.doSomething(c.a)
	c.receiver.doSomethingElse(c.b)
}

// Ресивер - непосредственный исполнитель сложных бизнес задач (любой объект,
// который знает как обработать запрос)
type receiver struct {
}

func (r *receiver) doSomething(a string) {
	fmt.Printf("Receiver: Working on (%v)\n", a)
}
func (r *receiver) doSomethingElse(b string) {
	fmt.Printf("Receiver: Also working on (%v)\n", b)
}

// Инвокер - объект, который содержит в себе ссылки на команды
// клиент работает с этим объектом, вызывая его методы и регистрируя
// необходимые команды и ресиверы
type invoker struct {
	onStart  command
	onFinish command
}

func (i *invoker) setOnStart(command command) {
	i.onStart = command
}
func (i *invoker) setOnFinish(command command) {
	i.onFinish = command
}

func (i *invoker) doSomethingImportant() {
	fmt.Println("Invoker: Does anybody want something done before I begin?")
	if i.onStart != nil {
		i.onStart.execute()
	}

	fmt.Println("Invoker: ...doing something really important...")

	fmt.Println("Invoker: Does anybody want something done after I finish?")
	if i.onFinish != nil {
		i.onFinish.execute()
	}
}

// receiver := receiver{}
// command1 := simpleCommand{}
// command2 := complexCommand{receiver: receiver, a: "Send email", b: "Send report"}
// invoker := invoker{}
// invoker.setOnStart(&command1)
// invoker.setOnFinish(&command2)
// invoker.doSomethingImportant()
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// ITERATOR (ИТЕРАТОР)
// ЦЕЛЬ: создать отдельный от коллекции объект, цель которого - перебор
// коллекции. Таким образом, объект, отвечающий за хранение и организацию
// данных не будет разрастаться и будет выполнять только свою основную
// функцию.

type iteratorValues interface {
	string | int
}

// Интерфейс итератора устанавливает, какие именно методы должен иметь каждый
// итератор
type iIterator[T iteratorValues] interface {
	current() T
	next() T
	key() int
	valid() bool
	rewind()
}

// Интерфейс агрегатор - устанавливает методы, которые должны иметь объекты -
// коллекции, чтобы возвращать соответствующий итератор
type aggregator interface {
	getIterator() iIterator[string]
}

// Конкретный итератор содержит логику прохода по коллекции
type stringsSliceIterator struct {
	collection wordsCollection
	position   int
	reverse    bool
}

func (i *stringsSliceIterator) rewind() {
	if i.reverse {
		i.position = i.collection.getCount() - 1
	} else {
		i.position = 0
	}
}
func (i *stringsSliceIterator) current() string {
	return i.collection.getItems()[i.position]
}
func (i *stringsSliceIterator) key() int {
	return i.position
}
func (i *stringsSliceIterator) next() string {
	item := i.collection.getItems()[i.position]
	if i.reverse {
		i.position--
	} else {
		i.position++
	}
	return item
}
func (i *stringsSliceIterator) valid() bool {
	if i.reverse {
		return i.position >= 0
	}
	return i.position < i.collection.getCount()
}

// Конкретная коллекция предоставляет один или несколько методов для
// возвращения сопоставимого с коллекцией итератора
type wordsCollection struct {
	items []string
}

func (c *wordsCollection) getItems() []string {
	return c.items
}
func (c *wordsCollection) getCount() int {
	return len(c.items)
}

func (c *wordsCollection) addItem(item string) {
	c.items = append(c.items, item)
}
func (c *wordsCollection) getIterator() iIterator[string] {
	return &stringsSliceIterator{collection: *c, position: 0, reverse: false}
}
func (c *wordsCollection) getReverseIterator() iIterator[string] {
	return &stringsSliceIterator{collection: *c, position: c.getCount() - 1, reverse: true}
}

// collection := wordsCollection{}
// collection.addItem("First")
// collection.addItem("Second")
// collection.addItem("Third")

// iterator := collection.getIterator()

// fmt.Println("Straight traversal:")
// for iterator.valid() {
// 	fmt.Println(iterator.next())
// }

// fmt.Println("Reverse traversal:")
// reverseIterator := collection.getReverseIterator()
// for reverseIterator.valid() {
// 	fmt.Println(reverseIterator.next())
// }

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// MEDIATOR (МЕДИАТОР)
// ЦЕЛЬ: избавиться от хаотичных зависимостей между объектами, создав
// объект - медиатор и перенаправив все запросы между объектами через него

// Метод notify на медиаторе принимает события и вызывает методы на
// нужных объектах в соответствии с ними
type mediator interface {
	notify(sender any, event string)
}

// Конкретный медиатор включает в себя логику координации между различными
// объектами
type concreteMediator struct {
	component1 component1
	component2 component2
}

func (m *concreteMediator) notify(sender any, event string) {
	if event == "A" {
		fmt.Println("Mediator reacts on A and triggers following operations:")
		m.component2.doC()
	}

	if event == "D" {
		fmt.Println("Mediator reacts on D and triggers following operations:")
		m.component1.doB()
		m.component2.doC()
	}
}

// Все остальные объекты должны хранить ссылку на медиатора, чтобы вызывать
// его метод notify
type baseComponent struct {
	mediator mediator
}

// Конкретные объекты содержат бизнес логику и не зависят ни от других компонентов
// ни от конкретного медиатора (т.к. они сохраняют в себе ссылку на любого
// конкретного медиатора)
type component1 struct {
	baseComponent
}

func (c *component1) doA() {
	fmt.Println("Component 1 does A.")
	c.mediator.notify(c, "A")
}

func (c *component1) doB() {
	fmt.Println("Component 1 does B.")
	c.mediator.notify(c, "B")
}

type component2 struct {
	baseComponent
}

func (c *component2) doC() {
	fmt.Println("Component 2 does C.")
	c.mediator.notify(c, "C")
}

func (c *component2) doD() {
	fmt.Println("Component 2 does D.")
	c.mediator.notify(c, "D")
}

// mediator := &concreteMediator{}
// c1 := component1{baseComponent{mediator: mediator}}
// c2 := component2{baseComponent{mediator: mediator}}

// mediator.component1 = c1
// mediator.component2 = c2

// fmt.Println("Client triggers operation A.")
// c1.doA()

// fmt.Println("")
// fmt.Println("Client triggers operation D.")
// c2.doD()

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
//------------------------------------------------------------------------------

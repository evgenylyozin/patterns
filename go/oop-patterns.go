package main

import (
	"encoding/json"
	"fmt"
	"strings"
	"sync"
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

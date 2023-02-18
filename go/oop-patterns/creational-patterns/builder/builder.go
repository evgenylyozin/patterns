package main

import "fmt"

// Тип для объекта, который будут строить строители
type house struct {
	windowType string
	doorType   string
	floor      int
}

// Интерфейс, которого должен придерживаться каждый строитель
type iHouseBuilder interface {
	setWindowType()
	setDoorType()
	setNumFloor()
	getHouse() *house
}

// Конкретный строитель
type normalBuilder struct {
	house *house
}

func newNormalBuilder() *normalBuilder {
	return &normalBuilder{house: &house{}}
}

func (b *normalBuilder) setWindowType() {
	b.house.windowType = "Wooden Window"
}

func (b *normalBuilder) setDoorType() {
	b.house.doorType = "Wooden Door"
}

func (b *normalBuilder) setNumFloor() {
	b.house.floor = 2
}

func (b *normalBuilder) getHouse() *house {
	return b.house
}

type iglooBuilder struct {
	house *house
}

func newIglooBuilder() *iglooBuilder {
	return &iglooBuilder{house: &house{}}
}

func (b *iglooBuilder) setWindowType() {
	b.house.windowType = "Snow Window"
}

func (b *iglooBuilder) setDoorType() {
	b.house.doorType = "Snow Door"
}

func (b *iglooBuilder) setNumFloor() {
	b.house.floor = 1
}

func (b *iglooBuilder) getHouse() *house {
	return b.house
}

// Вспомогательная функция для получения нужного типа строителя
func getBuilder(builderType string) iHouseBuilder {
	if builderType == "normal" {
		return newNormalBuilder()
	}

	if builderType == "igloo" {
		return newIglooBuilder()
	}
	return nil
}

// Тип для директора строителей, хранит в себе конкретного строителя для постройки объекта
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
func (d *director) buildHouse() *house {
	d.builder.setDoorType()
	d.builder.setWindowType()
	d.builder.setNumFloor()
	return d.builder.getHouse()
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ------------------------------- Клиентский код -------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

func main() {
	normalBuilder := getBuilder("normal")
	iglooBuilder := getBuilder("igloo")

	director := newDirector(normalBuilder)
	normalHouse := director.buildHouse()

	fmt.Printf("Normal House Door Type: %s\n", normalHouse.doorType)
	fmt.Printf("Normal House Window Type: %s\n", normalHouse.windowType)
	fmt.Printf("Normal House Num Floor: %d\n", normalHouse.floor)

	director.setBuilder(iglooBuilder)
	iglooHouse := director.buildHouse()

	fmt.Printf("\nIgloo House Door Type: %s\n", iglooHouse.doorType)
	fmt.Printf("Igloo House Window Type: %s\n", iglooHouse.windowType)
	fmt.Printf("Igloo House Num Floor: %d\n", iglooHouse.floor)
}

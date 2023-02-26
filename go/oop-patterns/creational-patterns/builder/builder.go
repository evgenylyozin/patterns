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
	b.house.windowType = "Деревянное окно"
}

func (b *normalBuilder) setDoorType() {
	b.house.doorType = "Деревянная дверь"
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
	b.house.windowType = "Ледяное окно"
}

func (b *iglooBuilder) setDoorType() {
	b.house.doorType = "Ледяная дверь"
}

func (b *iglooBuilder) setNumFloor() {
	b.house.floor = 1
}

func (b *iglooBuilder) getHouse() *house {
	return b.house
}

// Вспомогательная функция для получения нужного типа строителя
func getBuilder(builderType string) iHouseBuilder {
	if builderType == "обычный" {
		return newNormalBuilder()
	}

	if builderType == "иглу" {
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
	normalBuilder := getBuilder("обычный")
	iglooBuilder := getBuilder("иглу")

	director := newDirector(normalBuilder)
	normalHouse := director.buildHouse()

	fmt.Printf("Тип двери обычного дома: %s\n", normalHouse.doorType)
	fmt.Printf("Тип окна обычного дома: %s\n", normalHouse.windowType)
	fmt.Printf("Количество этажей обычного дома: %d\n", normalHouse.floor)

	director.setBuilder(iglooBuilder)
	iglooHouse := director.buildHouse()

	fmt.Printf("\nТип двери иглу: %s\n", iglooHouse.doorType)
	fmt.Printf("Тип окна иглу: %s\n", iglooHouse.windowType)
	fmt.Printf("Количество этажей иглу: %d\n", iglooHouse.floor)
}

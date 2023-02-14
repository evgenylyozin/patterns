package main


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

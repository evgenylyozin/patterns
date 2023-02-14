package main

import (
	"encoding/json"
	"fmt"
	"strings"
)

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

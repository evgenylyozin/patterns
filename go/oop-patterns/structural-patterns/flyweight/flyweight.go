package main

import (
	"encoding/json"
	"fmt"
	"strings"
)

// Приспособленец хранит в себе общее для других объектов состояние, а так же
// обрабатывает уникальное состояние. При условии, что есть объект-приспособленец с
// требуемым общим состоянием - мы работаем с ним, а не создаём новый объект.
type flyweight struct {
	sharedState any
}

func (f *flyweight) operation(uniqueState any) {
	s, _ := json.Marshal(f.sharedState)
	u, _ := json.Marshal(uniqueState)
	fmt.Printf("Приспособленец: Отображаю общее %s и уникальное %s состояние.", s, u)
}

// Фабрика приспособленцев создаёт и управляет ими, когда
// клиент запрашивает очередной объект - фабрика либо возвращает
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
		fmt.Println(`Фабрика приспособленцев: Не могу найти подходящего 
приспособленца, создаю нового.`)
		f.flyweights[key] = flyweight{sharedState: sharedState}
	} else {
		fmt.Println("Фабрика приспособленцев: возвращаю существующего приспособленца.")
	}

	return f.flyweights[key]
}

func (f *flyweightFactory) listFlyweights() {
	fmt.Printf("\nФабрика приспособленцев: В наличии %v приспособленцев:\n", len(f.flyweights))
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

// В данном случае в качестве контекста выступает функция addCarToPoliceDatabase
// именно здесь происходит приём уникального состояния, получение соответствующего
// объекта-приспособленца и вызов его метода с уникальным состоянием
// всё это можно оформить в виде отдельного объекта
func addCarToPoliceDatabase(ff flyweightFactory, plates, owner, brand, model, color string) {
	fmt.Println("\nКлиент: Добавляю машину в БД.")
	flyweight := ff.getFlyweight([]string{brand, model, color})
	flyweight.operation([]string{plates, owner})
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

func main() {
	factory := newFlyweightFactory([][]string{
		{"Chevrolet", "Camaro2018", "розовый"},
		{"Mercedes Benz", "C300", "черный"},
		{"Mercedes Benz", "C500", "красный"},
		{"BMW", "M5", "красный"},
		{"BMW", "X6", "белый"}})

	factory.listFlyweights()

	addCarToPoliceDatabase(*factory, "CL234IR", "James Doe", "BMW", "M5", "красный")
	addCarToPoliceDatabase(*factory, "CL234IR", "James Doe", "BMW", "X1", "красный")

	factory.listFlyweights()
}

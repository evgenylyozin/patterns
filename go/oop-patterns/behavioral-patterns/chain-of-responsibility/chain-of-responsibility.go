package main

import "fmt"

// интерфейс для определения методов назначения следующего обработчика
// и непосредственно обработки запроса
type handler interface {
	setNext(handler handler) handler
	handle(request string) string
}

// базовый тип, который содержит логику назначения следующего обработчика и
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
	if request == "Банан" {
		return "Обезьяна: Я съем Банан."
	}
	return h.abstractHandler.handle(request)
}

type squirrelHandler struct {
	abstractHandler
}

func (h *squirrelHandler) handle(request string) string {
	if request == "Орех" {
		return "Белка: Я съем Орех."
	}
	return h.abstractHandler.handle(request)
}

type dogHandler struct {
	abstractHandler
}

func (h *dogHandler) handle(request string) string {
	if request == "Мясо" {
		return "Собака: Я съем Мясо."
	}

	return h.abstractHandler.handle(request)
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

func main() {
	monkey := monkeyHandler{}
	squirrel := squirrelHandler{}
	dog := dogHandler{}

	monkey.setNext(&squirrel).setNext(&dog)

	handler := monkey

	foods := []string{"Орех", "Банан", "Кофе"}

	for _, food := range foods {
		fmt.Printf("Клиент: кто хочет %v?\n", food)

		result := handler.handle(food)
		if result != "" {
			fmt.Println(result)
		} else {
			fmt.Printf("%v никто не захотел.\n", food)
		}
	}
}

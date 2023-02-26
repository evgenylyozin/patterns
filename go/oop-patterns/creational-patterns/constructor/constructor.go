package main

import "fmt"

type blackCat struct {
	color string
}

func (c *blackCat) meow() {
	fmt.Println("Мяу, мой цвет:", c.color)
}

type whiteCat struct {
	color string
}

func (c *whiteCat) meow() {
	fmt.Println("Мяу, мой цвет:", c.color)
}

// Создание объектов в Go можно делегировать отдельной функции
// такие функции по своей сути являются конструкторами
func newBlackCat() *blackCat {
	return &blackCat{color: "черный"}
}

func newWhiteCat() *whiteCat {
	return &whiteCat{color: "белый"}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ------------------------------- Клиентский код -------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
func main() {
	whiteCat := newWhiteCat()
	blackCat := newBlackCat()
	whiteCat.meow()
	blackCat.meow()
}

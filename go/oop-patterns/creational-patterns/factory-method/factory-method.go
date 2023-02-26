package main

import "fmt"

// В Go невозможно реализовать классический вариант паттерна Фабричный метод,
// поскольку в языке отсутствуют такие возможности ООП, как классы и
// наследственность. Несмотря на это, мы все же можем реализовать базовую
// версию этого паттерна — Простая фабрика.
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

type meower interface {
	meow()
}

func newBlackCat() *blackCat {
	return &blackCat{color: "черный"}
}

func newWhiteCat() *whiteCat {
	return &whiteCat{color: "белый"}
}

func catsFactory(t string) (meower, error) {
	switch t {
	case "черный":
		return newBlackCat(), nil
	case "белый":
		return newWhiteCat(), nil
	default:
		return nil, fmt.Errorf("Неизвестный тип кошки")
	}
}

func main() {
	whiteCat, error := catsFactory("белый")

	if error == nil {
		whiteCat.meow()
	}
	blackCat, error := catsFactory("черный")
	if error == nil {
		blackCat.meow()
	}
	unknownCat, error := catsFactory("???")
	if error == nil {
		unknownCat.meow()
	} else {
		fmt.Println(error.Error())
	}

}

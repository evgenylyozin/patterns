package main

import "fmt"

// ------------------------------------------------------------------------------
// FACTORY
// Aim: to hide objects creation details
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
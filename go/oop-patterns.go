package main

// CREATIONAL DESIGN PATTERNS
// Patterns for handling objects creation

// ------------------------------------------------------------------------------
// CONSTRUCTOR
// Aim: to create an object with the specified settings
type blackCat struct {
	color string
}

type whiteCat struct {
	color string
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

//------------------------------------------------------------------------------
// FACTORY
// Aim: to hide objects creation details

//------------------------------------------------------------------------------

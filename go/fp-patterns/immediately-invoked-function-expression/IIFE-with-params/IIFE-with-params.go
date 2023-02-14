package main

import "fmt"

func main() {

	// IIFE с параметрами
	func(str string) {
		fmt.Println(str, "от IIFE с параметрами")
	}("Привет")

}

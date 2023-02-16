package main

import "fmt"

type singltn struct{ name string }

// IIFE с возвращаемым значением
func main() {
  singleton := func(str string) singltn {
	fmt.Println(str, "от IIFE, создающей синглтон")
	fmt.Println("Создаю Синглтон")
	return singltn{
		name: "Синглтон",
	}
}("Привет")
fmt.Println("Меня зовут", singleton.name)
}
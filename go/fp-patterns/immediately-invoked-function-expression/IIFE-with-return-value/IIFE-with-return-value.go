package main

import "fmt"

// Singleton - гипотетический объект-одиночка
type Singleton struct{ name string }

// IIFE с возвращаемым значением
func main() {
	singleton := func(str string) Singleton {
		fmt.Println(str, "от IIFE, создающей одиночку")
		fmt.Println("Создаю одиночку")
		return Singleton{
			name: "Одиночка",
		}
	}("Привет")
	fmt.Println("Меня зовут", singleton.name)
}

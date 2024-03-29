package main

import "fmt"

// Тип объекта конфигурации
type config struct {
	name    string
	surname string
	age     int
	gender  string
}

// Функция, которая принимает объект в качестве
// аргумента, вместо того, чтобы принимать массу
// аргументов одновременно
func printThisDude(dude config) {
	var gender string
	if dude.gender != "" {
		gender = dude.gender
	} else {
		gender = "Ещё не определился"
	}
	fmt.Printf("Имя: %v, Фамилия: %v, Возраст: %v, Пол: %v", dude.name, dude.surname, dude.age, gender)
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ------------------------------- Клиентский код -------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
func main() {
	dude1 := config{
		name:    "Иван",
		surname: "Иванов",
		age:     27,
		gender:  "Муж.",
	}

	dude2 := config{
		name:    "Иван",
		surname: "Петров",
		age:     28,
	}

	printThisDude(dude1)
	fmt.Println("")
	printThisDude(dude2)
}

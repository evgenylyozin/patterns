package main

import (
	"fmt"
	"strings"
)

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// CALLBACK (КОЛБЭК)
// Цель: передать функцию внутрь другой функции для вызова в будущем
// Вариант применения: чтобы сделать функцию обобщенной и сосредоточенной на
// одной конкретной задаче - можно выделить части логики в колбэки и вызывать
// их по мере необходимости. Так же активно используется в обработке событий и
// таймаутов.
type callback[T any] func(arg T) T

func someFunctionWhichOnlyReturnsSomeString(cb callback[string]) string {
	str := "ПрИвЕт!"
	return cb(str)
}

func someCBWhichDoesSomeAdditionalUsefulWork(str string) string {
	return strings.ToUpper(str)
}

// fmt.Println(
// 	someFunctionWhichOnlyReturnsSomeString(someCBWhichDoesSomeAdditionalUsefulWork))

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// LAZY FUNCTION DEFINITION (ЛЕНИВОЕ ОПРЕДЕЛЕНИЕ ФУНКЦИИ)
// Цель: создать функцию, которая выполнит какие-либо действия при первом вызове,
// а потом будет выполнять другие действия
// В ГО ЭТОТ ПАТТЕРН ВЫЗЫВАЕТ ОШИБКУ КОМПИЛЯЦИИ: initialization cycle

// var lazilyDefinedFunc = func(){
//   fmt.Println("Функция выполнила инициализацию");
//   lazilyDefinedFunc = func() {
//     fmt.Println("Теперь функция делает другую работу");
//   };
// };

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// IIFE (Immediately Invoked Function Expression) (НЕМЕДЛЕННО ВЫЗЫВАЕМАЯ ФУНКЦИЯ)
// Цель: создать функцию, которая определяется (обычно) в анонимном блоке
// и тут же вызывается.
// Варианты применения: для создания модуля, для инициализации, для создания
// синглтона и т.п.

// // Простая IIFE
// func() {
// 	fmt.Println("Привет от простой IIFE")
// }()

// // IIFE с параметрами
// func(str string) {
// 	fmt.Println(str, "от IIFE с параметрами")
// }("Привет")

// type singltn struct{ name string }
// // IIFE с возвращаемым значением
// singleton := func(str string) singltn {
// 	fmt.Println(str, "от IIFE, создающей синглтон")
// 	fmt.Println("Создаю Синглтон")
// 	return singltn{
// 		name: "Синглтон",
// 	}
// }("Привет")
// fmt.Println("Меня зовут", singleton.name)

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// Memoization (Кеширование/Запоминание)
// Цель: запомнить результат операции и при повторе аргументов функции
// вернуть его вместо повторения рассчетов

func memoizedFib(n int) int {
	results := map[int]int{0: 0, 1: 1, 2: 1}
	return fib(n, results)
}

func fib(n int, results map[int]int) int {
	if result, ok := results[n]; ok {
		return result
	}
	res := fib(n-2, results) + fib(n-1, results)
	results[n] = res
	return res

}

// fmt.Println(memoizedFib(100))

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// Configuration Object (Объект конфигурации)
// Цель: уменьшить количество принимаемых функцией аргументов

type config struct {
	name    string
	surname string
	age     int
	gender  string
}

func printThisDude(dude config) {
	var gender string
	if dude.gender != "" {
		gender = dude.gender
	} else {
		gender = "Ещё не определился"
	}
	fmt.Printf("Имя: %v, Фамилия: %v, Возраст: %v, Пол: %v", dude.name, dude.surname, dude.age, gender)
}

// dude1 := config{
// 	name:    "Иван",
// 	surname: "Иванов",
// 	age:     27,
// 	gender:  "Муж.",
// }

// dude2 := config{
// 	name:    "Иван",
// 	surname: "Петров",
// 	age:     28,
// }

// printThisDude(dude1)
// fmt.Println("")
// printThisDude(dude2)

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// Curring (Каррирование)
// Цель: зафиксировать повторяющиеся аргументы при вызове функции, получив
// новую функцию

func add(a int) func(int) int {
	return func(b int) int {
		return a + b
	}
}

// fmt.Println(add(1)(2))

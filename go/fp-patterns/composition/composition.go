package main

import "fmt"

// Пример простой композиции за счёт возможности передавать вызов функции в
// качестве аргумента другой функции
func addTwo(n int) int {
	return n + 2
}
func divideByTwo(n int) int {
	return n / 2
}

func addTwoThenDivideByTwo(n int) int {
	return divideByTwo(addTwo(n))
}

func main() {
	fmt.Println(addTwoThenDivideByTwo(6)) // 4
}

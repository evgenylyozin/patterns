package main

import (
	"fmt"
)

func add(args ...int) int {
	var result int
	for _, v := range args {
		result += v
	}
	return result
}

// Вспомогательная функция для частичного применения с использованием обобщенной
// типизации
// Принимает в качестве аргумента функцию, аргументы которой нужно зафиксировать
// а так же список аргументов, которые нужно зафиксировать
// и возвращает функцию, которая готова принять новый список аргументов и
// вернуть результат вызова оригинальной функции со всеми переданными аргументами
// (зафиксированными + вновь переданными)
func partialApply[T any](fn func(args ...T) T, appliedArgs ...T) func(...T) T {
	return func(args ...T) T {
		return fn(append(appliedArgs, args...)...)
	}
}

func main() {
	// Простое частичное применение, посредством возврата результата вызова
	// функции с фиксированным аргументом
	addTwo := func(b int) int {
		return add(2, b)
	}
	result := addTwo(3)
	fmt.Println(result) // 5

	// Создание функции с зафиксированными аргументами посредством вспомогательной
	// функции
	addTwoPartiallyApplied := partialApply(add, 2, 3)
	result = addTwoPartiallyApplied(4)
	fmt.Println(result) // 9
}

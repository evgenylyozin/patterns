package main

import "fmt"

// вызывающая функция передаёт результаты в fib
// функция fib использует результаты в случае, если
// fib от переданного числа уже был посчитан,
// иначе производит расчет и сохраняет результат
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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ------------------------------- Клиентский код -------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
func main() {
	fmt.Println(memoizedFib(100))
}

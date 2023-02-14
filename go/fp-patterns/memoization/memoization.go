package main

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
package main

import "fmt"

// Анонимная функция как функция обратного вызова
func callMeWithSomeCallback(cb func()) {
	cb()
}

func filterWithCustomFunction(s []int, f func(v int, threshold int) bool) []int {
	res := []int{}
	for _, v := range s {
		if f(v, 3) {
			res = append(res, v)
		}
	}
	return res
}
func main() {
	callMeWithSomeCallback(func() {
		fmt.Println("Привет!")
	})

	// Анонимная функция как функция для фильтрации
	fmt.Println(filterWithCustomFunction([]int{1, 2, 3, 4, 5}, func(v int, threshold int) bool {
		if v > threshold {
			return true
		}
		return false
	}))

	// Анонимная функция как немедленно вызываемая функция
	func() {
		fmt.Println("Привет от немедленно вызываемой анонимной функции!")
	}()
}

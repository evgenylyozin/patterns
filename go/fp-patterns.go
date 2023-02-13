package main

import "strings"

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// CALLBACK (КОЛБЭК)
// Цель: передать функцию внутрь другой функции для вызова в будущем
// Вариант применения: чтобы сделать функцию обобщенной и сосредоточенной на
// одной конкретной задаче - можно выделить части логики в колбэки и вызывать
// их по мере необходимости.

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

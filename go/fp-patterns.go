package main

import (
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

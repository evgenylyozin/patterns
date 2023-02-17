package main

import "fmt"

// Существует какой-либо объект, который активно используется в коде
// или клиентом
type oldButUsefulLogger struct {
}

func (l *oldButUsefulLogger) log(data interface{}) {
	fmt.Printf("Тип переданных для логирования данных: %T, данные: %v\n", data, data)
}

type any interface{}
type logger interface {
	printString(data string)
	printInt(data int)
	printAny(data any)
}

// Появляется новый объект, который мы начинаем активно использовать в коде для
// логирования, т.к. он поддерживает больше методов и может использовать любые
// логгеры с определённым интерфейсом под капотом
type brandNewLogger struct {
	logger logger
}

func (l *brandNewLogger) log(data any) {
	switch fmt.Sprintf("%T", data) {
	case "string":
		l.logger.printString(data.(string))
		break
	case "int":
		l.logger.printInt(data.(int))
		break
	default:
		l.logger.printAny(data)
	}
}

// Проблема в том, что мы хотели бы продолжать использовать старый логгер,
// но его интерфейс не соответствует новым требованиям
// в таком случае можно создать адаптер и передавать его в качестве логгера
type adapterForGoodOldLogger struct {
	logger oldButUsefulLogger
}

func (a *adapterForGoodOldLogger) printString(data string) {
	a.logger.log(data)
}
func (a *adapterForGoodOldLogger) printInt(data int) {
	a.logger.log(data)
}
func (a *adapterForGoodOldLogger) printAny(data any) {
	a.logger.log(data)
}

func newBrandNewLogger() *brandNewLogger {
	return &brandNewLogger{logger: &adapterForGoodOldLogger{logger: oldButUsefulLogger{}}}
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

func main() {
	// Старый код выглядит так:

	// logger := oldButUsefulLogger{}
	// logger.log("Привет, я строка")
	// logger.log(42)
	// logger.log([]int{1, 2, 3, 4, 5})

	// В новом коде нужно заменить только создание логгера, остальной код трогать не нужно
	// и теперь можно использовать любой логгер с соответствующим интерфейсом,
	// в том числе и старый:

	logger := newBrandNewLogger()
	logger.log("Привет, я строка")
	logger.log(42)
	logger.log([]int{1, 2, 3, 4, 5})
}

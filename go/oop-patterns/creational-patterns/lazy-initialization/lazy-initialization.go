package main

import (
	"fmt"
	"time"
)

type initData struct {
	ops int
}

type lazilyInitialized struct {
	initData
	data string
}

func (l *lazilyInitialized) init() {
	if l.data == "" {
		fmt.Printf("Получили запрос на инициализацию, выполняем столько трудоёмких операций: %v\n", l.initData.ops)
		l.handleExpensiveOperations()
		time.Sleep(time.Duration(l.initData.ops * int(time.Second)))
		fmt.Println(`Операции завершены, наполняем объект данными...`)
		time.Sleep(time.Duration(2 * int(time.Second)))
		l.data = "Данные, хранящиеся внутри объекта"
		fmt.Printf(
			"Инициализация объекта завершена, данные внутри объекта: %v\n", l.data)
		// Повторный запрос на инициализацию того же объекта обычно не должен вновь
		// запускать цикл операций и заполнения данными
	} else {
		fmt.Printf(
			`Объект уже был инициализирован ранее, данные внутри объекта: %v`, l.data)
	}
}

func (l *lazilyInitialized) handleExpensiveOperations() {
	fmt.Println("Выполняю затратные операции...")
}

// При создании экземпляра, возвращается объект без данных и ещё не
// выполнивший ряд трудоёмких операций
// Созданный объект имеет метод init, только после вызова которого всё
// вышеперечисленное происходит
func newLazilyInitialized(initData initData) *lazilyInitialized {
	fmt.Println(`Создали объект, который ещё не 
    настроен и не выполнил ряд трудоёмких
    операций, ожидаем запроса на его инициализацию...`)
	return &lazilyInitialized{initData: initData, data: ""}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ------------------------------- Клиентский код -------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
func main() {
	lazy := newLazilyInitialized(initData{ops: 5})
	time.Sleep(time.Duration(4 * int(time.Second)))
	lazy.init()
	time.Sleep(time.Duration(4 * int(time.Second)))
	fmt.Println("Пробуем инициализировать снова...")
	lazy.init()
}

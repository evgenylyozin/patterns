package main

import "fmt"

// NumStr - Тип возвращаемого функциями значения (Монадический тип)
type NumStr struct {
	int
	string
}

// AddFunc - тип функций, которые предполагается скомпоновать
type AddFunc func(x int) NumStr

// Есть ряд функций, которые хотелось бы скомпоновать, но значение, которое
// они возвращают - не подходит по типу в качестве аргумента для этих
// функций
func add1(x int) NumStr {
	return NumStr{x + 1, " + 1"}
}
func add2(x int) NumStr {
	return NumStr{x + 2, " + 2"}
}
func add3(x int) NumStr {
	return NumStr{x + 3, " + 3"}
}

// Функция запускает процесс, предоставляя начальное значение
// нужного типа (ожидаемого функцией bind)
func initFunc(x int) NumStr {
	return NumStr{x, fmt.Sprintf("Результат расчета выражения %v", x)}
}

// Функция использует данные, переданные в качестве первого
// аргумента для вызова функции, передаваемой вторым аргументом,
// возвращая при этом ожидаемый тип результата
func bind(v NumStr, f AddFunc) NumStr {
	result := f(v.int)
	return NumStr{result.int, fmt.Sprintf("%v%v", v.string, result.string)}
}

// Вспомогательная функция, позволяющая избежать вложения вызовов
// функции bind
func pipeline(v NumStr, funcs ...AddFunc) NumStr {
	for _, f := range funcs {
		v = bind(v, f)
	}
	return v
}

func main() {
	// Компоновка функций, результат вызова которых не соответствует
	// типу параметров, ожидаемых этими функциями
	fmt.Println(bind(bind(bind(initFunc(0), add1), add2), add3))

	// Компоновка функций с использованием вспомогательной функции
	fmt.Println(pipeline(initFunc(0), add1, add2, add3))

}

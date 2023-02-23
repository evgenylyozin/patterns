package main

import (
	"fmt"
	"strconv"
)

// каждое выражение (как терминальное, так и нетерминальное) должно иметь метод
// для интерпретации
type iAbstractExpression interface {
	interpret() int
}

func newNumeral(s string) *numeral {
	parsedInt, err := strconv.Atoi(s)
	if err == nil {
		return &numeral{value: parsedInt}
	}
	return nil
}

// терминальное выражение
type numeral struct {
	value int
}

func (n *numeral) interpret() int {
	return n.value
}

// Нетерминальное выражение
type add struct {
	left  iAbstractExpression
	right iAbstractExpression
}

func newAdd(left, right iAbstractExpression) *add {
	return &add{left: left, right: right}
}

func (a *add) interpret() int {
	return a.left.interpret() + a.right.interpret()
}

type subtract struct {
	left  iAbstractExpression
	right iAbstractExpression
}

func newSubtract(left, right iAbstractExpression) *subtract {
	return &subtract{left: left, right: right}
}

func (s *subtract) interpret() int {
	return s.left.interpret() - s.right.interpret()
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ------------------------------- Клиентский код -------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
func main() {
	// Интерпретируемая строка состоит из чисел, пробелов и знаков "+" и "-"
	SENTENCE := "5 + 4 - 3 + 7 - 2"
	fmt.Println(SENTENCE)

	// В данном случае создание Абстрактного синтаксического дерева (AST) происходит
	// вручную
	AST := []iAbstractExpression{}

	AST = append(AST, newAdd(newNumeral("5"), newNumeral("4"))) // 5 + 4
	AST = append(AST, newSubtract(AST[0], newNumeral("3")))     // ^ - 3
	AST = append(AST, newAdd(AST[1], newNumeral("7")))          // ^ + 7
	AST = append(AST, newSubtract(AST[2], newNumeral("2")))     // ^ - 2

	fmt.Println(AST[3].interpret()) // => 11

}

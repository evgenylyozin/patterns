package main

import (
	"fmt"
	"sort"
	"strings"
)

// Контекст используется клиентом для вызова методов, решающих бизнес
// задачи
type strategyContext struct {
	strategy iStrategy
}

func (c *strategyContext) setStrategy(strategy iStrategy) {
	c.strategy = strategy
}

// Контекст передаёт выполнение задачи в конкретный объект стратегии, при
// этом не имея методов для её непосредственного решения внутри себя
func (c *strategyContext) doSomeBusinessLogic() {

	fmt.Println("Context: Sorting data using the strategy (not sure how it'll do it)")
	result := c.strategy.doAlgorithm([]string{"a", "b", "c", "d", "e"})
	fmt.Println(strings.Join(result, ","))
}

// Интерфейс стратегии должен включать все поддерживаемые каждой стратегией
// методы, контекст стратегий использует этот интерфейс для вызова
// соответствующих методов на объекте стратегии
type iStrategy interface {
	doAlgorithm(data []string) []string
}

// Конкретные стратегии непосредственно включают реализацию интерфейса стратегий
type concreteStrategyA struct {
}

func (s *concreteStrategyA) doAlgorithm(data []string) []string {
	sort.Strings(data)
	return data
}

type concreteStrategyB struct {
}

func (s *concreteStrategyB) doAlgorithm(data []string) []string {
	sort.Slice(data, func(i, j int) bool {
		return data[i] > data[j]
	})
	return data
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

func main() {
	context := strategyContext{strategy: &concreteStrategyA{}}
	fmt.Println("Client: Strategy is set to normal sorting.")
	context.doSomeBusinessLogic()

	fmt.Println("")

	fmt.Println("Client: Strategy is set to reverse sorting.")
	context.setStrategy(&concreteStrategyB{})
	context.doSomeBusinessLogic()
}

package main

import "fmt"

type singletonType int

const (
	нулевой singletonType = iota
	первый
	второй
	третий
)

type singleton struct {
	data singletonType
}

func (s *singleton) toString() string {
	return fmt.Sprintf("Я одиночка типа %v", s.data)
}

func newSingleton(t singletonType) *singleton {
	return &singleton{data: t}
}

// Мультитон содержит список ссылок на объекты-одиночки
// разных типов и возвращает ссылку на объект конкретного типа
// в ответ на запрос клиента, либо создаёт объект конкретного
// типа, сохраняет его в своём списке и возвращает ссылку на
// него, если одиночки такого типа ещё нет в списке на
// момент запроса
type multiton struct {
	instances map[singletonType]*singleton
}

func (m *multiton) getInstance(t singletonType) *singleton {
	if _, ok := m.instances[t]; !ok {
		m.instances[t] = newSingleton(t)
	}
	return m.instances[t]
}

func newMultiton() *multiton {
	return &multiton{instances: make(map[singletonType]*singleton)}
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

func main() {
	m := newMultiton()
	fmt.Println(m.getInstance(первый).toString())
	fmt.Println(m.getInstance(второй).toString())
	fmt.Println(m.getInstance(третий).toString())
}

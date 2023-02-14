package main


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// FACADE (ФАСАД)
// ЦЕЛЬ: создать упрощенный интерфейс для использования библиотеки, фреймворка,
// или любого другого сложного модуля/группы объектов

// Фасад предлагает простой интерфейс для клиента, при этом скрывая внутри себя
// взаимодействия с одной или несколькими подсистемами. Запрос клиента
// передаётся соответствующим объектам подсистем, при этом происходит инициализация
// нужных объектов, вызов их методов в правильной последовательности и т.п.
// Фасад защищает клиентский код от всех этих сложностей.
// Фасад может предлагать ограниченный функционал по сравнению с реальной
// подсистемой, то есть вызывать исключительно те методы подсистемы,
// которые необходимы клиентскому коду.
type facade struct {
	subsystem1 subsystem1
	subsystem2 subsystem2
}

func (f *facade) operation() string {
	result := "Facade initializes subsystems:\n"
	result += f.subsystem1.operation1()
	result += f.subsystem2.operation1()
	result += "Facade orders subsystems to perform the action:\n"
	result += f.subsystem1.operationN()
	result += f.subsystem2.operationZ()
	return result
}

// Конкретная подсистема может принимать запросы непосредственно от клиента
// или через фасад, но в последнем случае фасад является клиентом подсистемы
// и в саму подсистему не входит
type subsystem1 struct {
}

func (s *subsystem1) operation1() string {
	return "Subsystem1: Ready!\n"
}
func (s *subsystem1) operationN() string {
	return "Subsystem1: Go!\n"
}

type subsystem2 struct {
}

func (s *subsystem2) operation1() string {
	return "Subsystem2: Get ready!\n"
}
func (s *subsystem2) operationZ() string {
	return "Subsystem2: Fire!"
}

// subsystem1 := subsystem1{}
// subsystem2 := subsystem2{}
// facade := facade{subsystem1: subsystem1, subsystem2: subsystem2}
// fmt.Println(facade.operation())

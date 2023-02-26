package main

import "fmt"

// Интерфейс, который ожидает видеть клиент, ему должен соответствовать
// как реальный объект, так и прокси
type subject interface {
	request()
}

// Реальный объект, содержит бизнес логику, но может быть слишком
// тяжеловесным, чтобы использовать его для каждого запроса, либо может
// быть слабо защищён и т.п.
type realSubject struct {
}

func (s *realSubject) request() {
	fmt.Println("Реальный объект: Работаю с запросом.")
}

// Прокси имеет тот же интерфейс, что и реальный объект
type proxy struct {
	realSubject realSubject
}

func (p *proxy) checkAccess() bool {
	fmt.Println("Заместитель: Проверяю права доступа перед тем, как обработать запрос.")
	return true
}

func (p *proxy) logAccess() {
	fmt.Println("Заместитель: Записываю время и дату запроса.")
}

func (p *proxy) request() {
	if p.checkAccess() {
		p.realSubject.request()
		p.logAccess()
	}
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

func main() {
	proxy := proxy{realSubject: realSubject{}}
	proxy.request()
}

package main

import "fmt"

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// PROXY (ПРОКСИ)
// ЦЕЛЬ: контролировать входящие и/или исходящие из проксируемого объекта
// данные
// ВАРИАНТЫ ИСПОЛЬЗОВАНИЯ: проверка прав доступа, кеширование, очистка ввода,
// логирование, статистика и т.д.

// Интерфейс, который ожидает видеть клиент, ему должен соответствовать
// как реальный объект, так и прокси
type subject interface {
	request()
}

// Реальный проксируемый объект, содержит бизнес логику, но может быть слишком
// тяжеловесным, чтобы использовать его для каждого запроса, либо может
// быть слабо защищён и т.п.
type realSubject struct {
}

func (s *realSubject) request() {
	fmt.Println("RealSubject: Handling request.")
}

// Прокси имеет тот же интерфейс, что и проксируемый объект
type proxy struct {
	realSubject realSubject
}

func (p *proxy) checkAccess() bool {
	fmt.Println("Proxy: Checking access prior to firing a real request.")
	return true
}

func (p *proxy) logAccess() {
	fmt.Println("Proxy: Logging the time of request.")
}

func (p *proxy) request() {
	if p.checkAccess() {
		p.realSubject.request()
		p.logAccess()
	}
}

// proxy := proxy{realSubject: realSubject{}}
// proxy.request()

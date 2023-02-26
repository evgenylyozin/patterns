package main

import (
	"fmt"
	"sync"
)

var lock = &sync.Mutex{}

type singleton struct {
	name string
}

var singleInstance *singleton

func getSingletonInstance() *singleton {
	if singleInstance == nil {
		lock.Lock()
		defer lock.Unlock()
		if singleInstance == nil {
			fmt.Println("Создаю единственный экземпляр")
			singleInstance = &singleton{name: "Объект базы данных"}
		} else {
			fmt.Println("Экземпляр уже существует")
		}
	} else {
		fmt.Println("Экземпляр уже существует")
	}
	return singleInstance
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

func main() {
	singleton1 := getSingletonInstance()
	singleton2 := getSingletonInstance()

	fmt.Println(singleton1.name)
	fmt.Println(singleton2.name)

	singleton1.name = "ОБНОВЛЁННЫЙ объект базы данных"

	fmt.Println(singleton1.name)
	fmt.Println(singleton2.name)
}

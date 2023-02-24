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
			fmt.Println("Creating single instance now.")
			singleInstance = &singleton{name: "DB Object"}
		} else {
			fmt.Println("Single instance already created.")
		}
	} else {
		fmt.Println("Single instance already created.")
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

	singleton1.name = "UPDATED DB Object"

	fmt.Println(singleton1.name)
	fmt.Println(singleton2.name)
}

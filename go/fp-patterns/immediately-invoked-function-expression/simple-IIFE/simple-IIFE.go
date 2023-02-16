package main

import "fmt"

// Простая IIFE
func main() {
	func() {
		fmt.Println("Привет от простой IIFE")
	}()
}

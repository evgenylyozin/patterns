package main

import "fmt"

// Единичная запись, которая хранится в массиве
// записей внутри класса, представляющего пул объектов
type poolRecord struct {
	inUse    bool
	instance *someObject
}

// Тип объекта, который будет
// храниться внутри пула объектов
type someObject struct {
	order int
}

func (s *someObject) toString() string {
	return fmt.Sprintf("Я объект из пула, мой порядковый номер %v", s.order)
}

func newSomeObject(order int) *someObject {
	return &someObject{order}
}

// Пул объектов, в частности содержит внутри себя массив,
// содержащий записи о хранимых ссылках на объекты
type objectPool struct {
	pool []*poolRecord
}

func (o *objectPool) retrieve() *someObject {
	order := 1
	for _, record := range o.pool {
		order++
		if record.inUse == false {
			record.inUse = true
			return record.instance
		}
	}
	// Если неиспользуемых объектов не
	// обнаружено - создать новый
	newObj := newSomeObject(order)
	o.pool = append(o.pool, &poolRecord{inUse: true, instance: newObj})
	return newObj
}

// Отметить объект как не используемый и
// доступный к использованию другими частями
// кода
func (o *objectPool) release(obj *someObject) {
	for _, record := range o.pool {
		if record.instance == obj {
			record.inUse = false
		}
	}
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

func main() {
	op := objectPool{pool: make([]*poolRecord, 0)}

	obj1 := op.retrieve()
	fmt.Println(obj1.toString())
	obj2 := op.retrieve()
	fmt.Println(obj2.toString())
	obj3 := op.retrieve()
	fmt.Println(obj3.toString())

	op.release(obj1)
	obj4 := op.retrieve()
	fmt.Println(obj4.toString())

	op.release(obj2)
	obj5 := op.retrieve()
	fmt.Println(obj5.toString())

}

package main


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// ITERATOR (ИТЕРАТОР)
// ЦЕЛЬ: создать отдельный от коллекции объект, цель которого - перебор
// коллекции. Таким образом, объект, отвечающий за хранение и организацию
// данных не будет разрастаться и будет выполнять только свою основную
// функцию.

type iteratorValues interface {
	string | int
}

// Интерфейс итератора устанавливает, какие именно методы должен иметь каждый
// итератор
type iIterator[T iteratorValues] interface {
	current() T
	next() T
	key() int
	valid() bool
	rewind()
}

// Интерфейс агрегатор - устанавливает методы, которые должны иметь объекты -
// коллекции, чтобы возвращать соответствующий итератор
type aggregator interface {
	getIterator() iIterator[string]
}

// Конкретный итератор содержит логику прохода по коллекции
type stringsSliceIterator struct {
	collection wordsCollection
	position   int
	reverse    bool
}

func (i *stringsSliceIterator) rewind() {
	if i.reverse {
		i.position = i.collection.getCount() - 1
	} else {
		i.position = 0
	}
}
func (i *stringsSliceIterator) current() string {
	return i.collection.getItems()[i.position]
}
func (i *stringsSliceIterator) key() int {
	return i.position
}
func (i *stringsSliceIterator) next() string {
	item := i.collection.getItems()[i.position]
	if i.reverse {
		i.position--
	} else {
		i.position++
	}
	return item
}
func (i *stringsSliceIterator) valid() bool {
	if i.reverse {
		return i.position >= 0
	}
	return i.position < i.collection.getCount()
}

// Конкретная коллекция предоставляет один или несколько методов для
// возвращения сопоставимого с коллекцией итератора
type wordsCollection struct {
	items []string
}

func (c *wordsCollection) getItems() []string {
	return c.items
}
func (c *wordsCollection) getCount() int {
	return len(c.items)
}

func (c *wordsCollection) addItem(item string) {
	c.items = append(c.items, item)
}
func (c *wordsCollection) getIterator() iIterator[string] {
	return &stringsSliceIterator{collection: *c, position: 0, reverse: false}
}
func (c *wordsCollection) getReverseIterator() iIterator[string] {
	return &stringsSliceIterator{collection: *c, position: c.getCount() - 1, reverse: true}
}

// collection := wordsCollection{}
// collection.addItem("First")
// collection.addItem("Second")
// collection.addItem("Third")

// iterator := collection.getIterator()

// fmt.Println("Straight traversal:")
// for iterator.valid() {
// 	fmt.Println(iterator.next())
// }

// fmt.Println("Reverse traversal:")
// reverseIterator := collection.getReverseIterator()
// for reverseIterator.valid() {
// 	fmt.Println(reverseIterator.next())
// }

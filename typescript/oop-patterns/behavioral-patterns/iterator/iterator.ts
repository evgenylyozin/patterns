// Интерфейс итератора устанавливает, какие именно методы должен иметь каждый
// итератор
interface iIterator<T> {
  current(): T;
  next(): T;
  key(): number;
  valid(): boolean;
  rewind(): void;
}

// Интерфейс агрегатор - устанавливает методы, которые должны иметь объекты -
// коллекции, чтобы возвращать соответствующий итератор
interface Aggregator {
  getIterator(): iIterator<string>;
}

// Конкретный итератор содержит логику прохода по коллекции
class StringsArrayIterator implements iIterator<string> {
  private collection: WordsCollection;
  private position: number = 0;
  private reverse: boolean = false;

  constructor(collection: WordsCollection, reverse: boolean = false) {
    this.collection = collection;
    this.reverse = reverse;

    if (reverse) {
      this.position = collection.getCount() - 1;
    }
  }

  public rewind() {
    this.position = this.reverse ? this.collection.getCount() - 1 : 0;
  }

  public current(): string {
    return this.collection.getItems()[this.position];
  }

  public key(): number {
    return this.position;
  }

  public next(): string {
    const item = this.collection.getItems()[this.position];
    this.position += this.reverse ? -1 : 1;
    return item;
  }

  public valid(): boolean {
    if (this.reverse) {
      return this.position >= 0;
    }

    return this.position < this.collection.getCount();
  }
}

// Конкретная коллекция предоставляет один или несколько методов для
// возвращения сопоставимого с коллекцией итератора
class WordsCollection implements Aggregator {
  private items: string[] = [];

  public getItems(): string[] {
    return this.items;
  }

  public getCount(): number {
    return this.items.length;
  }

  public addItem(item: string): void {
    this.items.push(item);
  }

  public getIterator(): iIterator<string> {
    return new StringsArrayIterator(this);
  }

  public getReverseIterator(): iIterator<string> {
    return new StringsArrayIterator(this, true);
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const collection = new WordsCollection();
collection.addItem('Первый');
collection.addItem('Второй');
collection.addItem('Третий');

const iterator = collection.getIterator();

console.log('Проход по порядку:');
while (iterator.valid()) {
  console.log(iterator.next());
}

console.log('');
console.log('Проход с конца:');
const reverseIterator = collection.getReverseIterator();
while (reverseIterator.valid()) {
  console.log(reverseIterator.next());
}

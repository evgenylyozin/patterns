// Конкретный строитель имеет набор методов для поэтапного строительства конкретного
// объекта
interface Builder {
  producePartA(): void;
  producePartB(): void;
  producePartC(): void;
}

class ConcreteBuilder1 implements Builder {
  // изначально пустой объект продукта
  private product: Product1 = new Product1();

  private reset(): void {
    this.product = new Product1();
  }

  public producePartA(): void {
    this.product.parts.push('Часть А1');
  }

  public producePartB(): void {
    this.product.parts.push('Часть Б1');
  }

  public producePartC(): void {
    this.product.parts.push('Часть В1');
  }

  // Каждый строитель должен иметь метод для возврата созданного продукта
  // После возврата продукта (объекта) обычно происходит сброс ссылки
  // на созданный объект в строителе для подготовки к созданию нового объекта
  public getProduct(): Product1 {
    const result = this.product;
    this.reset();
    return result;
  }
}

// Конкретный продукт изначально представляет из себя стандартный пустой объект,
// который будет наполнен содержимым через вызов методов конкретного строителя
class Product1 {
  public parts: string[] = [];

  listParts() {
    console.log(`Части продукта: ${this.parts.join(', ')}\n`);
  }
}

// Необязательная, но удобная часть паттерна - Директор, в его обязанности
// входит регистрация конкретного строителя и выполнение через него
// шагов по построению нужного объекта в определённой последовательности
class Director {
  private builder: Builder | undefined;

  // Директор должен уметь работать с любым строителем, соответствующим определённому
  // интерфейсу
  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  // Директор включает в себя методы, которые клиентский код может использовать
  // для создания объектов. Методы вызывают соответствующие шаги строителя
  // по созданию объекта
  public buildMinimalViableProduct(): void {
    if (!this.builder) {
      throw new Error(
        'Объект строитель не установлен, вызовите метод setBuilder на объекте-директоре'
      );
    }
    this.builder.producePartA();
  }

  public buildFullFeaturedProduct(): void {
    if (!this.builder) {
      throw new Error(
        'Объект строитель не установлен, вызовите метод setBuilder на объекте-директоре'
      );
    }
    this.builder.producePartA();
    this.builder.producePartB();
    this.builder.producePartC();
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const director = new Director();

const builder = new ConcreteBuilder1();
director.setBuilder(builder);

console.log('Продукт в минимальной комплектации:');
director.buildMinimalViableProduct();
builder.getProduct().listParts();

console.log('Продукт в полной комплектации:');
director.buildFullFeaturedProduct();
builder.getProduct().listParts();

// строителя можно использовать и без директора
console.log('Уникально настроенный продукт:');
builder.producePartA();
builder.producePartC();
builder.getProduct().listParts();

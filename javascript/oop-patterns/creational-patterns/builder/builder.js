// Конкретный строитель имеет набор методов для поэтапного строительства конкретного
// объекта
class ConcreteBuilder1 {
  // изначально пустой объект продукта
  product;

  constructor() {
    this.reset();
  }

  reset() {
    this.product = new Product1();
  }

  producePartA() {
    this.product.parts.push('Часть А1');
  }

  producePartB() {
    this.product.parts.push('Часть Б1');
  }

  producePartC() {
    this.product.parts.push('Часть В1');
  }

  // Каждый строитель должен иметь метод для возврата созданного продукта
  // После возврата продукта (объекта) обычно происходит сброс ссылки
  // на созданный объект в строителе для подготовки к созданию нового объекта
  getProduct() {
    const result = this.product;
    this.reset();
    return result;
  }
}

// Конкретный продукт изначально представляет из себя стандартный пустой объект,
// который будет наполнен содержимым через вызов методов конкретного строителя
class Product1 {
  parts = [];

  listParts() {
    console.log(`Части продукта: ${this.parts.join(', ')}\n`);
  }
}

// Необязательная, но удобная часть паттерна - Директор, в его обязанности
// входит регистрация конкретного строителя и выполнение через него
// шагов по построению нужного объекта в определённой последовательности
class Director {
  builder;

  // Директор должен уметь работать с любым строителем, соответствующим определённому
  // интерфейсу
  setBuilder(builder) {
    this.builder = builder;
  }

  // Директор включает в себя методы, которые клиентский код может использовать
  // для создания объектов. Методы вызывают соответствующие шаги строителя
  // по созданию объекта
  buildMinimalViableProduct() {
    this.builder.producePartA();
  }

  buildFullFeaturedProduct() {
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

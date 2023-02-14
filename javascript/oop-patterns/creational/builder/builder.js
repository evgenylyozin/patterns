//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// BUILDER (СТРОИТЕЛЬ)
// ЦЕЛЬ: организовать систему для пошагового создания сложных настраиваемых
// объектов или разгрузить сложный конструктор, или упростить систему классов и
// субклассов

// Конкретный билдер имеет набор методов для поэтапного строительства конкретного
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
    this.product.parts.push('PartA1');
  }

  producePartB() {
    this.product.parts.push('PartB1');
  }

  producePartC() {
    this.product.parts.push('PartC1');
  }

  // Каждый билдер должен иметь метод для возврата созданного продукта
  // После возврата продукта (объекта) обычно происходит сброс ссылки
  // на созданный объект в билдере для подготовки к созданию нового объекта
  getProduct() {
    const result = this.product;
    this.reset();
    return result;
  }
}

// Конкретный продукт изначально представляет из себя стандартный пустой объект,
// который будет наполнен содержимым через вызов методов конкретного билдера
class Product1 {
  parts = [];

  listParts() {
    console.log(`Product parts: ${this.parts.join(', ')}\n`);
  }
}

// Необязательная, но удобная часть паттерна - Директор, в его обязанности
// входит регистрация конкретного билдера и выполнение через него
// шагов по построению нужного объекта в определённой последовательности
class Director {
  builder;

  // Директор должен ументь работать с любым билдером, соответствующим определёному
  // интерфейсу
  setBuilder(builder) {
    this.builder = builder;
  }

  // Директор включает в себя методы, которые клиентский код может использовать
  // для создания объектов. Методы вызывают соответствующие шаги билдера
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

// const director = new Director();

// const builder = new ConcreteBuilder1();
// director.setBuilder(builder);

// console.log('Standard basic product:');
// director.buildMinimalViableProduct();
// builder.getProduct().listParts();

// console.log('Standard full featured product:');
// director.buildFullFeaturedProduct();
// builder.getProduct().listParts();

// // Билдер можно использовать и без директора
// console.log('Custom product:');
// builder.producePartA();
// builder.producePartC();
// builder.getProduct().listParts();

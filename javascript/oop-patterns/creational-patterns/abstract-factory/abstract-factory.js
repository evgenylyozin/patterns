// Конкретный продукт
class ConcreteProductAType1 {
  mandatoryFeatureOfA() {
    console.log('Все продукты вида "A" имеют эту особенность');
  }
  specialFeatureOfAType1() {
    console.log('Эта особенность только у продуктов вида "А", типа 1');
  }
}

class ConcreteProductBType1 {
  mandatoryFeatureOfB() {
    console.log('Все продукты вида "Б" имеют эту особенность');
  }
  specialFeatureOfBType1() {
    console.log('Эта особенность только у продуктов вида "Б", типа 1');
  }
}

class ConcreteProductAType2 {
  mandatoryFeatureOfA() {
    console.log('Все продукты вида "А" имеют эту особенность');
  }
  specialFeatureOfAType2() {
    console.log('Эта особенность только у продуктов вида "А", типа 2');
  }
}

class ConcreteProductBType2 {
  mandatoryFeatureOfB() {
    console.log('Все продукты вида "Б" имеют эту особенность');
  }
  specialFeatureOfBType2() {
    console.log('Эта особенность только у продуктов вида "Б", типа 2');
  }
}

// Конкретная фабрика выпускает все необходимые
// типы конкретных продуктов, при этом каждая фабрика производит ряд этих продуктов со
// своими особенностями (например, одна фабрика производит набор кнопок черного цвета, а другая
// тот же набор белого цвета)
class ConcreteFactory1 {
  createProductA() {
    return new ConcreteProductAType1();
  }
  createProductB() {
    return new ConcreteProductBType1();
  }
}

class ConcreteFactory2 {
  createProductA() {
    return new ConcreteProductAType2();
  }
  createProductB() {
    return new ConcreteProductBType2();
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const FactoryOfType1Products = new ConcreteFactory1();
const FactoryOfType2Products = new ConcreteFactory2();

const productAType1 = FactoryOfType1Products.createProductA();
const productAType2 = FactoryOfType2Products.createProductA();
const productBType1 = FactoryOfType1Products.createProductB();
const productBType2 = FactoryOfType2Products.createProductB();

productAType1.mandatoryFeatureOfA();
productAType1.specialFeatureOfAType1();
productAType2.mandatoryFeatureOfA();
productAType2.specialFeatureOfAType2();
productBType1.mandatoryFeatureOfB();
productBType1.specialFeatureOfBType1();
productBType2.mandatoryFeatureOfB();
productBType2.specialFeatureOfBType2();

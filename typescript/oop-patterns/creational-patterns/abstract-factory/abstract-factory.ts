// интерфейс абстрактной фабрики делает совместимыми конкретные фабрики и стандартизирует
// типы продуктов, которые они выпускают
interface AbstractFactory {
  createProductA: () => AbstractProductA;
  createProductB: () => AbstractProductB;
}

// Абстрактный интерфейс для каждого выпускаемого типа продуктов стандартизирует
// признаки, присущие конкретному типу продукта, что делает их взаимозаменяемыми
interface AbstractProductA {
  mandatoryFeatureOfA: () => void;
}

interface AbstractProductB {
  mandatoryFeatureOfB: () => void;
}

// Конкретный продукт следует интерфейсу своего типа, но может иметь и свои особенные черты
class ConcreteProductAType1 implements AbstractProductA {
  mandatoryFeatureOfA() {
    console.log('Все продукты вида "А" имеют эту особенность');
  }
  specialFeatureOfAType1() {
    console.log('Эта особенность только у продуктов вида "А", типа 1');
  }
}

class ConcreteProductBType1 implements AbstractProductB {
  mandatoryFeatureOfB() {
    console.log('Все продукты вида "Б" имеют эту особенность');
  }
  specialFeatureOfBType1() {
    console.log('Эта особенность только у продуктов вида "Б", типа 1');
  }
}

class ConcreteProductAType2 implements AbstractProductA {
  mandatoryFeatureOfA() {
    console.log('Все продукты вида "А" имеют эту особенность');
  }
  specialFeatureOfAType2() {
    console.log('Эта особенность только у продуктов вида "А", типа 2');
  }
}

class ConcreteProductBType2 implements AbstractProductB {
  mandatoryFeatureOfB() {
    console.log('Все продукты вида "Б" имеют эту особенность');
  }
  specialFeatureOfBType2() {
    console.log('Эта особенность только у продуктов вида "Б", типа 2');
  }
}

// Конкретная фабрика, следуя интерфейсу абстрактной фабрики, выпускает все необходимые
// типы конкретных продуктов, при этом каждая фабрика производит ряд этих продуктов со
// своими особенностями (например, одна фабрика производит набор кнопок черного цвета, а другая
// тот же набор белого цвета)
class ConcreteFactory1 implements AbstractFactory {
  createProductA() {
    return new ConcreteProductAType1();
  }
  createProductB() {
    return new ConcreteProductBType1();
  }
}

class ConcreteFactory2 implements AbstractFactory {
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

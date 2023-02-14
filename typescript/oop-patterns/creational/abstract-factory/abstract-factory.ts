
// интерфейс абстрактной фабрики делает совместимыми конкретные фабрики и стандартизирует
// типы продуктов, которые они выпускают
interface AbstractFactory {
  createProductA: () => AbstractProductA;
  createProductB: () => AbstractProductB;
}

// Абстрактный интерфейс для каждого выпускаемого типа продуктов стандартизирует
// признаки, присущие конкретному типу продукта, что делает их взаимозаменяемыми
interface AbstractProductA {
  mondatoryFeatureOfA: () => void;
}

interface AbstractProductB {
  mondatoryFeatureOfB: () => void;
}

// Конкретный продукт следует интерфейсу своего типа, но может иметь и свои особенные черты
class ConcreteProductAType1 implements AbstractProductA {
  mondatoryFeatureOfA() {
    console.log('All A products have this feature');
  }
  specialFeatureOfAType1() {
    console.log('This feature is only in As of type 1');
  }
}

class ConcreteProductBType1 implements AbstractProductB {
  mondatoryFeatureOfB() {
    console.log('All B products have this feature');
  }
  specialFeatureOfBType1() {
    console.log('This feature is only in Bs of type 1');
  }
}

class ConcreteProductAType2 implements AbstractProductA {
  mondatoryFeatureOfA() {
    console.log('All A products have this feature');
  }
  specialFeatureOfAType2() {
    console.log('This feature is only in As of type 2');
  }
}

class ConcreteProductBType2 implements AbstractProductB {
  mondatoryFeatureOfB() {
    console.log('All B products have this feature');
  }
  specialFeatureOfBType2() {
    console.log('This feature is only in Bs of type 2');
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

// const FactoryOfType1Products = new ConcreteFactory1();
// const FactoryOfType2Products = new ConcreteFactory2();

// const productAType1 = FactoryOfType1Products.createProductA();
// const productAType2 = FactoryOfType2Products.createProductA();
// const productBType1 = FactoryOfType1Products.createProductB();
// const productBType2 = FactoryOfType2Products.createProductB();

// productAType1.mondatoryFeatureOfA();
// productAType1.specialFeatureOfAType1();
// productAType2.mondatoryFeatureOfA();
// productAType2.specialFeatureOfAType2();
// productBType1.mondatoryFeatureOfB();
// productBType1.specialFeatureOfBType1();
// productBType2.mondatoryFeatureOfB();
// productBType2.specialFeatureOfBType2();

// каждое выражение (как терминальное, так и нетерминальное) должно иметь метод
// для интерпретации
interface IAbstractExpression {
  interpret(): number;
}

// терминальное выражение
class Numeral implements IAbstractExpression {
  value: number;

  constructor(value: string) {
    this.value = parseInt(value);
  }

  interpret(): number {
    return this.value;
  }
}

// Нетерминальное выражение
class Add implements IAbstractExpression {
  left: IAbstractExpression;
  right: IAbstractExpression;

  constructor(left: IAbstractExpression, right: IAbstractExpression) {
    this.left = left;
    this.right = right;
  }

  interpret() {
    return this.left.interpret() + this.right.interpret();
  }
}

class Subtract implements IAbstractExpression {
  left: IAbstractExpression;
  right: IAbstractExpression;

  constructor(left: IAbstractExpression, right: IAbstractExpression) {
    this.left = left;
    this.right = right;
  }

  interpret() {
    return this.left.interpret() - this.right.interpret();
  }
}

// The Client
// Интерпретируемая строка состоит из чисел, пробелов и знаков "+" и "-"
const SENTENCE = '5 + 4 - 3 + 7 - 2';
console.log(SENTENCE);

// В данном случае создание Абстрактного синтаксического дерева (AST) происходит
// вручную
const AST: IAbstractExpression[] = [];
AST.push(new Add(new Numeral('5'), new Numeral('4'))); // 5 + 4
AST.push(new Subtract(AST[0], new Numeral('3'))); // ^ - 3
AST.push(new Add(AST[1], new Numeral('7'))); // ^ + 7
AST.push(new Subtract(AST[2], new Numeral('2'))); // ^ - 2

const AST_ROOT = AST.pop();

console.log(AST_ROOT!.interpret()); // => 11

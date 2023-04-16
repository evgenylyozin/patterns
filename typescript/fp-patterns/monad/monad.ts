// Тип возвращаемого функциями значения (Монадический тип)
type NumStrTuple = [number, string];

type AddFunc = (x: number) => NumStrTuple;

// Есть ряд функций, которые хотелось бы скомпоновать, но значение, которое
// они возвращают - не подходит по типу в качестве аргумента для этих
// функций
const add1: AddFunc = (x: number): NumStrTuple => {
  return [x + 1, ' + 1'];
};
const add2: AddFunc = (x: number): NumStrTuple => {
  return [x + 2, ' + 2'];
};
const add3: AddFunc = (x: number): NumStrTuple => {
  return [x + 3, ' + 3'];
};

// Функция запускает процесс, предоставляя начальное значение
// нужного типа (ожидаемого функцией bind)
const init: AddFunc = (x: number): NumStrTuple => {
  return [x, `Результат расчета выражения ${x}`];
};

// Функция использует данные, переданные в качестве первого
// аргумента для вызова функции, передаваемой вторым аргументом,
// возвращая при этом ожидаемый тип результата
const bind = (v: NumStrTuple, f: AddFunc): NumStrTuple => {
  const result = f(v[0]);
  return [result[0], v[1].concat(result[1])];
};

// Компоновка функций, результат вызова которых не соответствует
// типу параметров, ожидаемых этими функциями
console.log(bind(bind(bind(init(0), add1), add2), add3));

// Вспомогательная функция, позволяющая избежать вложения вызовов
// функции bind
const pipeline = (v: NumStrTuple, ...funcs: AddFunc[]) => {
  for (let f of funcs) {
    v = bind(v, f);
  }
  return v;
};

// Компоновка функций с использованием вспомогательной функции
console.log(pipeline(init(0), add1, add2, add3));

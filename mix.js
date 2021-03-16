const swapElement = (array, index) => {
  array[index] = +!array[index];
  return array;
};

const mixArrays = (arrays, index) => {
  if (index < 0) {
    return arrays;
  }

  console.log('index', index);
  console.log('arrays', arrays);

  let swapedArrays = [...arrays].map(array => swapElement([...array], index));

  return mixArrays([...arrays, ...swapedArrays], index - 1);
};

const mixArray = array => {
  if (array.length === 1) {
    return array;
  }
  return mixArrays([array], array.length - 1);
};

console.log('mixed arrays', mixArray([0, 0, 0, 0]));

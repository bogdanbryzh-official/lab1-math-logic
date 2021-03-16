// Mixing algorithm
//

const swapElement = (array, index) => {
  array[index] = +!array[index];
  return array;
};

const mixArrays = (arrays, index) => {
  if (index < 0) {
    return arrays;
  }

  let swapedArrays = [...arrays].map(array => swapElement([...array], index));

  return mixArrays([...arrays, ...swapedArrays], index - 1);
};

const mixArray = array => {
  if (array.length === 1) {
    return array;
  }
  return mixArrays([array], array.length - 1);
};

const createArray = num => {
  let array = [];
  for (let i = 0; i < num; i++) {
    array.push(1);
  }
  return array;
};

//
// DOM elements
//

const amount = document.getElementById('amount');
const letters = document.getElementById('letters');
const goBtn = document.getElementById('go');

const output = document.getElementById('output');
const amountOutput = output.querySelector('[data-state="amount"]');
const lettersOutput = output.querySelector('[data-state="letters"]');

const tableHead = document.querySelector('table thead tr');
const tableBody = document.querySelector('table tbody');

//
// DOM manipulation
//

const createTh = letter => {
  const td = document.createElement('th');
  td.textContent = letter;
  return td;
};

const createTd = bool => {
  const th = document.createElement('td');
  th.textContent = bool;
  return th;
};

const createTableRow = tds => {
  if (!tds) {
    return null;
  }
  const tr = document.createElement('tr');

  [...tds].forEach(td => {
    tr.appendChild(td);
  });

  return tr;
};

const fillTable = letters => {
  const lettersAmount = letters.length;

  tableHead.innerHTML = '';
  tableBody.innerHTML = '';

  for (let index = 0; index < lettersAmount; index++) {
    const letter = letters[index];
    const letterHead = createTh(letter);

    tableHead.append(letterHead);
  }

  const tableRows = mixArray(createArray(lettersAmount));
  tableRows.forEach(tableRow => {
    let tds = [];
    tableRow.forEach(td => {
      tds.push(createTd(td));
    });
    tableBody.appendChild(createTableRow(tds));
  });
};

//
// Event listeners and validation
//

amount.addEventListener('input', () => {
  let lettersAmount = amount.value;
  let lettersEntered = letters.value;

  amountOutput.textContent = `${lettersAmount} letters`;

  if (lettersEntered.length != parseInt(lettersAmount)) {
    letters.classList.add('wrong');
    goBtn.disabled = true;
  } else {
    letters.classList.remove('wrong');
    goBtn.disabled = false;
  }
});

letters.addEventListener('input', () => {
  let lettersAmount = amount.value;
  let lettersEntered = letters.value;

  let lettersParsed = Array.from(new Set(lettersEntered.split('')));

  lettersOutput.innerHTML = `<p>Entered: ${lettersEntered}</p><p>Using: ${lettersParsed.join(
    ''
  )}</p>`;

  if (lettersParsed.length != parseInt(lettersAmount)) {
    letters.classList.add('wrong');
    goBtn.disabled = true;
  } else {
    letters.classList.remove('wrong');
    goBtn.disabled = false;
  }
});

goBtn.addEventListener('click', () => {
  let lettersParsed = Array.from(new Set(letters.value.split(''))).sort();
  fillTable(lettersParsed);
});

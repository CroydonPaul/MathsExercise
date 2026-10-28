const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const multiples = ['hundred', 'thousand', 'million', 'billion'];

function UnrecognizedNumberWords(num_as_words) {
  let unrecognized = [];
  for (let word of num_as_words) {
    if (!(unrecognized.includes(word)
      || ones.includes(word)
      || tens.includes(word)
      || teens.includes(word)
      || multiples.includes(word))
    ) {
      unrecognized.push(word);
    }
  }
  return unrecognized;
}

function n99_ToWords(n) {
  console.assert(0 <= n && n <= 99);
  if (n <= 9)
    return ones[n];
  if (n <= 19)
    return teens[n - 10];
  console.assert(20 <= n && n <= 99);
  let tens_word = tens[Math.floor(n / 10)];
  let digit = n % 10;
  if (digit == 0)
    return tens_word;
  return tens_word + " " + ones[digit];
}

function n999_ToWords(n) {
  console.assert(0 <= n && n <= 999);
  if (n < 100)
    return n99_ToWords(n);
  console.assert(100 <= n && n <= 999);
  let hundreds = ones[Math.floor(n / 100)];
  let n99 = n % 100;
  if (n99 == 0)
    return hundreds + " hundred";
  return hundreds + " hundred and " + n99_ToWords(n99);
}

function n999999_ToWords(n) {
  console.assert(0 <= n && n <= 999999);
  if (n <= 999)
    return n999_ToWords(n);
  console.assert(1000 <= n && n <= 999999);
  let thousands = n999_ToWords(Math.floor(n / 1000));
  let n999 = n % 1000;
  if (n999 == 0)
    return thousands + " thousand";
  let n999_words = n999_ToWords(n999);
  if (n999 <= 99)
    return thousands + " thousand, and " + n999_words;
  return thousands + " thousand, " + n999_words;
}

function millionsToWords(n) {
  console.assert(0 <= n);
  if (n <= 999999)
    return n999999_ToWords(n);
  console.assert(1000000 <= n && n <= 999999999);
  let millions = n999_ToWords(Math.floor(n / 1000000));
  let n999999 = n % 1000000;
  if (n999999 == 0)
    return millions + "million";
  if (n999999 <= 99)
    return millions + " million, and " + n999999_ToWords(n999999);
  return millions + " million, " + n999999_ToWords(n999999);
}

function billionsToWords(n) {
  console.assert(0 <= n);
  if (n <= 999999999)
    return millionsToWords(n);
  console.assert(1000000000 <= n); /* && n <= 999999999999); */
  let billions = billionsToWords(Math.floor(n / 1000000000));
  let millions = n % 1000000000;
  if (millions == 0)
    return billions + "billion";
  if (millions <= 99)
    return billions + " billion, and " + millionsToWords(millions);
  return billions + " billion, " + millionsToWords(millions);
}

function natToWords(n) {
  if (n == 0)
    return "zero";
  return billionsToWords(n).trim();
}

/* export { natToWords }; */

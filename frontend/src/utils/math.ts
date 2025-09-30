export const toFixed2Decimal = (number: number): number => {
  return Number(number.toFixed(2))
}
export const formatLargeNumber = (
  number: number | string = 0,
  dec: number = 2,
) => {
  if (number == '') {
    number = 0
  }
  if (typeof number == 'string') {
    number = Number(number)
  }
  if (number === 0) {
    return '0'
  }
  const formatWithDecimals = (value: number) => {
   return value.toFixed(dec) 
  }

  if (number >= 1e9) {
    const billion = number / 1e9
    return formatWithDecimals(billion) + 'B'
  }
  if (number >= 1e6) {
    const million = number / 1e6
    return formatWithDecimals(million) + 'M'
  }
  if (number >= 1e3) {
    const thousand = number / 1e3
    return formatWithDecimals(thousand) + 'K'
  }
  if (isNaN(number)) {
    return '0'
  }
  // return formatWithDecimals(number).toString();
  return number.toFixed(4);
}

function toSubscript(numberStr: string): string {
  const subscripts = '₀₁₂₃₄₅₆₇₈₉';
  return numberStr.split('').map(digit => subscripts[parseInt(digit)]).join('');
}

export function formatNumber(num: number | string = 0, dec: number = 2,): string {
  if(typeof num !== "number"){
    num = Number(num)
  }
  const absNum = Math.abs(num);
  const suffixes = [
      { threshold: 1e12, suffix: 't' },
      { threshold: 1e9, suffix: 'b' },
      { threshold: 1e6, suffix: 'm' },
      { threshold: 1e3, suffix: 'k' },
  ];

  // Handle large numbers by appending suffixes
  for (let { threshold, suffix } of suffixes) {
      if (absNum >= threshold) {
          let shortened = num / threshold;
          return `${shortened.toPrecision(3)}${suffix}`;
      }
  }

  // Handle numbers with a lot of decimal places by limiting to 4 significant digits
  if (absNum >= 1 && absNum < 1000) {
      return parseFloat(num.toPrecision(4)).toString();
  }

  // Handle very small numbers by formatting as "0.0<subscript number of leading zeros><first significant digit>"
  if (absNum > 0 && absNum < 1) {
      const leadingZeros = Math.floor(Math.log10(absNum) * -1);
      if (leadingZeros > 2) {
        const firstSignificantDigit = absNum.toString().replace(/0|\.|e|\+|\-/g, '').charAt(0);
        const subscriptZeros = toSubscript(leadingZeros.toString());
        return `0.0${subscriptZeros}${firstSignificantDigit}`;
    } else {
        return num.toString();
    }
  }

  // Return the number as-is if no special formatting is required
  return num.toString();
}
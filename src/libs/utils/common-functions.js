export const download = (filename, text) =>{
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();
  document.body.removeChild(element);
}

export const getDate = (timestamp) => {
  let a = new Date(timestamp)
  return a.toUTCString()
}

export const getFormattedNumber = (n, decimals=2) => {
  if (isNaN(Number(n))) return '...';

  let formatter = new Intl.NumberFormat()
  let [first, second] = Number(n).toFixed(decimals).split('.')
  first = formatter.format(first)
  if (decimals === 0) return first;
  return first + '.' + second
}

export const jsonToCsv = (items) => {
  const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
  const header = Object.keys(items[0])
  let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
  csv.unshift(header.join(','))
  csv = csv.join('\r\n')
  return csv
}
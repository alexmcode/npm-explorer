const regex = /\./gi;
const dot = "1.1.0"
const a = encodeURIComponent(dot).replace(regex, '%2E')
console.log({a})
const d = decodeURIComponent(a).replace('%2E', '.')
console.log({d})
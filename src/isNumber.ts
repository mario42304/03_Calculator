export default function isNumber(string: string) {
  return /^-?\d+(.\d+)?$/.test(string);
}

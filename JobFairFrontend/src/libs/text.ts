export function CapitalizeFirstLetter(str: string): string {
  return str.slice(0, 1).toUpperCase() + str.slice(1, undefined);
}

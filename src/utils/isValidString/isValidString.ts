export function isValidString(value: string): boolean {
  return typeof value === 'string' && value.trim() !== '';
}

export function toCapitalize(s: string) {
  const firstLetter = s.charAt(0).toUpperCase();
  const remainingLetters = s.slice(1).toLowerCase();
  return firstLetter + remainingLetters;
}

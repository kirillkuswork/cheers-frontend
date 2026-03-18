// пример использования getNoun(7, ['арбуз', 'арбуза', 'арбузов']); (7 арбузов)
const getNoun = (number: number, words_arr: string[]) => {
  number = Math.abs(number);
  if (Number.isInteger(number)) {
    const options = [2, 0, 1, 1, 1, 2];
    return words_arr[(number % 100 > 4 && number % 100 < 20) ? 2 : options[(number % 10 < 5) ? number % 10 : 5]];
  }
  return words_arr[1];
};

export default getNoun;

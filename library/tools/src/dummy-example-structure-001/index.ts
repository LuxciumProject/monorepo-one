export type AcconuntNumber = number & { _TYPE_: 'AcconuntNumber' };

const newAccountNumber = (accountNumber: number): AcconuntNumber =>
  accountNumber as AcconuntNumber;

export const dummyValue = newAccountNumber(14);

// console.log(dummyValue);

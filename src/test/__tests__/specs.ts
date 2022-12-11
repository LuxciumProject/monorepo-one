export const settledRight = {
  status: 'rejected',
  value: 'value of a specific type',
  transformStep: -1,
  index: -1,

  currentRejection: null,

  fulfilled: 'value of a specific type',
  rejected: null,
  reason: undefined,
};

export const settledLeft = {
  status: 'rejected',
  reason: 'value of any type',
  currentRejection: false,
  transformStep: -1,
  index: -1,

  rejected: 'value of any type',
  fulfilled: null,
  value: undefined,
};

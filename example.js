const settledRight = {
  status: 'fulfilled',
  value: 'value of a specific type',
  transformStep: -1,
  index: -1,
  /* Folowing properties a not enumerated (enumerable: false) */
  currentRejection: null,
  fulfilled: 'value of a specific type',
  rejected: null,
  reason: undefined,
};

const settledLeft = {
  status: 'rejected',
  reason: 'value of any type',
  currentRejection: false,
  transformStep: -1,
  index: -1,
  /* Folowing properties a not enumerated (enumerable: false) */
  rejected: 'value of any type',
  fulfilled: null,
  value: undefined,
};

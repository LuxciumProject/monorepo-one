export {};
describe('Sanity check Level 1', () => {
  it('Should pass the smoke test settledLengts_TEST_', () => {});
});

//     expect(
//       getFulfilledResults([
//         {
//           status: FULFILLED,
//           value: null,
//           [FULFILLED]: null,
//           [REJECTED]: null,
//           currentRejection: null,
//           transformStep: 0,
//           index: 0,
//         },
//       ])
//     ).toStrictEqual([
//       {
//         currentRejection: null,
//         fulfilled: null,
//         index: 0,
//         reason: undefined,
//         rejected: null,
//         status: 'fulfilled',
//         transformStep: -1,
//         value: null,
//       },
//     ]);
//   });

//   it('Should pass the smoke test settledLengts_TEST_', () => {
//     expect(
//       getFulfilledResults([
//         {
//           status: REJECTED,
//           reason: null,
//           [FULFILLED]: null,
//           [REJECTED]: null,
//           currentRejection: true,
//           transformStep: 0,
//           index: 0,
//         },
//       ])
//     ).toStrictEqual([]);
//   });

//   it('Should pass the smoke test settledLengts_TEST_', () => {
//     expect(
//       getFulfilledResults([
//         {
//           status: REJECTED,
//           reason: null,
//         },
//         {
//           status: FULFILLED,
//           value: null,
//           [FULFILLED]: null,
//           [REJECTED]: null,
//           currentRejection: null,
//           transformStep: 0,
//           index: 0,
//         },
//         {
//           status: FULFILLED,
//           value: null,
//         },
//         {
//           status: REJECTED,
//           reason: null,
//           [FULFILLED]: null,
//           [REJECTED]: null,
//           currentRejection: true,
//           transformStep: 0,
//           index: 0,
//         },
//       ])
//     ).toStrictEqual([
//       {
//         currentRejection: null,
//         fulfilled: null,
//         index: 0,
//         reason: undefined,
//         rejected: null,
//         status: 'fulfilled',
//         transformStep: -1,
//         value: null,
//       },
//       {
//         currentRejection: null,
//         fulfilled: null,
//         index: 1,
//         reason: undefined,
//         rejected: null,
//         status: 'fulfilled',
//         transformStep: -1,
//         value: null,
//       },
//     ]);
//   });
// });

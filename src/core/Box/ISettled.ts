export interface ISettled {
  transformStep: number;
  index: number;
  currentRejection: false | true | null;
  status: "fulfilled" | "rejected";
}

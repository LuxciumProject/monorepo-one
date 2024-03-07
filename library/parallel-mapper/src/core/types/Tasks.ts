export interface Task<A> {
  (): Promise<A>;
}

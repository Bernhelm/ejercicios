export interface Exercise {
  a: number;
  b: number;
  operation: string;
  disabled: boolean;
  result: boolean;
  answer: number;
}

export interface UserData {
  data: Array<number>;
  label: string;
}

export interface Exercise {
  a?: number;
  b?: number;
  name?: string;
  operation: string;
  disabled?: boolean;
  result?: boolean;
  answer?: number;
  level?: number;
}

export interface UserData {
  data: Array<Array<number>>;
  label: string;
  id: number;
}

export type QueryParam = string | string[] | undefined;

export type TransactionType = {
  id: string,
  category: string;
  amount: number;
  note?: string;
  date: Date;
  createdAt: Date;
};

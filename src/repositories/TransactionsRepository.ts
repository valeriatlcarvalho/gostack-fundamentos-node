import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public balanceValidation(outcome: number): boolean {
    const { total } = this.getBalance();
    return outcome <= total;
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions
      .map(({ type, value }: Transaction) => (type === 'income' ? value : 0))
      .reduce((previous, current) => previous + current);
    const outcomes = this.transactions
      .map(({ type, value }: Transaction) => (type === 'outcome' ? value : 0))
      .reduce((previous, current) => previous + current);

    return {
      income: incomes,
      outcome: outcomes,
      total: incomes - outcomes,
    };
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

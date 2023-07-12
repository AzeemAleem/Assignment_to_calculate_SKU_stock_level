import * as fs from "fs";
import StockItem from "../interfaces/StockItem";
import Transaction from "../interfaces/Transaction";

//Stock data reader
export function readStockData(): StockItem[] {
  const stockData: StockItem[] = JSON.parse(
    fs.readFileSync("./data/stock.json", "utf-8")
  );
  return stockData;
}

// Transactions data reader
export function readTransactionData(): Transaction[] {
  const transactionData: Transaction[] = JSON.parse(
    fs.readFileSync("./data/transactions.json", "utf-8")
  );
  return transactionData;
}

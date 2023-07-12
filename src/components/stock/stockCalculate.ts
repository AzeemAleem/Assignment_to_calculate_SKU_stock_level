import StockItem from "../../interfaces/StockItem";
import Transaction from "../../interfaces/Transaction";
import { readStockData, readTransactionData } from "../../utils/fileReader";

async function getCurrentStockLevel(
  sku: string
): Promise<{ sku: string; qty: number }> {
  try {
    //Reading the data from the Json files
    const stockData: StockItem[] = readStockData();
    const transactionData: Transaction[] = readTransactionData();

    const startingStock =
      stockData.find((item) => item.sku === sku)?.stock || 0;

    // Filter out the relevant transactions for the given SKU
    const relevantTransactions = transactionData.filter(
      (transaction) => transaction.sku === sku
    );

    if (relevantTransactions.length === 0) {
      throw new Error(`SKU '${sku}' does not exist.`);
    }
    // Calculating the total quantity by iterating over relevant transactions
    const totalQuantity = relevantTransactions.reduce((acc, transaction) => {
      // If the transaction type is "order", we are adding the quantity to the accumulator
      // If the transaction type is not "order" or it can be refund etc, subtract the quantity from the accumulator
      return transaction.type === "order"
        ? acc + transaction.qty
        : acc - transaction.qty;
      
    }, startingStock);

    // Checking if the total quantity is negative
    if (totalQuantity < 0) {
      throw new Error(`Invalid stock quantity for SKU '${sku}'.`);
    }

    // Final result
    return { sku, qty: totalQuantity };
  } catch (error: any) {
    throw new Error(`Failed to calculate stock level for SKU '${sku}'.`);
  }
}

export default getCurrentStockLevel;

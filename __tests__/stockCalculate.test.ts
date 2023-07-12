import getCurrentStockLevel from "../src/components/stock/stockCalculate";
// const getCurrentStockLevel = require("../src/components/stock/stockCalculate.js").default;

test("Valid SKU with transactions", async () => {
  const result = await getCurrentStockLevel("LTV719449/39/39");
  expect(result.sku).toBe("LTV719449/39/39");
  expect(result.qty).toBe(8540);
});

test("Valid SKU without transactions", async () => {
  const result = await getCurrentStockLevel("TZH873296/06/42");
  expect(result.sku).toBe("TZH873296/06/42");
  expect(result.qty).toBe(1159);
});

test("Invalid SKU", async () => {
  await expect(getCurrentStockLevel("ABC123")).rejects.toThrow(
    `Failed to calculate stock level for SKU 'ABC123'.`
  );
});

test("Negative stock quantity", async () => {
  try {
    await getCurrentStockLevel("XOE089797/10/74");
  } catch (error) {
    expect(error).toEqual(new Error(`Invalid stock quantity for SKU 'XOE089797/10/74'.`));
  }
});

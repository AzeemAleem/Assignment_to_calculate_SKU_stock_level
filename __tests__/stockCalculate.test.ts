import getCurrentStockLevel from "../src/components/stock/stockCalculate";

test("Valid SKU with transactions", async () => {
  const result = await getCurrentStockLevel("LTV719449/39/39");
  expect(result.sku).toBe("LTV719449/39/39");
  expect(result.qty).toBe(8525);
});

test("Valid SKU without transactions", async () => {
  const result = await getCurrentStockLevel("TZH873296/06/42");
  expect(result.sku).toBe("TZH873296/06/42");
  expect(result.qty).toBe(0);
});

test("Invalid SKU", async () => {
  await expect(getCurrentStockLevel("ABC123")).rejects.toThrow(
    `Failed to calculate stock level for SKU 'ABC123'.`
  );
});

test("Negative stock quantity", async () => {
  await expect(getCurrentStockLevel("XOE089797/10/74")).rejects.toThrow(
    `Invalid stock quantity for SKU 'XOE089797/10/74'.`
  );
});

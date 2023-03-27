const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the partion key when it is present", () => {
    const result = "partition-key";
    const trivialKey = deterministicPartitionKey({ partitionKey: "partition-key" });
    expect(trivialKey).toBe(result);
  });

  it("Returns the partion key when it is present in the event", () => {
    const result = JSON.stringify({ key: "value" });
    const trivialKey = deterministicPartitionKey({ partitionKey: { key: "value" } });
    expect(trivialKey).toBe(result);
  });

});

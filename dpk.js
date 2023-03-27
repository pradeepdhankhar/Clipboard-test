const crypto = require("crypto");

// defined the constant value at top so that we can change them if needed
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  // Initialized the candidate key to reduce the if condition
  let candidate = TRIVIAL_PARTITION_KEY;

  // removed the extra if condition and merged it with existing one using else if
  if (event && event.partitionKey) {
    candidate = event.partitionKey;
  } else if (event) {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }

  // removed the else condition because candidate already initialized
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
};
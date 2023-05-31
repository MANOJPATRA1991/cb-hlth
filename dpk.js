const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const createEncoding = (value, algorithm = "sha3-512", encoding = "hex") => {
  if (typeof value !== "string") {
    value = JSON.stringify(value);
  }

  return crypto.createHash(algorithm).update(value).digest(encoding);
};

const deterministicPartitionKey = (event) => {
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    const { partitionKey = "" } = event;
    candidate = `${partitionKey}` || createEncoding(event);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createEncoding(candidate);
  }

  return candidate;
};

module.exports = { deterministicPartitionKey };

// const crypto = require("crypto");

// exports.deterministicPartitionKey = (event) => {
//   const TRIVIAL_PARTITION_KEY = "0";
//   const MAX_PARTITION_KEY_LENGTH = 256;
//   let candidate;

//   if (event) {
//     if (event.partitionKey) {
//       candidate = event.partitionKey;
//     } else {
//       const data = JSON.stringify(event);
//       candidate = crypto.createHash("sha3-512").update(data).digest("hex");
//     }
//   }

//   if (candidate) {
//     if (typeof candidate !== "string") {
//       candidate = JSON.stringify(candidate);
//     }
//   } else {
//     candidate = TRIVIAL_PARTITION_KEY;
//   }
//   if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
//     candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
//   }
//   return candidate;
// };
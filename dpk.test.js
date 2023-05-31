const { deterministicPartitionKey } = require("./dpk.js");
const crypto = require("crypto");

let hasMock = {};
let createHashMock = undefined;

describe("deterministicPartitionKey", () => {
  beforeEach(() => {
    hashMock = {
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnValueOnce("encrypt 123"),
    };
    createHashMock = jest
      .spyOn(crypto, "createHash")
      .mockImplementationOnce(() => hashMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("should return the literal '0'", () => {
    it("when given no input", () => {
      const trivialKey = deterministicPartitionKey();
      expect(trivialKey).toBe("0");
    });
    it("when given input is undefined", () => {
      const trivialKey = deterministicPartitionKey(undefined);
      expect(trivialKey).toBe("0");
    });
  });

  describe("should return the encrypted string", () => {
    it("when given input is an array", () => {
      const trivialKey = deterministicPartitionKey([]);
      expect(trivialKey).toBe("encrypt 123");
    });

    it("when given input is not an object", () => {
      const trivialKey = deterministicPartitionKey("str");
      expect(trivialKey).toBe("encrypt 123");
    });

    it("when given input is an object without the key 'partitionKey'", () => {
      const trivialKey = deterministicPartitionKey({});
      expect(trivialKey).toBe("encrypt 123");
    });

    it("when given input is an object with the key 'partitionKey' set to ''", () => {
      const trivialKey = deterministicPartitionKey({ partitionKey: "" });
      expect(trivialKey).toBe("encrypt 123");
    });

    it("when given input is an object with the key 'partitionKey' set to a string of length > 256", () => {
      const temp = {
        partitionKey:
          "b7478342a465088fc33d43a64cd370737e5a3bf6749ca62c1d6db341beb987326b4df3a9f54f67a2f0ee915d4216af2f382fda14dd58dc67794f745e92d7a7f6b7478342a465088fc33d43a64cd370737e5a3bf6749ca62c1d6db341beb987326b4df3a9f54f67a2f0ee915d4216af2f382fda14dd58dc67794f745e92d7a7f6b7478342a465088fc33d43a64cd370737e5a3bf6749ca62c1d6db341beb987326b4df3a9f54f67a2f0ee915d4216af2f382fda14dd58dc67794f745e92d7a7f6",
      };
      const trivialKey = deterministicPartitionKey(temp);
      expect(trivialKey).toBe("encrypt 123");
    });
  });

  describe("should return the value of 'partitionKey'", () => {
    it("when given input is an object with a defined value for key 'partitionKey'", () => {
      const temp = {
        partitionKey: 123,
      };
      const trivialKey = deterministicPartitionKey(temp);
      expect(trivialKey).toBe("123");
    });
    it("when given input is an object with a defined value for key 'partitionKey' and has length = 256 characters", () => {
      const temp = {
        partitionKey:
          "b7478342a465088fc33d43a64cd370737e5a3bf6749ca62c1d6db341beb987326b4df3a9f54f67a2f0ee915d4216af2f382fda14dd58dc67794f745e92d7a7f6b7478342a465088fc33d43a64cd370737e5a3bf6749ca62c1d6db341beb987326b4df3a9f54f67a2f0ee915d4216af2f382fda14dd58dc67794f745e92d7a7f6",
      };
      const trivialKey = deterministicPartitionKey(temp);
      expect(trivialKey).toBe(temp.partitionKey);
    });
  });
});

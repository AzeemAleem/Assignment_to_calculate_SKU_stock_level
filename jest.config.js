export default {
    // Other Jest configurations...
    testEnvironment: "node",
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
  };
  
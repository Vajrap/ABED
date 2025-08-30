// import { z } from "zod";
// import { expect, test } from "bun:test";
// import { isBodyValid } from "../../src/Utils/isBodyValid";

// // Unit tests for the isBodyValid() helper function.
// // This function returns true/false based on whether input data conforms to a given Zod schema.
// // These tests use a dummy "id/password" schema as an example, but the function is generic.

// const dummySchema = z.object({
//   id: z.string(),
//   password: z.string(),
// });

// test("isBodyValid returns true for valid input matching schema", () => {
//   const data = { id: "user123", password: "secret" };
//   expect(isBodyValid(dummySchema, data)).toBe(true);
// });

// test("isBodyValid returns false for missing required field", () => {
//   const data = { id: "user123" }; // password missing
//   expect(isBodyValid(dummySchema, data)).toBe(false);
// });

// test("isBodyValid returns false for incorrect field types", () => {
//   const data = { id: 123, password: true }; // wrong types
//   expect(isBodyValid(dummySchema, data)).toBe(false);
// });

// test("isBodyValid returns true when extra fields are present (schema not strict)", () => {
//   const data = { id: "user123", password: "secret", role: "admin" };
//   expect(isBodyValid(dummySchema, data)).toBe(true);
// });

// test("isBodyValid returns false for null input", () => {
//   expect(isBodyValid(dummySchema, null)).toBe(false);
// });

// test("isBodyValid returns false for non-object input", () => {
//   expect(isBodyValid(dummySchema, "hello")).toBe(false);
// });

import { describe, it, expect } from "vitest";
import { isValidEmail, validateEmail } from "../emailValidation";

describe("isValidEmail", () => {
  describe("valid emails", () => {
    it("should validate simple email addresses", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user@domain.org")).toBe(true);
      expect(isValidEmail("john.doe@company.net")).toBe(true);
    });

    it("should validate emails with special characters in local part", () => {
      expect(isValidEmail("user+tag@example.com")).toBe(true);
      expect(isValidEmail("user.name@example.com")).toBe(true);
      expect(isValidEmail("user_name@example.com")).toBe(true);
      expect(isValidEmail("user-name@example.com")).toBe(true);
      expect(isValidEmail("user123@example.com")).toBe(true);
    });

    it("should validate emails with subdomains", () => {
      expect(isValidEmail("user@sub.domain.com")).toBe(true);
      expect(isValidEmail("user@sub.sub.domain.com")).toBe(true);
    });

    it("should validate emails with different TLDs", () => {
      expect(isValidEmail("user@example.co.uk")).toBe(true);
      expect(isValidEmail("user@example.io")).toBe(true);
      expect(isValidEmail("user@example.tech")).toBe(true);
    });

    it("should validate emails with numbers in domain", () => {
      expect(isValidEmail("user@example123.com")).toBe(true);
      expect(isValidEmail("user@123example.com")).toBe(true);
    });

    it("should validate emails with single character local part", () => {
      expect(isValidEmail("a@example.com")).toBe(true);
    });

    it("should validate emails with long but valid local part", () => {
      const longLocalPart = "a".repeat(64);
      expect(isValidEmail(`${longLocalPart}@example.com`)).toBe(true);
    });
  });

  describe("invalid emails", () => {
    it("should reject empty or null values", () => {
      expect(isValidEmail("")).toBe(false);
      expect(isValidEmail("   ")).toBe(false);
      expect(isValidEmail(null as any)).toBe(false);
      expect(isValidEmail(undefined as any)).toBe(false);
    });

    it("should reject emails without @ symbol", () => {
      expect(isValidEmail("testexample.com")).toBe(false);
      expect(isValidEmail("test@")).toBe(false);
      expect(isValidEmail("@example.com")).toBe(false);
    });

    it("should reject emails with invalid characters", () => {
      expect(isValidEmail("test space@example.com")).toBe(false);
      expect(isValidEmail("test<tag>@example.com")).toBe(false);
      expect(isValidEmail('test"quote@example.com')).toBe(false);
    });

    it("should reject emails with consecutive dots", () => {
      expect(isValidEmail("test..user@example.com")).toBe(false);
      expect(isValidEmail("test@example..com")).toBe(false);
      expect(isValidEmail("test@.example.com")).toBe(false);
      expect(isValidEmail("test@example.com.")).toBe(false);
    });

    it("should reject emails without TLD", () => {
      expect(isValidEmail("test@example")).toBe(false);
      expect(isValidEmail("test@example.")).toBe(false);
    });

    it("should reject emails with too long local part", () => {
      const tooLongLocalPart = "a".repeat(65);
      expect(isValidEmail(`${tooLongLocalPart}@example.com`)).toBe(false);
    });

    it("should reject emails with too long domain", () => {
      const tooLongDomain = "a".repeat(254);
      expect(isValidEmail(`test@${tooLongDomain}.com`)).toBe(false);
    });
  });
});

describe("validateEmail", () => {
  describe("valid emails", () => {
    it("should return valid result for correct emails", () => {
      expect(validateEmail("test@example.com")).toEqual({ isValid: true });
      expect(validateEmail("user.name@domain.org")).toEqual({ isValid: true });
    });

    it("should handle whitespace correctly", () => {
      expect(validateEmail("  test@example.com  ")).toEqual({ isValid: true });
    });
  });

  describe("invalid emails", () => {
    it("should return error for empty or null values", () => {
      expect(validateEmail("")).toEqual({
        isValid: false,
        error: "Email is required",
      });
      expect(validateEmail("   ")).toEqual({
        isValid: false,
        error: "Email cannot be empty",
      });
      expect(validateEmail(null as any)).toEqual({
        isValid: false,
        error: "Email is required",
      });
      expect(validateEmail(undefined as any)).toEqual({
        isValid: false,
        error: "Email is required",
      });
    });

    it("should return error for invalid email format", () => {
      expect(validateEmail("invalid-email")).toEqual({
        isValid: false,
        error: "Please enter a valid email address",
      });
      expect(validateEmail("test@")).toEqual({
        isValid: false,
        error: "Please enter a valid email address",
      });
      expect(validateEmail("@example.com")).toEqual({
        isValid: false,
        error: "Please enter a valid email address",
      });
    });
  });
});

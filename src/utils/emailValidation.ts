/**
 * Validates an email address format
 * @param email - The email address to validate
 * @returns true if the email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") {
    return false;
  }

  // Trim whitespace
  const trimmedEmail = email.trim();

  if (trimmedEmail.length === 0) {
    return false;
  }

  // Basic email regex pattern
  // This pattern checks for:
  // - Local part (before @) with allowed characters
  // - @ symbol
  // - Domain part with at least one dot
  // - TLD (top-level domain) with 2-6 characters
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(trimmedEmail)) {
    return false;
  }

  // Additional checks for common issues
  const [localPart, domain] = trimmedEmail.split("@");

  // Check local part length (1-64 characters)
  if (!localPart || localPart.length > 64) {
    return false;
  }

  // Check domain length (1-253 characters)
  if (!domain || domain.length > 253) {
    return false;
  }

  // Check for consecutive dots in local part
  if (localPart.includes("..")) {
    return false;
  }

  // Check for consecutive dots in domain
  if (domain.includes("..")) {
    return false;
  }

  // Check that domain has at least one dot (for TLD)
  if (!domain.includes(".")) {
    return false;
  }

  // Check that domain doesn't start or end with dot
  if (domain.startsWith(".") || domain.endsWith(".")) {
    return false;
  }

  return true;
}

/**
 * Validates an email address and returns detailed validation result
 * @param email - The email address to validate
 * @returns Object with validation result and error message if invalid
 */
export function validateEmail(email: string): {
  isValid: boolean;
  error?: string;
} {
  if (!email || typeof email !== "string") {
    return { isValid: false, error: "Email is required" };
  }

  const trimmedEmail = email.trim();

  if (trimmedEmail.length === 0) {
    return { isValid: false, error: "Email cannot be empty" };
  }

  if (!isValidEmail(trimmedEmail)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  return { isValid: true };
}

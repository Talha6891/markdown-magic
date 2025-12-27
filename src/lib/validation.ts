/**
 * Validation utility functions
 */

/**
 * Validates if content is not empty
 * @param content - The content to validate
 * @param errorMessage - Custom error message (optional)
 * @returns True if content is valid, false otherwise
 */
export function validateNotEmpty(content: string, errorMessage: string = "Content cannot be empty"): boolean {
  return content.trim().length > 0;
}


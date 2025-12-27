/**
 * Clipboard utility functions
 */
import { toast } from "sonner";

/**
 * Copies text to clipboard with toast notification
 * @param text - The text to copy
 * @param successMessage - Custom success message (optional)
 * @param errorMessage - Custom error message for empty content (optional)
 * @returns Promise that resolves when copy is complete
 */
export async function copyToClipboard(
  text: string,
  successMessage: string = "Copied to clipboard!",
  errorMessage: string = "Nothing to copy!"
): Promise<void> {
  if (!text.trim()) {
    toast.error(errorMessage);
    return;
  }
  
  try {
    await navigator.clipboard.writeText(text);
    toast.success(successMessage);
  } catch (error) {
    toast.error("Failed to copy to clipboard");
  }
}


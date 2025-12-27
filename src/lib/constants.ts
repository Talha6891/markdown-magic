/**
 * Shared constants used across the application
 */

export const SAMPLE_MARKDOWN = `# Welcome to Markdown Magic ✨

This is a **powerful** markdown editor with _live preview_.

## Features

- Real-time preview
- Syntax highlighting
- Smart text conversion
- Beautiful neon theme

### Code Example

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> "Markdown is the best way to write documentation."

Check out [Markdown Guide](https://markdownguide.org) for more tips!

---

**Try editing this text** to see the magic happen! 🚀`;

export const RESIZABLE_HANDLE_CLASSES = "bg-border/80 hover:bg-primary/40 active:bg-primary/60 transition-all duration-200 w-1.5 hover:w-2 group cursor-col-resize relative hover:shadow-lg hover:shadow-primary/10";

export const TOAST_MESSAGES = {
  COPY_SUCCESS: "Copied to clipboard!",
  COPY_ERROR: "Nothing to copy!",
  DOWNLOAD_ERROR: "Nothing to download!",
  DOWNLOAD_MARKDOWN_SUCCESS: "Downloaded as Markdown!",
  DOWNLOAD_PDF_SUCCESS: "PDF download dialog opened!",
  DOWNLOAD_HTML_SUCCESS: "Downloaded as HTML (use browser print to save as PDF)!",
  MARKDOWN_COPIED: "Markdown copied!",
  PREVIEW_TEXT_COPIED: "Preview text copied!",
  TEXT_COPIED: "Text copied!",
} as const;


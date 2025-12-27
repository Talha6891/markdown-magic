/**
 * Shared markdown parsing utilities
 * Provides functions to convert markdown to HTML for different use cases
 */

export type MarkdownToHtmlOptions = {
  /** Whether to include Tailwind classes for preview styling */
  styled?: boolean;
  /** Whether to escape HTML (for PDF generation) */
  escapeHtml?: boolean;
};

/**
 * Converts markdown to HTML
 * @param markdown - The markdown content to convert
 * @param options - Conversion options
 * @returns HTML string
 */
export function markdownToHtml(markdown: string, options: MarkdownToHtmlOptions = {}): string {
  const { styled = false, escapeHtml = true } = options;
  let html = markdown;
  const codeBlockPlaceholders: string[] = [];
  const inlineCodePlaceholders: string[] = [];

  // Process code blocks first (before escaping) and store as placeholders
  html = html
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      const trimmedCode = code.trimEnd();
      const placeholder = `__CODE_BLOCK_${codeBlockPlaceholders.length}__`;
      if (styled) {
        codeBlockPlaceholders.push(`<pre class="bg-muted/50 px-3 py-2 rounded-lg my-2 overflow-x-auto border border-border/30"><code class="text-neon-lime text-xs sm:text-sm block">${trimmedCode}</code></pre>`);
      } else {
        codeBlockPlaceholders.push(`<pre><code>${trimmedCode}</code></pre>`);
      }
      return placeholder;
    })
    .replace(/```([\s\S]*?)```/g, (match, code) => {
      const trimmedCode = code.trimEnd();
      const placeholder = `__CODE_BLOCK_${codeBlockPlaceholders.length}__`;
      if (styled) {
        codeBlockPlaceholders.push(`<pre class="bg-muted/50 px-3 py-2 rounded-lg my-2 overflow-x-auto border border-border/30"><code class="text-neon-lime text-xs sm:text-sm block">${trimmedCode}</code></pre>`);
      } else {
        codeBlockPlaceholders.push(`<pre><code>${trimmedCode}</code></pre>`);
      }
      return placeholder;
    });

  // Process inline code and store as placeholders
  html = html.replace(/`([^`]+)`/g, (match, code) => {
    const placeholder = `__INLINE_CODE_${inlineCodePlaceholders.length}__`;
    if (styled) {
      inlineCodePlaceholders.push(`<code class="bg-muted px-1.5 sm:px-2 py-0.5 rounded text-neon-cyan text-xs sm:text-sm">${code}</code>`);
    } else {
      inlineCodePlaceholders.push(`<code>${code}</code>`);
    }
    return placeholder;
  });

  // Escape HTML if needed
  if (escapeHtml) {
    html = html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // Restore code blocks (they're already properly formatted, no unescaping needed)
  codeBlockPlaceholders.forEach((placeholder, index) => {
    html = html.replace(`__CODE_BLOCK_${index}__`, placeholder);
  });

  // Restore inline code (they're already properly formatted, no unescaping needed)
  inlineCodePlaceholders.forEach((placeholder, index) => {
    html = html.replace(`__INLINE_CODE_${index}__`, placeholder);
  });

  // Headers
  if (styled) {
    html = html
      .replace(/^### (.+)$/gm, '<h3 class="text-lg sm:text-xl font-bold text-foreground mt-3 sm:mt-4 mb-1 sm:mb-2">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl sm:text-2xl font-bold text-gradient mt-4 sm:mt-5 mb-2 sm:mb-3">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-2xl sm:text-3xl font-bold text-gradient mt-4 sm:mt-6 mb-2 sm:mb-4">$1</h1>');
  } else {
    html = html
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>');
  }

  // Bold and Italic (order matters - triple first)
  if (styled) {
    html = html
      .replace(/\*\*\*(.+?)\*\*\*/g, '<strong class="font-bold"><em class="italic text-secondary">$1</em></strong>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>')
      .replace(/_(.+?)_/g, '<em class="italic text-secondary">$1</em>')
      .replace(/\*(.+?)\*/g, '<em class="italic text-secondary">$1</em>');
  } else {
    html = html
      .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/_(.+?)_/g, '<em>$1</em>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');
  }

  // Strikethrough
  if (styled) {
    html = html.replace(/~~(.+?)~~/g, '<del class="line-through text-muted-foreground">$1</del>');
  } else {
    html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');
  }

  // Links containing images (badges) - must be processed first
  if (styled) {
    html = html.replace(/\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)/g, '<a href="$3" target="_blank" class="inline-block mr-2 mb-2"><img src="$2" alt="$1" class="h-5 inline-block" /></a>');
  } else {
    html = html.replace(/\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)/g, '<a href="$3"><img src="$2" alt="$1" /></a>');
  }

  // Images (standalone images)
  if (styled) {
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-2 sm:my-3 border border-border/30" />');
  } else {
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
  }

  // Links (regular links, processed after images)
  if (styled) {
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-primary hover:text-neon-magenta underline underline-offset-2 transition-colors">$1</a>');
  } else {
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  }

  // Blockquotes
  if (styled) {
    html = html.replace(/^&gt; (.+)$/gm, '<blockquote class="border-l-4 border-neon-magenta pl-2 sm:pl-4 py-1 my-2 sm:my-3 text-muted-foreground italic bg-muted/20 rounded-r-lg text-sm sm:text-base">$1</blockquote>');
  } else {
    html = html.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');
  }

  // Horizontal rule
  if (styled) {
    html = html.replace(/^---$/gm, '<hr class="border-border my-4 sm:my-6 border-t-2" />');
  } else {
    html = html.replace(/^---$/gm, '<hr />');
  }

  // Lists
  if (styled) {
    // Unordered lists
    html = html.replace(/^- (.+)$/gm, '<li class="ml-3 sm:ml-4 list-disc text-foreground text-sm sm:text-base">$1</li>');
    // Ordered lists
    html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-3 sm:ml-4 list-decimal text-foreground text-sm sm:text-base">$1</li>');
    // Wrap consecutive list items
    html = html.replace(/(<li class="ml-3 sm:ml-4 list-disc[^>]*>[\s\S]*?<\/li>\n?)+/g, '<ul class="my-2 sm:my-3 space-y-1">$&</ul>');
    html = html.replace(/(<li class="ml-3 sm:ml-4 list-decimal[^>]*>[\s\S]*?<\/li>\n?)+/g, '<ol class="my-2 sm:my-3 space-y-1">$&</ol>');
  } else {
    // Process unordered and ordered separately for plain HTML
    html = html.replace(/(^- .+$\n?)+/gm, (match) => {
      const items = match.replace(/^- (.+)$/gm, '<li>$1</li>');
      return `<ul>${items}</ul>`;
    });
    html = html.replace(/(^\d+\. .+$\n?)+/gm, (match) => {
      const items = match.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
      return `<ol>${items}</ol>`;
    });
  }

  // Paragraphs (last, to catch everything else)
  if (styled) {
    html = html.replace(/^(?!<[a-z]|$)(.+)$/gm, '<p class="text-foreground leading-relaxed my-1.5 sm:my-2 text-sm sm:text-base">$1</p>');
  } else {
    html = html.replace(/^(?!<[a-z]|$)(.+)$/gm, '<p>$1</p>');
  }

  return html;
}

/**
 * Strips markdown syntax to get plain text
 * @param markdown - The markdown content to strip
 * @returns Plain text string
 */
export function stripMarkdown(markdown: string): string {
  return markdown
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, (match) => match.replace(/```\w*\n?/g, '').trim())
    // Remove inline code
    .replace(/`([^`]+)`/g, '$1')
    // Remove headers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove strikethrough
    .replace(/~~([^~]+)~~/g, '$1')
    // Remove links but keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove images
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    // Remove blockquotes
    .replace(/^>\s+/gm, '')
    // Remove horizontal rules
    .replace(/^---+$/gm, '')
    // Remove list markers
    .replace(/^[\s]*[-*+]\s+/gm, '')
    .replace(/^[\s]*\d+\.\s+/gm, '')
    // Clean up extra whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}


import { useMemo } from "react";
import { markdownToHtml } from "@/lib/markdown";

interface MarkdownPreviewProps {
  content: string;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const renderedContent = useMemo(() => {
    if (!content.trim()) {
      return '<p class="text-muted-foreground italic">Preview will appear here...</p>';
    }

    return markdownToHtml(content, { styled: true, escapeHtml: true });
  }, [content]);

  return (
      <div className="h-full w-full overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 scrollbar-thin">
        <div
        className="prose prose-invert max-w-none animate-fade-in prose-sm sm:prose-base md:prose-lg"
        dangerouslySetInnerHTML={{ __html: renderedContent }}
      />
    </div>
  );
}
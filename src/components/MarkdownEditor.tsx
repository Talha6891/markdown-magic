import { useState, useCallback } from "react";
import { Bold, Italic, Heading1, Heading2, Heading3, List, ListOrdered, Link, Code, Quote, Strikethrough, Image } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const toolbarItems = [
  { icon: Bold, action: "bold", label: "Bold", syntax: "**", wrap: true },
  { icon: Italic, action: "italic", label: "Italic", syntax: "_", wrap: true },
  { icon: Strikethrough, action: "strike", label: "Strikethrough", syntax: "~~", wrap: true },
  { icon: Heading1, action: "h1", label: "Heading 1", syntax: "# ", wrap: false },
  { icon: Heading2, action: "h2", label: "Heading 2", syntax: "## ", wrap: false },
  { icon: Heading3, action: "h3", label: "Heading 3", syntax: "### ", wrap: false },
  { icon: List, action: "ul", label: "Bullet List", syntax: "- ", wrap: false },
  { icon: ListOrdered, action: "ol", label: "Numbered List", syntax: "1. ", wrap: false },
  { icon: Quote, action: "quote", label: "Blockquote", syntax: "> ", wrap: false },
  { icon: Code, action: "code", label: "Inline Code", syntax: "`", wrap: true },
  { icon: Link, action: "link", label: "Link", syntax: "[text](url)", wrap: false, special: true },
  { icon: Image, action: "image", label: "Image", syntax: "![alt](url)", wrap: false, special: true },
];

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [isFocused, setIsFocused] = useState(false);

  const insertSyntax = useCallback((syntax: string, wrap: boolean, special?: boolean) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    let newText = "";
    let cursorOffset = 0;

    if (special) {
      if (syntax.includes("[text]")) {
        newText = value.substring(0, start) + `[${selectedText || "text"}](url)` + value.substring(end);
        cursorOffset = selectedText ? end + 7 : start + 7;
      } else if (syntax.includes("![alt]")) {
        newText = value.substring(0, start) + `![${selectedText || "alt"}](url)` + value.substring(end);
        cursorOffset = selectedText ? end + 8 : start + 8;
      }
    } else if (wrap) {
      newText = value.substring(0, start) + syntax + (selectedText || "text") + syntax + value.substring(end);
      cursorOffset = selectedText ? end + syntax.length * 2 : start + syntax.length + 4;
    } else {
      const lineStart = value.lastIndexOf('\n', start - 1) + 1;
      newText = value.substring(0, lineStart) + syntax + value.substring(lineStart);
      cursorOffset = start + syntax.length;
    }

    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorOffset, cursorOffset);
    }, 0);
  }, [value, onChange]);

  return (
    <div className={`flex flex-col h-full transition-all duration-300 ${isFocused ? 'neon-glow' : ''}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-0.5 sm:gap-1 p-1.5 sm:p-2 md:p-3 bg-muted/30 rounded-t-lg sm:rounded-t-xl border-b border-border/50">
        {toolbarItems.map((item) => (
          <Tooltip key={item.action}>
            <TooltipTrigger asChild>
              <button
                onClick={() => insertSyntax(item.syntax, item.wrap, item.special)}
                className="toolbar-btn group p-1.5 sm:p-2"
              >
                <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs sm:text-sm">{item.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1 relative overflow-hidden">
                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Write your markdown here..."
                        className="w-full h-full p-2 sm:p-3 md:p-4 bg-transparent resize-none outline-none font-mono text-xs sm:text-sm text-foreground placeholder:text-muted-foreground scrollbar-thin leading-relaxed overflow-y-auto"
                        spellCheck={false}
                    />
        <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 bg-gradient-to-t from-card to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
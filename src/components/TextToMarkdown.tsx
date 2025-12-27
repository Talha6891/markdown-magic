import { useState, useCallback } from "react";
import { Wand2, Hash, Bold, Italic, List, Quote, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

interface TextToMarkdownProps {
  value: string;
  onChange: (value: string) => void;
}

export function TextToMarkdown({ value, onChange }: TextToMarkdownProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const quickFormat = useCallback((type: string) => {
    const lines = value.split('\n');
    let formatted = '';

    switch (type) {
      case 'headers':
        formatted = lines.map((line, i) => {
          if (line.trim() && !line.startsWith('#')) {
            if (i === 0) return `# ${line}`;
            if (line.length < 40) return `## ${line}`;
          }
          return line;
        }).join('\n');
        break;
      case 'bold':
        formatted = lines.map(line => {
          if (line.trim() && !line.startsWith('#')) {
            return line.replace(/(\b\w+\b)/g, (match, word, offset) => {
              if (offset === 0) return `**${word}**`;
              return word;
            });
          }
          return line;
        }).join('\n');
        break;
      case 'list':
        formatted = lines.map(line => {
          if (line.trim() && !line.startsWith('-') && !line.startsWith('#')) {
            return `- ${line}`;
          }
          return line;
        }).join('\n');
        break;
      case 'quote':
        formatted = lines.map(line => {
          if (line.trim() && !line.startsWith('>')) {
            return `> ${line}`;
          }
          return line;
        }).join('\n');
        break;
      default:
        formatted = value;
    }

    setIsAnimating(true);
    onChange(formatted);
    toast.success(`Applied ${type} formatting!`);
    setTimeout(() => setIsAnimating(false), 500);
  }, [value, onChange]);

  const smartConvert = useCallback(() => {
    if (!value.trim()) {
      toast.error('Please enter some text first!');
      return;
    }

    setIsAnimating(true);
    const lines = value.split('\n').filter(l => l.trim());
    
    const markdown = lines.map((line, index) => {
      const trimmed = line.trim();
      
      // Detect potential headers
      if (index === 0 || (trimmed.length < 50 && trimmed.endsWith(':') === false)) {
        if (index === 0) return `# ${trimmed}`;
        if (trimmed.length < 30 && index < 3) return `## ${trimmed}`;
      }
      
      // Detect lists
      if (trimmed.match(/^[\d]+[.)-]|^[-*•]/)) {
        return `- ${trimmed.replace(/^[\d]+[.)-]|^[-*•]\s*/, '')}`;
      }
      
      // Detect URLs
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      if (trimmed.match(urlRegex)) {
        return trimmed.replace(urlRegex, '[$1]($1)');
      }
      
      // Regular paragraph
      return trimmed;
    }).join('\n\n');

    onChange(markdown);
    toast.success('Smart conversion complete!');
    setTimeout(() => setIsAnimating(false), 500);
  }, [value, onChange]);

  return (
    <div className="flex flex-col h-full">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-1 sm:gap-2 p-1.5 sm:p-2 md:p-3 bg-muted/30 rounded-t-lg sm:rounded-t-xl border-b border-border/50">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => quickFormat('headers')}
              className="toolbar-btn text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 h-auto"
            >
              <Hash className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />
              <span className="hidden sm:inline">Headers</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Auto-detect headers</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => quickFormat('bold')}
              className="toolbar-btn text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 h-auto"
            >
              <Bold className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />
              <span className="hidden sm:inline">Bold</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Bold first words</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => quickFormat('list')}
              className="toolbar-btn text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 h-auto"
            >
              <List className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />
              <span className="hidden sm:inline">List</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Convert to bullet list</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => quickFormat('quote')}
              className="toolbar-btn text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 h-auto"
            >
              <Quote className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />
              <span className="hidden sm:inline">Quote</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Convert to blockquote</TooltipContent>
        </Tooltip>

        <div className="flex-1 hidden sm:block" />

        <Button
          onClick={smartConvert}
          className="bg-gradient-to-r from-neon-cyan to-neon-magenta text-primary-foreground hover:opacity-90 transition-opacity font-semibold text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 h-auto w-full sm:w-auto mt-1 sm:mt-0"
        >
          <Wand2 className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 ${isAnimating ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Smart Convert</span>
          <span className="sm:hidden">Convert</span>
        </Button>
      </div>

      {/* Editor */}
      <div className="flex-1 relative overflow-hidden">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste your plain text here and use the tools above to convert it to markdown..."
          className={`w-full h-full p-2 sm:p-3 md:p-4 bg-transparent resize-none outline-none font-mono text-xs sm:text-sm text-foreground placeholder:text-muted-foreground scrollbar-thin leading-relaxed transition-all duration-300 overflow-y-auto ${isAnimating ? 'scale-[0.99] opacity-80' : ''}`}
          spellCheck={false}
        />
        <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 bg-gradient-to-t from-card to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
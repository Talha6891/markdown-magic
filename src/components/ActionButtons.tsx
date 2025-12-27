import { Download, Trash2, RefreshCw, FileText, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { markdownToHtml } from "@/lib/markdown";
import { copyToClipboard } from "@/lib/clipboard";
import { validateNotEmpty } from "@/lib/validation";
import { TOAST_MESSAGES } from "@/lib/constants";

interface ActionButtonsProps {
  content: string;
  onClear: () => void;
  onSwap?: () => void;
}

export function ActionButtons({ content, onClear, onSwap }: ActionButtonsProps) {
  const handleCopy = async () => {
    await copyToClipboard(content, TOAST_MESSAGES.COPY_SUCCESS, TOAST_MESSAGES.COPY_ERROR);
  };

  const handleDownloadMarkdown = () => {
    if (!validateNotEmpty(content, TOAST_MESSAGES.DOWNLOAD_ERROR)) {
      toast.error(TOAST_MESSAGES.DOWNLOAD_ERROR);
      return;
    }

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `document.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(TOAST_MESSAGES.DOWNLOAD_MARKDOWN_SUCCESS);
  };

  const handleDownloadPDF = () => {
    if (!validateNotEmpty(content, TOAST_MESSAGES.DOWNLOAD_ERROR)) {
      toast.error(TOAST_MESSAGES.DOWNLOAD_ERROR);
      return;
    }

    const htmlContent = markdownToHtml(content, { styled: false, escapeHtml: true });
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              line-height: 1.6;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              color: #333;
            }
            h1 { font-size: 2em; margin-top: 0.67em; margin-bottom: 0.67em; }
            h2 { font-size: 1.5em; margin-top: 0.83em; margin-bottom: 0.83em; }
            h3 { font-size: 1.17em; margin-top: 1em; margin-bottom: 1em; }
            pre {
              background: #f4f4f4;
              padding: 10px;
              border-radius: 5px;
              overflow-x: auto;
            }
            code {
              background: #f4f4f4;
              padding: 2px 6px;
              border-radius: 3px;
              font-family: 'Courier New', monospace;
            }
            blockquote {
              border-left: 4px solid #ddd;
              padding-left: 16px;
              margin-left: 0;
              color: #666;
            }
            ul, ol {
              padding-left: 20px;
            }
            img {
              max-width: 100%;
              height: auto;
            }
            @media print {
              body { margin: 0; padding: 15px; }
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    // Create a blob and open in new window for printing
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, '_blank');
    
    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          toast.success(TOAST_MESSAGES.DOWNLOAD_PDF_SUCCESS);
        }, 250);
      };
    } else {
      // Fallback: download as HTML
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.html';
      a.click();
      toast.success(TOAST_MESSAGES.DOWNLOAD_HTML_SUCCESS);
    }
    
    // Clean up after a delay
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 sm:h-9 sm:w-9 hover:bg-neon-magenta/10 hover:text-neon-magenta transition-colors"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Download file</TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleDownloadPDF} className="cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            <span>Download as PDF</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDownloadMarkdown} className="cursor-pointer">
            <FileDown className="mr-2 h-4 w-4" />
            <span>Download as Markdown</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {onSwap && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onSwap}
              className="h-7 w-7 sm:h-9 sm:w-9 hover:bg-neon-lime/10 hover:text-neon-lime transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Swap content</TooltipContent>
        </Tooltip>
      )}

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClear}
            className="h-7 w-7 sm:h-9 sm:w-9 hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Clear content</TooltipContent>
      </Tooltip>
    </div>
  );
}
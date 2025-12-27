import { ReactNode } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { copyToClipboard } from "@/lib/clipboard";

interface PanelHeaderProps {
  icon: ReactNode;
  label: string;
  shortLabel?: string;
  content: string;
  onCopy?: () => void;
  copySuccessMessage?: string;
  copyErrorMessage?: string;
  buttonClassName?: string;
}

export function PanelHeader({
  icon,
  label,
  shortLabel,
  content,
  onCopy,
  copySuccessMessage = "Copied!",
  copyErrorMessage = "Nothing to copy!",
  buttonClassName = "h-5 w-5 sm:h-6 sm:w-6 hover:bg-primary/10 hover:text-primary",
}: PanelHeaderProps) {
  const handleCopy = async () => {
    if (onCopy) {
      onCopy();
    } else {
      await copyToClipboard(content, copySuccessMessage, copyErrorMessage);
    }
  };

  return (
    <div className="absolute top-2 sm:top-3 left-2 sm:left-4 right-2 sm:right-4 flex items-center justify-between text-xs text-muted-foreground z-10">
      <div className="flex items-center gap-1 sm:gap-2">
        {icon}
        <span className="hidden sm:inline">{label}</span>
        {shortLabel && <span className="sm:hidden">{shortLabel}</span>}
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={buttonClassName}
            onClick={handleCopy}
          >
            <Copy className="w-3 h-3" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Copy {label}</TooltipContent>
      </Tooltip>
    </div>
  );
}


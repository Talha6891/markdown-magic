import { useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarkdownEditor } from "./MarkdownEditor";
import { MarkdownPreview } from "./MarkdownPreview";
import { TextToMarkdown } from "./TextToMarkdown";
import { StatsBar } from "./StatsBar";
import { ActionButtons } from "./ActionButtons";
import { PanelHeader } from "./PanelHeader";
import { FileCode2, FileText, Eye, Sparkles, Heart, Github } from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { stripMarkdown } from "@/lib/markdown";
import { copyToClipboard } from "@/lib/clipboard";
import { SAMPLE_MARKDOWN, RESIZABLE_HANDLE_CLASSES, TOAST_MESSAGES } from "@/lib/constants";

export function MarkdownConverter() {
  const [markdownContent, setMarkdownContent] = useState(SAMPLE_MARKDOWN);
  const [textContent, setTextContent] = useState("");
  const [activeTab, setActiveTab] = useState("markdown");

  const clearContent = useCallback(() => {
    if (activeTab === "markdown") {
      setMarkdownContent("");
    } else {
      setTextContent("");
    }
  }, [activeTab]);

  const swapContent = useCallback(() => {
    const temp = markdownContent;
    setMarkdownContent(textContent);
    setTextContent(temp);
  }, [markdownContent, textContent]);

  const currentContent = activeTab === "markdown" ? markdownContent : textContent;

  return (
    <div className="w-full h-screen flex flex-col md:flex-row animate-fade-in overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-56 lg:w-64 xl:w-72 flex-shrink-0 border-b md:border-b-0 md:border-r border-border/50 bg-card/50 backdrop-blur-sm p-3 sm:p-4 md:p-5 flex flex-col gap-3 sm:gap-4 md:gap-5 animate-slide-up overflow-y-auto">
        {/* Header */}
        <div className="animate-slide-up">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 flex items-center gap-1 flex-wrap">
            <span className="text-gradient">Markdown</span>
            <span className="text-foreground"> Magic</span>
            <Sparkles className="inline-block w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-neon-lime animate-pulse flex-shrink-0" />
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Transform text to markdown and vice versa with style
          </p>
        </div>

        {/* Stats Bar */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <StatsBar content={currentContent} />
        </div>

        {/* Footer in sidebar */}
        <div className="mt-auto text-muted-foreground text-xs sm:text-sm animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <p className="flex items-center gap-1.5 mb-2">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for 🌍
          </p>
          <a
            href="https://github.com/Talha6891/markdown-magic"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <Github className="w-4 h-4" />
            <span className="text-xs">View on GitHub</span>
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 glass-panel neon-border overflow-hidden animate-scale-in m-2 sm:m-4 md:m-6" style={{ animationDelay: '0.3s' }}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 sm:gap-4 p-2 sm:p-3 md:p-4 border-b border-border/50 bg-muted/10 flex-shrink-0">
            <TabsList className="bg-muted/50 w-auto">
              <TabsTrigger value="markdown" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4">
                <FileCode2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Markdown Editor</span>
                <span className="sm:hidden">Editor</span>
              </TabsTrigger>
              <TabsTrigger value="text" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground gap-1.5 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4">
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Text to Markdown</span>
                <span className="sm:hidden">Text</span>
              </TabsTrigger>
            </TabsList>

            <ActionButtons 
              content={currentContent} 
              onClear={clearContent}
              onSwap={swapContent}
            />
          </div>

            <TabsContent value="markdown" className="m-0 flex-1 overflow-hidden">
              <ResizablePanelGroup direction="horizontal" className="h-full">
              {/* Editor Panel */}
              <ResizablePanel defaultSize={50} minSize={20} className="relative min-w-0">
                <PanelHeader
                  icon={<FileCode2 className="w-3 h-3" />}
                  label="EDITOR"
                  shortLabel="ED"
                  content={markdownContent}
                  copySuccessMessage={TOAST_MESSAGES.MARKDOWN_COPIED}
                  onCopy={async () => {
                    await copyToClipboard(markdownContent, TOAST_MESSAGES.MARKDOWN_COPIED, TOAST_MESSAGES.COPY_ERROR);
                  }}
                />
                <div className="pt-6 sm:pt-8 h-full px-2 sm:px-3 md:px-6 pb-4 sm:pb-6">
                  <MarkdownEditor value={markdownContent} onChange={setMarkdownContent} />
                </div>
              </ResizablePanel>

              <ResizableHandle 
                withHandle 
                className={RESIZABLE_HANDLE_CLASSES} 
              />

              {/* Preview Panel */}
              <ResizablePanel defaultSize={50} minSize={20} className="relative bg-background/30 min-w-0">
                <PanelHeader
                  icon={<Eye className="w-3 h-3" />}
                  label="PREVIEW"
                  shortLabel="PV"
                  content={stripMarkdown(markdownContent)}
                  copySuccessMessage={TOAST_MESSAGES.PREVIEW_TEXT_COPIED}
                  buttonClassName="h-5 w-5 sm:h-6 sm:w-6 hover:bg-neon-magenta/10 hover:text-neon-magenta"
                  onCopy={async () => {
                    const plainText = stripMarkdown(markdownContent);
                    await copyToClipboard(plainText, TOAST_MESSAGES.PREVIEW_TEXT_COPIED, TOAST_MESSAGES.COPY_ERROR);
                  }}
                />
                <div className="pt-6 sm:pt-8 h-full px-2 sm:px-3 md:px-6 pb-4 sm:pb-6 overflow-y-auto">
                  <MarkdownPreview content={markdownContent} />
                </div>
              </ResizablePanel>
              </ResizablePanelGroup>
            </TabsContent>

            <TabsContent value="text" className="m-0 flex-1 overflow-hidden">
              <ResizablePanelGroup direction="horizontal" className="h-full">
                {/* Text Input Panel */}
                <ResizablePanel defaultSize={50} minSize={20} className="relative min-w-0">
                  <PanelHeader
                    icon={<FileText className="w-3 h-3" />}
                    label="PLAIN TEXT"
                    shortLabel="TXT"
                    content={textContent}
                    copySuccessMessage={TOAST_MESSAGES.TEXT_COPIED}
                    buttonClassName="h-5 w-5 sm:h-6 sm:w-6 hover:bg-secondary/10 hover:text-secondary"
                    onCopy={async () => {
                      await copyToClipboard(textContent, TOAST_MESSAGES.TEXT_COPIED, TOAST_MESSAGES.COPY_ERROR);
                    }}
                  />
                  <div className="pt-6 sm:pt-8 h-full px-2 sm:px-3 md:px-6 pb-4 sm:pb-6">
                    <TextToMarkdown value={textContent} onChange={setTextContent} />
                  </div>
                </ResizablePanel>

                <ResizableHandle
                    withHandle
                    className={RESIZABLE_HANDLE_CLASSES}
                />

                {/* Preview Panel */}
                <ResizablePanel defaultSize={50} minSize={20} className="relative bg-background/30 min-w-0">
                  <PanelHeader
                    icon={<Eye className="w-3 h-3" />}
                    label="MARKDOWN PREVIEW"
                    shortLabel="MD"
                    content={textContent}
                    copySuccessMessage={TOAST_MESSAGES.MARKDOWN_COPIED}
                    buttonClassName="h-5 w-5 sm:h-6 sm:w-6 hover:bg-neon-magenta/10 hover:text-neon-magenta"
                    onCopy={async () => {
                      await copyToClipboard(textContent, TOAST_MESSAGES.MARKDOWN_COPIED, TOAST_MESSAGES.COPY_ERROR);
                    }}
                  />
                  <div className="pt-6 sm:pt-8 h-full px-2 sm:px-3 md:px-6 pb-4 sm:pb-6 overflow-y-auto">
                    <MarkdownPreview content={textContent} />
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
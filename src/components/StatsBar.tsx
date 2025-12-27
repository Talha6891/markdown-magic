import { useMemo } from "react";
import { FileText, Type, Hash, Clock } from "lucide-react";

interface StatsBarProps {
  content: string;
}

export function StatsBar({ content }: StatsBarProps) {
  const stats = useMemo(() => {
    const text = content.trim();
    const characters = text.length;
    const words = text ? text.split(/\s+/).filter(w => w.length > 0).length : 0;
    const lines = text ? text.split('\n').length : 0;
    const readingTime = Math.max(1, Math.ceil(words / 200));

    return { characters, words, lines, readingTime };
  }, [content]);

  const statItems = [
    { icon: Type, label: "Characters", value: stats.characters.toLocaleString(), color: "text-neon-cyan" },
    { icon: FileText, label: "Words", value: stats.words.toLocaleString(), color: "text-neon-magenta" },
    { icon: Hash, label: "Lines", value: stats.lines.toLocaleString(), color: "text-neon-lime" },
    { icon: Clock, label: "Read time", value: `${stats.readingTime} min`, color: "text-neon-orange" },
  ];

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {statItems.map((item) => (
        <div key={item.label} className="flex items-center gap-2 sm:gap-3 group p-2 sm:p-3 bg-muted/20 rounded-lg backdrop-blur-sm border border-border/30 hover:bg-muted/30 transition-colors">
          <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${item.color} transition-transform group-hover:scale-110 flex-shrink-0`} />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs sm:text-sm text-muted-foreground">{item.label}</span>
            <span className="text-sm sm:text-base font-semibold text-foreground">{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
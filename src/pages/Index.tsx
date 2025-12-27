import { MarkdownConverter } from "@/components/MarkdownConverter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient orbs (responsive sizes & positions) */}
        <div className="absolute top-[-15%] sm:top-[-20%] left-[-6%] sm:left-[-10%] w-36 sm:w-72 md:w-[600px] h-36 sm:h-72 md:h-[600px] rounded-full bg-neon-cyan/10 blur-[120px] animate-float" />
        <div className="absolute bottom-[-15%] sm:bottom-[-20%] right-[-6%] sm:right-[-10%] w-36 sm:w-72 md:w-[600px] h-36 sm:h-72 md:h-[600px] rounded-full bg-neon-magenta/10 blur-[120px] animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-56 sm:w-80 md:w-[400px] h-56 sm:h-80 md:h-[400px] rounded-full bg-neon-lime/5 blur-[100px] animate-float" style={{ animationDelay: '0.8s' }} />

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-screen overflow-hidden">
        <MarkdownConverter />
      </div>
    </div>
  );
};

export default Index;
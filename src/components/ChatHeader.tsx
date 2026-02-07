import { BookOpen } from "lucide-react";

const ChatHeader = () => {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">English Coach</h1>
            <p className="text-xs text-muted-foreground">Seu assistente de aprendizado</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;

import { cn } from "@/lib/utils";
import { Check, AlertCircle } from "lucide-react";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  correction?: string;
  explanation?: string;
  isCorrect?: boolean;
}

const ChatMessage = ({ content, isUser, correction, explanation, isCorrect }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 shadow-message",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-card text-card-foreground rounded-bl-md border border-border"
        )}
      >
        {isUser ? (
          <p className="text-sm md:text-base leading-relaxed">{content}</p>
        ) : (
          <div className="space-y-3">
            {correction && (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-warning" />
                  )}
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {isCorrect ? "Correto!" : "Correção"}
                  </span>
                </div>
                <p className={cn(
                  "text-sm md:text-base font-medium",
                  isCorrect ? "text-success" : "text-warning"
                )}>
                  {correction}
                </p>
              </div>
            )}
            {explanation && (
              <div className="pt-2 border-t border-border/50">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {explanation}
                </p>
              </div>
            )}
            {!correction && !explanation && (
              <p className="text-sm md:text-base leading-relaxed">{content}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;

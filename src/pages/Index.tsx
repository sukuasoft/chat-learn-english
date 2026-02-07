import { useState, useRef, useEffect } from "react";
import ChatHeader from "@/components/ChatHeader";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import EmptyState from "@/components/EmptyState";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  correction?: string;
  explanation?: string;
  isCorrect?: boolean;
}

// Mock AI response - simulates correction feedback
const getMockCorrection = (userMessage: string): Omit<Message, "id" | "isUser"> => {
  const corrections: Record<string, { correction: string; explanation: string; isCorrect: boolean }> = {
    "she don't like pizza": {
      correction: "She doesn't like pizza.",
      explanation: "Use 'doesn't' (does not) com he/she/it. 'Don't' é usado com I/you/we/they.",
      isCorrect: false,
    },
    "i goed to the store": {
      correction: "I went to the store.",
      explanation: "'Go' é um verbo irregular. O passado de 'go' é 'went', não 'goed'.",
      isCorrect: false,
    },
    "he is more taller than me": {
      correction: "He is taller than me.",
      explanation: "Não use 'more' com adjetivos que já têm a forma comparativa (-er). 'Taller' já é comparativo.",
      isCorrect: false,
    },
  };

  const lowerMessage = userMessage.toLowerCase().trim();
  
  if (corrections[lowerMessage]) {
    return {
      content: "",
      ...corrections[lowerMessage],
    };
  }

  // Check if it seems correct (basic heuristic)
  const hasBasicErrors = /\b(goed|runned|don't like|he don't|she don't)\b/i.test(userMessage);
  
  if (hasBasicErrors) {
    return {
      content: "",
      correction: userMessage,
      explanation: "Detectei alguns erros gramaticais. Verifique o uso de verbos irregulares e concordância verbal.",
      isCorrect: false,
    };
  }

  return {
    content: "",
    correction: userMessage,
    explanation: "Ótimo trabalho! Esta frase está gramaticalmente correta. Continue praticando! 🎉",
    isCorrect: true,
  };
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const aiResponse = getMockCorrection(content);
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      isUser: false,
      ...aiResponse,
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader />
      
      <main className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                isUser={message.isUser}
                correction={message.correction}
                explanation={message.explanation}
                isCorrect={message.isCorrect}
              />
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-card rounded-2xl rounded-bl-md px-5 py-4 border border-border shadow-message">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 bg-primary rounded-full animate-pulse-dot" />
                      <div className="h-2.5 w-2.5 bg-primary rounded-full animate-pulse-dot animation-delay-200" />
                      <div className="h-2.5 w-2.5 bg-primary rounded-full animate-pulse-dot animation-delay-400" />
                    </div>
                    <span className="text-sm text-muted-foreground">Analisando sua frase...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
};

export default Index;

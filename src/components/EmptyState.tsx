import { MessageCircle, Sparkles, Target } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center max-w-md space-y-6 animate-fade-in">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto">
          <MessageCircle className="h-8 w-8 text-primary" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            Pratique seu inglês
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Digite qualquer frase em inglês e receba correções instantâneas com explicações detalhadas.
          </p>
        </div>

        <div className="grid gap-3 text-left">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border/50">
            <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Correções inteligentes</p>
              <p className="text-xs text-muted-foreground">Gramática, vocabulário e estrutura</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border/50">
            <Target className="h-5 w-5 text-success mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Explicações claras</p>
              <p className="text-xs text-muted-foreground">Entenda o porquê de cada correção</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground/60">
          Exemplo: "She don't like pizza"
        </p>
      </div>
    </div>
  );
};

export default EmptyState;

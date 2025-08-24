import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Mic, 
  Paperclip, 
  Code,
  Crown,
  Zap
} from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  isPremiumUser: boolean;
  placeholder?: string;
}

export const ChatInput = ({ 
  onSendMessage, 
  isLoading, 
  isPremiumUser,
  placeholder = "Ask me anything about coding..."
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="p-4">
        {/* Quick Actions */}
        <div className="flex items-center gap-2 mb-3">
          <Button size="sm" variant="outline" className="text-xs">
            <Code className="w-3 h-3 mr-1" />
            Debug Code
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <Zap className="w-3 h-3 mr-1" />
            Optimize
          </Button>
          {isPremiumUser && (
            <Badge className="bg-premium-gold/20 text-premium-gold border-premium-gold/30 text-xs">
              <Crown className="w-3 h-3 mr-1" />
              Advanced Features Unlocked
            </Badge>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="min-h-[60px] max-h-[200px] pr-24 bg-card border-border/50 resize-none"
            disabled={isLoading}
          />
          
          {/* Input Actions */}
          <div className="absolute right-2 bottom-2 flex items-center gap-1">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              disabled={isLoading}
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              disabled={isLoading}
            >
              <Mic className="w-4 h-4" />
            </Button>
            
            <Button
              type="submit"
              size="sm"
              disabled={isLoading || !message.trim()}
              className="h-8 w-8 p-0 bg-primary hover:bg-primary/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>

        {/* Footer Info */}
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>Press Enter to send, Shift+Enter for new line</span>
          {!isPremiumUser && (
            <span className="text-primary cursor-pointer hover:underline">
              Upgrade for unlimited messages
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
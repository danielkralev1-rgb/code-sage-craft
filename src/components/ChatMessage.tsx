import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, User, Crown } from "lucide-react";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
  isPremium?: boolean;
}

export const ChatMessage = ({ content, isUser, timestamp, isPremium }: ChatMessageProps) => {
  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <Avatar className="w-8 h-8 shrink-0">
        <AvatarFallback className={`${isUser ? 'bg-chat-user text-chat-user-foreground' : 'bg-chat-bot text-chat-bot-foreground'}`}>
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>
      
      <div className={`flex flex-col max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm text-muted-foreground">
            {isUser ? 'You' : 'AI Assistant'}
          </span>
          {isPremium && (
            <Badge variant="secondary" className="bg-premium-gold/20 text-premium-gold border-premium-gold/30">
              <Crown className="w-3 h-3 mr-1" />
              Pro
            </Badge>
          )}
          <span className="text-xs text-muted-foreground">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        <Card className={`p-3 ${
          isUser 
            ? 'bg-chat-user text-chat-user-foreground' 
            : 'bg-chat-bot text-chat-bot-foreground border-border/50'
        }`}>
          <div className="text-sm whitespace-pre-wrap">
            {content}
          </div>
        </Card>
      </div>
    </div>
  );
};
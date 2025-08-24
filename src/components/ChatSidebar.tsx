import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Plus, 
  MessageSquare, 
  Crown, 
  Settings, 
  History,
  Zap,
  Star
} from "lucide-react";

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  isPremium?: boolean;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onNewChat: () => void;
  chatHistory: ChatHistory[];
  onSelectChat: (chatId: string) => void;
  currentChatId?: string;
  isPremiumUser: boolean;
}

export const ChatSidebar = ({ 
  isOpen, 
  onNewChat, 
  chatHistory, 
  onSelectChat, 
  currentChatId,
  isPremiumUser 
}: ChatSidebarProps) => {
  return (
    <div className={`
      fixed left-0 top-0 h-full bg-gradient-chat border-r border-border z-40
      transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      w-80 md:relative md:translate-x-0
    `}>
      <div className="flex flex-col h-full p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-premium rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg">CodeBot</span>
          </div>
          {isPremiumUser && (
            <Badge className="bg-premium-gold/20 text-premium-gold border-premium-gold/30">
              <Crown className="w-3 h-3 mr-1" />
              Pro
            </Badge>
          )}
        </div>

        {/* New Chat Button */}
        <Button 
          onClick={onNewChat}
          className="w-full mb-4 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30"
          variant="outline"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>

        {/* Premium Upgrade Banner */}
        {!isPremiumUser && (
          <Card className="p-4 mb-4 bg-gradient-premium text-white border-0">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-4 h-4" />
              <span className="font-semibold">Upgrade to Pro</span>
            </div>
            <p className="text-sm text-white/90 mb-3">
              Unlock unlimited chats, faster responses, and advanced code features
            </p>
            <Button size="sm" variant="secondary" className="w-full">
              <Star className="w-3 h-3 mr-1" />
              Upgrade Now
            </Button>
          </Card>
        )}

        {/* Chat History */}
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <History className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Recent Chats</span>
          </div>
          
          <div className="space-y-2 overflow-y-auto max-h-96">
            {chatHistory.map((chat) => (
              <Button
                key={chat.id}
                variant="ghost"
                onClick={() => onSelectChat(chat.id)}
                className={`
                  w-full justify-start p-3 h-auto text-left
                  ${currentChatId === chat.id ? 'bg-primary/20 text-primary' : 'hover:bg-accent/50'}
                `}
              >
                <div className="flex items-start gap-2 w-full">
                  <MessageSquare className="w-4 h-4 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{chat.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {chat.timestamp.toLocaleDateString()}
                    </div>
                  </div>
                  {chat.isPremium && (
                    <Crown className="w-3 h-3 text-premium-gold shrink-0" />
                  )}
                </div>
              </Button>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        {/* Settings */}
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  );
};
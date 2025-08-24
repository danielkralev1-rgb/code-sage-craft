import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "./ChatMessage";
import { ChatSidebar } from "./ChatSidebar";
import { ChatInput } from "./ChatInput";
import { Menu, X, Crown, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  isPremium?: boolean;
}

export const ChatLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI coding assistant. I can help you with programming questions, debug code, explain concepts, and much more. What would you like to work on today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState("default");
  const [isPremiumUser] = useState(false); // This would come from auth/subscription state
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock chat history
  const chatHistory: ChatHistory[] = [
    {
      id: "1",
      title: "React useEffect hook explanation",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isPremium: true
    },
    {
      id: "2", 
      title: "Python list comprehension help",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
    {
      id: "3",
      title: "JavaScript async/await debugging",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    }
  ];

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response (replace with your own AI system)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand you're asking about coding. This is where your custom AI system would generate a response. You can integrate any AI model or service here - Hugging Face Transformers, local models, or your own trained models.",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: "1",
        content: "Hello! I'm your AI coding assistant. What would you like to work on in this new chat?",
        isUser: false,
        timestamp: new Date()
      }
    ]);
    setCurrentChatId(Date.now().toString());
    setSidebarOpen(false);
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    setSidebarOpen(false);
    // In a real app, you'd load the chat history from storage/API
  };

  return (
    <div className="flex h-screen bg-gradient-hero">
      {/* Sidebar */}
      <ChatSidebar
        isOpen={sidebarOpen}
        onNewChat={handleNewChat}
        chatHistory={chatHistory}
        onSelectChat={handleSelectChat}
        currentChatId={currentChatId}
        isPremiumUser={isPremiumUser}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-premium rounded-md flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="font-semibold">CodeBot AI</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isPremiumUser && (
              <Button size="sm" className="bg-gradient-premium text-white border-0 hover:opacity-90">
                <Crown className="w-3 h-3 mr-1" />
                Upgrade to Pro
              </Button>
            )}
            
            {isPremiumUser && (
              <Badge className="bg-premium-gold/20 text-premium-gold border-premium-gold/30">
                <Crown className="w-3 h-3 mr-1" />
                Pro User
              </Badge>
            )}
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
              isPremium={isPremiumUser}
            />
          ))}
          
          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-chat-bot rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <div className="bg-chat-bot p-3 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          isPremiumUser={isPremiumUser}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};
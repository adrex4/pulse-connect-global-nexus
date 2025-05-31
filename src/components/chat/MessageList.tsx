
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Reply, Smile } from 'lucide-react';
import { Message, User } from '@/types/connectPulse';
import EmojiPicker from '../EmojiPicker';

interface ExtendedMessage extends Message {
  type?: 'text' | 'image' | 'voice' | 'file';
  imageUrl?: string;
  fileName?: string;
  fileSize?: string;
  duration?: string;
  isEdited?: boolean;
  repliedTo?: ExtendedMessage;
}

interface MessageListProps {
  messages: ExtendedMessage[];
  user: User;
  reactions: Record<string, string[]>;
  isTyping: boolean;
  onReply: (message: ExtendedMessage) => void;
  onReaction: (messageId: string, emoji: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  user,
  reactions,
  isTyping,
  onReply,
  onReaction
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <ScrollArea className="flex-1 px-4">
      <div className="space-y-4 py-4">
        {messages.map((message, index) => {
          const showDate = index === 0 || 
            formatDate(messages[index - 1].timestamp) !== formatDate(message.timestamp);
          const messageReactions = reactions[message.id] || [];
          
          return (
            <div key={message.id}>
              {showDate && (
                <div className="text-center my-6">
                  <span className="bg-white text-gray-600 text-xs px-4 py-2 rounded-full shadow-sm border">
                    {formatDate(message.timestamp)}
                  </span>
                </div>
              )}
              
              <div className={`flex ${message.userId === user.id ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-xs lg:max-w-md group relative">
                  <div className={`px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
                    message.userId === user.id 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}>
                    {message.userId !== user.id && (
                      <p className="text-xs font-semibold mb-2 opacity-80 flex items-center gap-2">
                        <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                        {message.userName}
                      </p>
                    )}
                    
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {messageReactions.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {messageReactions.map((reaction, idx) => (
                          <span key={idx} className="text-xs bg-white/20 px-2 py-1 rounded-full">
                            {reaction}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-2">
                      <p className={`text-xs ${
                        message.userId === user.id ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                        {message.userId === user.id && (
                          <span className="ml-2">✓✓</span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute top-0 right-0 transform translate-x-full opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-lg shadow-lg border p-1 ml-2">
                    <div className="flex flex-col gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 w-7 p-0"
                        onClick={() => onReply(message)}
                      >
                        <Reply className="h-3 w-3" />
                      </Button>
                      <EmojiPicker onEmojiSelect={(emoji) => onReaction(message.id, emoji)}>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Smile className="h-3 w-3" />
                        </Button>
                      </EmojiPicker>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-600 px-4 py-3 rounded-2xl shadow-sm border">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs">Someone is typing...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default MessageList;

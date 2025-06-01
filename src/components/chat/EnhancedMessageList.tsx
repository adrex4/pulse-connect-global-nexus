
import React, { useRef, useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Reply, Smile, MoreHorizontal, Edit3, Trash2, Pin, Share, Quote, Heart, ThumbsUp, Laugh, Angry, MessageSquare, Copy, Forward, Download } from 'lucide-react';
import { Message, User } from '@/types/connectPulse';
import EmojiPicker from '../EmojiPicker';

interface ExtendedMessage extends Message {
  type?: 'text' | 'image' | 'voice' | 'file' | 'system';
  imageUrl?: string;
  fileName?: string;
  fileSize?: string;
  duration?: string;
  isEdited?: boolean;
  repliedTo?: ExtendedMessage;
  reactions?: { emoji: string; users: string[]; count: number }[];
  isPinned?: boolean;
  threadCount?: number;
}

interface EnhancedMessageListProps {
  messages: ExtendedMessage[];
  user: User;
  reactions: Record<string, string[]>;
  isTyping: boolean;
  onReply: (message: ExtendedMessage) => void;
  onReaction: (messageId: string, emoji: string) => void;
  onEdit?: (message: ExtendedMessage) => void;
  onDelete?: (messageId: string) => void;
  onPin?: (messageId: string) => void;
  onThread?: (message: ExtendedMessage) => void;
}

const EnhancedMessageList: React.FC<EnhancedMessageListProps> = ({
  messages,
  user,
  reactions,
  isTyping,
  onReply,
  onReaction,
  onEdit,
  onDelete,
  onPin,
  onThread
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hoveredMessage, setHoveredMessage] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

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

  const quickReactions = ['❤️', '👍', '😂', '😮', '😢', '😡', '🔥', '👏'];

  const getMessageReactions = (messageId: string): { emoji: string; users: string[]; count: number }[] => {
    const messageReactions = reactions[messageId] || [];
    const reactionMap = new Map<string, { users: string[]; count: number }>();
    
    messageReactions.forEach(emoji => {
      if (reactionMap.has(emoji)) {
        reactionMap.get(emoji)!.count++;
        reactionMap.get(emoji)!.users.push(user.name);
      } else {
        reactionMap.set(emoji, { users: [user.name], count: 1 });
      }
    });

    return Array.from(reactionMap.entries()).map(([emoji, data]) => ({
      emoji,
      users: data.users,
      count: data.count
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ScrollArea className="flex-1 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="space-y-6 py-6">
        {messages.map((message, index) => {
          const showDate = index === 0 || 
            formatDate(messages[index - 1].timestamp) !== formatDate(message.timestamp);
          const messageReactions = getMessageReactions(message.id);
          const isOwn = message.userId === user.id;
          const showAvatar = !isOwn && (index === 0 || messages[index - 1].userId !== message.userId);
          
          return (
            <div key={message.id}>
              {showDate && (
                <div className="text-center my-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white text-gray-600 text-sm px-6 py-2 rounded-full shadow-sm border font-medium">
                        {formatDate(message.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              <div 
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'} group relative`}
                onMouseEnter={() => setHoveredMessage(message.id)}
                onMouseLeave={() => setHoveredMessage(null)}
              >
                <div className={`max-w-2xl ${isOwn ? 'order-2' : 'order-1'}`}>
                  {/* Avatar and Name */}
                  {!isOwn && showAvatar && (
                    <div className="flex items-center gap-3 mb-2 ml-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-lg">
                        {message.userName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{message.userName}</span>
                      <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
                      {message.isEdited && (
                        <Badge variant="secondary" className="text-xs px-2 py-0">edited</Badge>
                      )}
                    </div>
                  )}
                  
                  {/* Reply Preview */}
                  {message.repliedTo && (
                    <div className="mb-3 ml-3">
                      <div className="bg-gray-50 border-l-4 border-blue-400 rounded-r-lg p-3 max-w-md">
                        <div className="flex items-center gap-2 mb-1">
                          <Reply className="h-3 w-3 text-blue-500" />
                          <span className="text-xs font-medium text-blue-600">{message.repliedTo.userName}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{message.repliedTo.content}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Message Bubble */}
                  <div className={`relative group/message ${isOwn ? 'ml-12' : 'mr-12'}`}>
                    {message.isPinned && (
                      <div className="absolute -top-2 left-3 z-10">
                        <Badge className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                          <Pin className="h-3 w-3 mr-1" />
                          Pinned
                        </Badge>
                      </div>
                    )}
                    
                    <div className={`px-6 py-4 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-lg ${
                      isOwn 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                        : 'bg-white text-gray-800 border border-gray-100 hover:border-gray-200'
                    } ${message.isPinned ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}`}>
                      
                      {/* Message Content */}
                      <div className="space-y-2">
                        {message.type === 'image' && message.imageUrl && (
                          <div className="rounded-lg overflow-hidden mb-3">
                            <img src={message.imageUrl} alt="Shared content" className="max-w-full h-auto" />
                          </div>
                        )}
                        
                        {message.type === 'voice' && (
                          <div className="flex items-center gap-3 bg-black/10 rounded-lg p-3 mb-2">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                            <div className="flex-1">
                              <div className="h-1 bg-white/30 rounded-full">
                                <div className="h-1 bg-white rounded-full w-1/3"></div>
                              </div>
                            </div>
                            <span className="text-xs opacity-80">{message.duration}</span>
                          </div>
                        )}
                        
                        <p className="text-sm leading-relaxed break-words">{message.content}</p>
                        
                        {/* Thread indicator */}
                        {message.threadCount && message.threadCount > 0 && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`mt-2 ${isOwn ? 'text-blue-100 hover:bg-white/20' : 'text-blue-600 hover:bg-blue-50'}`}
                            onClick={() => onThread?.(message)}
                          >
                            <MessageSquare className="h-3 w-3 mr-1" />
                            {message.threadCount} {message.threadCount === 1 ? 'reply' : 'replies'}
                          </Button>
                        )}
                      </div>
                      
                      {/* Message timestamp for own messages */}
                      {isOwn && (
                        <div className="flex items-center justify-end mt-3 gap-2">
                          <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                          <div className="flex">
                            <div className="w-1 h-1 bg-white/70 rounded-full"></div>
                            <div className="w-1 h-1 bg-white/70 rounded-full ml-0.5"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Reactions */}
                    {messageReactions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2 ml-3">
                        {messageReactions.map((reaction, idx) => (
                          <Badge 
                            key={idx} 
                            variant="secondary" 
                            className="bg-white border border-gray-200 hover:bg-gray-50 cursor-pointer text-xs px-2 py-1 shadow-sm transition-all hover:scale-105"
                            onClick={() => onReaction(message.id, reaction.emoji)}
                          >
                            <span className="mr-1">{reaction.emoji}</span>
                            <span className="font-medium">{reaction.count}</span>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Message Actions */}
                {hoveredMessage === message.id && (
                  <div className={`absolute top-0 ${isOwn ? 'left-0 -ml-2' : 'right-0 -mr-2'} z-10`}>
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-1 flex items-center gap-1">
                      {/* Quick Reactions */}
                      <div className="flex items-center gap-1 border-r border-gray-200 pr-2">
                        {quickReactions.slice(0, 3).map((emoji) => (
                          <Button
                            key={emoji}
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 hover:bg-gray-100 text-base"
                            onClick={() => onReaction(message.id, emoji)}
                          >
                            {emoji}
                          </Button>
                        ))}
                      </div>
                      
                      {/* Action Buttons */}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 w-7 p-0 hover:bg-blue-50"
                        onClick={() => onReply(message)}
                      >
                        <Reply className="h-3 w-3 text-blue-600" />
                      </Button>
                      
                      <EmojiPicker onEmojiSelect={(emoji) => onReaction(message.id, emoji)}>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-yellow-50">
                          <Smile className="h-3 w-3 text-yellow-600" />
                        </Button>
                      </EmojiPicker>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-gray-50">
                            <MoreHorizontal className="h-3 w-3 text-gray-600" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="w-80">
                          <div className="space-y-2 p-2">
                            <Button variant="ghost" className="w-full justify-start" onClick={() => onThread?.(message)}>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Start thread
                            </Button>
                            <Button variant="ghost" className="w-full justify-start" onClick={() => copyToClipboard(message.content)}>
                              <Copy className="h-4 w-4 mr-2" />
                              Copy text
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                              <Forward className="h-4 w-4 mr-2" />
                              Forward
                            </Button>
                            <Button variant="ghost" className="w-full justify-start" onClick={() => onPin?.(message.id)}>
                              <Pin className="h-4 w-4 mr-2" />
                              {message.isPinned ? 'Unpin' : 'Pin'} message
                            </Button>
                            {isOwn && (
                              <>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => onEdit?.(message)}>
                                  <Edit3 className="h-4 w-4 mr-2" />
                                  Edit
                                </Button>
                                <Button variant="ghost" className="w-full justify-start text-red-600" onClick={() => onDelete?.(message.id)}>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </Button>
                              </>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-600 px-6 py-4 rounded-2xl shadow-sm border border-gray-100 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-500">Someone is typing...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default EnhancedMessageList;

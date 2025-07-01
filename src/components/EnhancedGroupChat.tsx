
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, Send, Users, Settings, Phone, Video, 
  Smile, Paperclip, MoreVertical, Search, UserPlus
} from 'lucide-react';
import { User, Group, Message } from '@/types/connectPulse';
import { supabase } from '@/integrations/supabase/client';

interface EnhancedGroupChatProps {
  user: User;
  group: Group;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onBack: () => void;
}

const EnhancedGroupChat: React.FC<EnhancedGroupChatProps> = ({
  user,
  group,
  messages,
  onSendMessage,
  onBack
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([user.id]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Real-time presence tracking
  useEffect(() => {
    const channel = supabase.channel(`group-${group.id}-presence`)
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const users = Object.keys(state);
        setOnlineUsers(users);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('User joined:', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('User left:', key, leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user_id: user.id,
            user_name: user.name,
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [group.id, user.id, user.name]);

  // Real-time typing indicator
  useEffect(() => {
    if (!isTyping) return;

    const timer = setTimeout(() => {
      setIsTyping(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [newMessage, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
      setIsTyping(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    if (!isTyping && e.target.value.length > 0) {
      setIsTyping(true);
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: Date) => {
    const today = new Date();
    const messageDate = new Date(timestamp);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    return messageDate.toLocaleDateString();
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups: { [key: string]: Message[] }, message) => {
    const date = formatDate(message.timestamp);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className="max-w-6xl mx-auto h-screen flex flex-col bg-white">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {group.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-900">{group.name}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Users className="h-3 w-3" />
                <span>{group.memberCount} members</span>
                <span>•</span>
                <span className="text-green-500">{onlineUsers.length} online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hover:bg-gray-100">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-gray-100">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-gray-100">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-gray-100">
            <UserPlus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-gray-100">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date}>
            {/* Date Separator */}
            <div className="flex items-center justify-center my-4">
              <div className="bg-white px-3 py-1 rounded-full text-xs text-gray-500 shadow-sm border">
                {date}
              </div>
            </div>

            {/* Messages for this date */}
            {dateMessages.map((message, index) => {
              const isOwnMessage = message.userId === user.id;
              const showAvatar = index === 0 || dateMessages[index - 1].userId !== message.userId;
              
              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${isOwnMessage ? 'justify-end' : 'justify-start'} ${
                    showAvatar ? 'mt-4' : 'mt-1'
                  }`}
                >
                  {!isOwnMessage && showAvatar && (
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {message.userName.charAt(0)}
                    </div>
                  )}
                  
                  {!isOwnMessage && !showAvatar && (
                    <div className="w-8 h-8 flex-shrink-0" />
                  )}

                  <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-1' : ''}`}>
                    {showAvatar && !isOwnMessage && (
                      <div className="text-xs text-gray-500 mb-1 px-3">
                        {message.userName}
                      </div>
                    )}
                    
                    <div
                      className={`px-4 py-2 rounded-2xl shadow-sm ${
                        isOwnMessage
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md'
                          : 'bg-white text-gray-900 rounded-bl-md border'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    
                    <div className={`text-xs text-gray-500 mt-1 px-3 ${
                      isOwnMessage ? 'text-right' : 'text-left'
                    }`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-sm text-gray-500 px-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span>Someone is typing...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="hover:bg-gray-100 p-2"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="hover:bg-gray-100 p-2"
          >
            <Smile className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={handleInputChange}
              placeholder={`Message #${group.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="w-full pr-12 py-3 bg-gray-50 border-gray-200 rounded-full focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <Button
            type="submit"
            size="sm"
            disabled={!newMessage.trim()}
            className={`rounded-full p-3 transition-all duration-200 ${
              newMessage.trim()
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EnhancedGroupChat;


import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send, Users, MessageSquare, Heart, Reply, MoreVertical, Smile, Paperclip } from 'lucide-react';
import { User, Group, Message } from '@/types/connectPulse';

interface GroupChatProps {
  user: User;
  group: Group;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onBack: () => void;
}

const GroupChat: React.FC<GroupChatProps> = ({ 
  user, 
  group, 
  messages, 
  onSendMessage, 
  onBack 
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [reactions, setReactions] = useState<Record<string, string[]>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const addReaction = (messageId: string, emoji: string) => {
    setReactions(prev => ({
      ...prev,
      [messageId]: [...(prev[messageId] || []), emoji]
    }));
  };

  const formatTime = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-5xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
        <Card className="flex-1 flex flex-col shadow-2xl border-0 overflow-hidden bg-white/95 backdrop-blur-sm">
          {/* Enhanced Header */}
          <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                className="text-white hover:bg-white/20 transition-all duration-300 rounded-lg"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{group.name}</h2>
                  <div className="flex items-center gap-4 mt-1">
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      <Users className="h-3 w-3 mr-1" />
                      {group.memberCount.toLocaleString()} members
                    </Badge>
                    <span className="text-blue-100 text-sm">{group.niche}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          {/* Enhanced Messages Area */}
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-gray-50">
            {messages.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-10 w-10 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Welcome to {group.name}!</h3>
                <p className="text-gray-500">Be the first to start the conversation in this community.</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="group animate-slide-up">
                  <div className="flex items-start gap-3 hover:bg-white/50 p-3 rounded-xl transition-all duration-200">
                    <Avatar className="w-10 h-10 border-2 border-white shadow-md">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                        {message.userName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{message.userName}</span>
                        <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                        {message.userId === user.id && (
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-200">
                            You
                          </Badge>
                        )}
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 mb-2">
                        <p className="text-gray-800 leading-relaxed">{message.content}</p>
                      </div>
                      
                      {/* Enhanced Message Actions */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => addReaction(message.id, '👍')}
                          className="h-7 px-2 text-xs hover:bg-blue-50 text-gray-500"
                        >
                          <Heart className="h-3 w-3 mr-1" />
                          React
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs hover:bg-blue-50 text-gray-500"
                        >
                          <Reply className="h-3 w-3 mr-1" />
                          Reply
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs hover:bg-blue-50 text-gray-500"
                        >
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      {/* Reactions Display */}
                      {reactions[message.id] && reactions[message.id].length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {reactions[message.id].map((emoji, index) => (
                            <span key={index} className="bg-blue-50 px-2 py-1 rounded-full text-sm">
                              {emoji}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Enhanced Message Input */}
          <div className="p-6 bg-white border-t border-gray-100">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message ${group.name}...`}
                  className="pr-20 py-3 text-base border-2 focus:border-blue-500 rounded-xl bg-gray-50 focus:bg-white transition-colors"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                    <Smile className="h-4 w-4 text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                    <Paperclip className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
              </div>
              
              <Button 
                onClick={handleSend}
                disabled={!newMessage.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GroupChat;

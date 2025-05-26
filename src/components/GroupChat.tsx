
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, Send, Users, Globe, MapPin, Smile, Paperclip, 
  MoreVertical, Search, Phone, Video, Settings, Pin, 
  Reply, Forward, Heart, ThumbsUp, Eye, EyeOff
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { User, Group, Message } from './ConnectPulse';

interface GroupChatProps {
  user: User;
  group: Group;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onBack: () => void;
}

// Enhanced mock messages with reactions and features
const generateInitialMessages = (group: Group): Message[] => {
  const mockMessages = [
    {
      id: '1',
      userId: 'user1',
      userName: 'Sarah Johnson',
      content: `🎉 Welcome to the ${group.name} group! Great to have everyone here. Let's share our experiences and grow together!`,
      timestamp: new Date(Date.now() - 7200000),
      groupId: group.id
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Mike Chen',
      content: 'Looking forward to collaborating with businesses in this space! Anyone working on sustainable solutions?',
      timestamp: new Date(Date.now() - 6000000),
      groupId: group.id
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Emma Rodriguez',
      content: 'Has anyone here worked with international clients? Would love to share experiences and learn best practices.',
      timestamp: new Date(Date.now() - 4800000),
      groupId: group.id
    },
    {
      id: '4',
      userId: 'user4',
      userName: 'David Kumar',
      content: '@Emma Rodriguez Yes! I\'ve been working with clients across 15 countries. Happy to share some insights in a call this week.',
      timestamp: new Date(Date.now() - 3600000),
      groupId: group.id
    },
    {
      id: '5',
      userId: 'user1',
      userName: 'Sarah Johnson',
      content: 'That sounds amazing! We should organize a virtual meetup. What do you all think? 📅',
      timestamp: new Date(Date.now() - 1800000),
      groupId: group.id
    }
  ];
  return mockMessages;
};

const GroupChat: React.FC<GroupChatProps> = ({ user, group, messages, onSendMessage, onBack }) => {
  const [newMessage, setNewMessage] = useState('');
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with mock messages if no real messages exist
    if (messages.length === 0) {
      setAllMessages(generateInitialMessages(group));
    } else {
      setAllMessages([...generateInitialMessages(group), ...messages]);
    }
  }, [group.id, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [allMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
      setReplyTo(null);
      
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const getScopeIcon = (scope: string) => {
    switch (scope) {
      case 'local': return <MapPin className="h-4 w-4" />;
      case 'regional': return <Users className="h-4 w-4" />;
      case 'global': return <Globe className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getScopeColor = (scope: string) => {
    switch (scope) {
      case 'local': return 'bg-green-500';
      case 'regional': return 'bg-blue-500';
      case 'global': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

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

  const onlineUsers = Math.floor(group.memberCount * 0.15); // Simulate 15% online

  return (
    <div className="max-w-6xl mx-auto h-[85vh] flex flex-col animate-fade-in">
      <Card className="flex-1 flex flex-col shadow-lg border-0">
        {/* Enhanced Header */}
        <CardHeader className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <CardTitle className="text-xl">{group.name}</CardTitle>
                  <Badge 
                    className={`${getScopeColor(group.scope)} text-white flex items-center gap-1 hover:bg-opacity-80`}
                  >
                    {getScopeIcon(group.scope)}
                    {group.scope}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-blue-100">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {group.memberCount.toLocaleString()} members
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    {onlineUsers} online
                  </span>
                  <span>{group.description}</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Video className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20"
                onClick={() => setShowOnlineUsers(!showOnlineUsers)}
              >
                {showOnlineUsers ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem>
                    <Pin className="h-4 w-4 mr-2" />
                    Pin Group
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Group Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    Leave Group
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex p-0">
          {/* Messages Area */}
          <div className="flex-1 flex flex-col">
            {/* Reply Banner */}
            {replyTo && (
              <div className="p-3 bg-blue-50 border-l-4 border-blue-500 m-4 rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-900">Replying to {replyTo.userName}</p>
                    <p className="text-sm text-blue-700 truncate">{replyTo.content}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setReplyTo(null)}>
                    ✕
                  </Button>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {allMessages.map((message, index) => {
                const showDate = index === 0 || 
                  formatDate(allMessages[index - 1].timestamp) !== formatDate(message.timestamp);
                
                return (
                  <div key={message.id}>
                    {showDate && (
                      <div className="text-center my-4">
                        <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                          {formatDate(message.timestamp)}
                        </span>
                      </div>
                    )}
                    
                    <div className={`flex ${message.userId === user.id ? 'justify-end' : 'justify-start'}`}>
                      <div className="max-w-xs lg:max-w-md group">
                        <div className={`px-4 py-2 rounded-lg ${
                          message.userId === user.id 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 text-gray-800'
                        } transition-all duration-200 hover:shadow-md`}>
                          {message.userId !== user.id && (
                            <p className="text-xs font-semibold mb-1 opacity-80">
                              {message.userName}
                            </p>
                          )}
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          
                          {/* Message Actions */}
                          <div className="flex items-center justify-between mt-2">
                            <p className={`text-xs ${
                              message.userId === user.id ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {formatTime(message.timestamp)}
                            </p>
                            
                            {/* Reaction and Action Buttons */}
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 w-6 p-0"
                                onClick={() => setReplyTo(message)}
                              >
                                <Reply className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Forward className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Heart className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <span className="ml-2 text-xs">Someone is typing...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t bg-gray-50">
              <div className="flex gap-2 items-end">
                <Button type="button" variant="ghost" size="sm" className="mb-2">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" className="mb-2">
                  <Smile className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="resize-none border-2 focus:border-blue-500"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={!newMessage.trim()}
                  className="bg-blue-500 hover:bg-blue-600 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>

          {/* Online Users Sidebar */}
          {showOnlineUsers && (
            <div className="w-64 border-l bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Online ({onlineUsers})
              </h3>
              <div className="space-y-2">
                {['Sarah Johnson', 'Mike Chen', 'Emma Rodriguez', 'David Kumar', 'Lisa Wong'].slice(0, onlineUsers).map((name, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                      {name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm text-gray-700">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupChat;


import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ArrowLeft, Send, Users, Globe, MapPin, Smile, Paperclip, 
  MoreVertical, Search, Phone, Video, Settings, Pin, 
  Reply, Forward, Heart, ThumbsUp, Eye, EyeOff, Image,
  FileText, Download, Copy, Edit, Trash2, MessageSquare,
  UserPlus, Share, Bookmark, Flag, Mic, VolumeX, Volume2,
  X, Check, Clock, Star, Archive, AlertTriangle, ArrowUp,
  Hash, Calendar, Link, Zap
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { User, Group, Message } from '@/types/connectPulse';
import GlobalNavigation from './GlobalNavigation';

interface EnhancedGroupChatProps {
  user: User;
  group: Group;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onBack: () => void;
}

interface ExtendedMessage extends Message {
  type?: 'text' | 'image' | 'voice' | 'file' | 'announcement';
  imageUrl?: string;
  fileName?: string;
  fileSize?: string;
  duration?: string;
  isEdited?: boolean;
  repliedTo?: ExtendedMessage;
  reactions?: { emoji: string; users: string[] }[];
  isPinned?: boolean;
  threadId?: string;
  parentMessageId?: string;
}

const EnhancedGroupChat: React.FC<EnhancedGroupChatProps> = ({ user, group, messages, onSendMessage, onBack }) => {
  const [newMessage, setNewMessage] = useState('');
  const [allMessages, setAllMessages] = useState<ExtendedMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);
  const [replyTo, setReplyTo] = useState<ExtendedMessage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [pinnedMessages, setPinnedMessages] = useState<ExtendedMessage[]>([]);
  const [showPinned, setShowPinned] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Enhanced mock messages with professional networking context
  const generateEnhancedMessages = (group: Group): ExtendedMessage[] => {
    const mockMessages: ExtendedMessage[] = [
      {
        id: '1',
        userId: 'admin',
        userName: 'Admin',
        content: '📋 Welcome to the Bookkeeping & Financial Services Professionals group! Please review our community guidelines pinned above.',
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        groupId: group.id,
        type: 'announcement',
        isPinned: true,
        reactions: [
          { emoji: '👍', users: ['user1', 'user2', 'user3'] },
          { emoji: '🎉', users: ['user4', 'user5'] }
        ]
      },
      {
        id: '2',
        userId: 'user1',
        userName: 'Sarah Johnson, CPA',
        content: 'Good morning everyone! Has anyone worked with the new IFRS 17 implementation? I\'d love to connect and share experiences.',
        timestamp: new Date(Date.now() - 7200000),
        groupId: group.id,
        type: 'text',
        reactions: [
          { emoji: '💼', users: ['user2', 'user3'] },
          { emoji: '🤝', users: ['user4'] }
        ]
      },
      {
        id: '3',
        userId: 'user2',
        userName: 'Mike Chen, Bookkeeper',
        content: '@Sarah Johnson, CPA Yes! I just completed a project with IFRS 17. Happy to share insights. Are you available for a quick call this week?',
        timestamp: new Date(Date.now() - 6000000),
        groupId: group.id,
        type: 'text',
        repliedTo: {
          id: '2',
          userId: 'user1',
          userName: 'Sarah Johnson, CPA',
          content: 'Good morning everyone! Has anyone worked with the new IFRS 17...',
          timestamp: new Date(Date.now() - 7200000),
          groupId: group.id
        }
      },
      {
        id: '4',
        userId: 'user3',
        userName: 'Emma Rodriguez, Tax Consultant',
        content: '🔗 Sharing a great resource on tax compliance updates: [Link to Professional Tax Update Guide]',
        timestamp: new Date(Date.now() - 4800000),
        groupId: group.id,
        type: 'text',
        reactions: [
          { emoji: '📚', users: ['user1', 'user4', 'user5'] },
          { emoji: '🙏', users: ['user2'] }
        ]
      },
      {
        id: '5',
        userId: 'user4',
        userName: 'David Kumar, Financial Advisor',
        content: 'Networking Event Reminder: Local chapter meeting this Friday at 6 PM. Who\'s planning to attend? 📅',
        timestamp: new Date(Date.now() - 1800000),
        groupId: group.id,
        type: 'text',
        isPinned: true,
        reactions: [
          { emoji: '✋', users: ['user1', 'user2', 'user3', 'user5'] },
          { emoji: '📅', users: ['user1', 'user3'] }
        ]
      }
    ];
    return mockMessages;
  };

  useEffect(() => {
    const enhanced = generateEnhancedMessages(group);
    setAllMessages([...enhanced, ...messages]);
    setPinnedMessages(enhanced.filter(msg => msg.isPinned));
  }, [group.id, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [allMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const messageContent = replyTo 
        ? `@${replyTo.userName} ${newMessage.trim()}`
        : newMessage.trim();
      
      onSendMessage(messageContent);
      setNewMessage('');
      setReplyTo(null);
      
      // Simulate typing indicator
      setTypingUsers(['Someone']);
      setTimeout(() => setTypingUsers([]), 2000);
    }
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setAllMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions?.find(r => r.emoji === emoji);
        if (existingReaction) {
          const hasUserReacted = existingReaction.users.includes(user.id);
          if (hasUserReacted) {
            existingReaction.users = existingReaction.users.filter(u => u !== user.id);
          } else {
            existingReaction.users.push(user.id);
          }
        } else {
          msg.reactions = [...(msg.reactions || []), { emoji, users: [user.id] }];
        }
      }
      return msg;
    }));
  };

  const handlePinMessage = (messageId: string) => {
    const message = allMessages.find(m => m.id === messageId);
    if (message) {
      message.isPinned = !message.isPinned;
      if (message.isPinned) {
        setPinnedMessages(prev => [...prev, message]);
      } else {
        setPinnedMessages(prev => prev.filter(m => m.id !== messageId));
      }
      setAllMessages(prev => [...prev]);
    }
  };

   const filteredMessages = searchQuery 
    ? allMessages.filter(msg => 
        msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.userName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allMessages;

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
      case 'local': return 'bg-green-500 hover:bg-green-600';
      case 'regional': return 'bg-blue-500 hover:bg-blue-600';
      case 'global': return 'bg-purple-500 hover:bg-purple-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
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

  const onlineUsers = Math.floor(group.memberCount * 0.15);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <GlobalNavigation currentUserType="business" onNavigate={() => {}} />
      
      <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col">
        <Card className="flex-1 flex flex-col shadow-xl border-0 bg-white overflow-hidden m-2 sm:m-4 rounded-xl">
          {/* Enhanced Header with Professional Styling */}
          <CardHeader className="flex-shrink-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 transition-colors flex-shrink-0">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="ml-2 hidden sm:inline">Back</span>
                </Button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                      <MessageSquare className="h-4 w-4 sm:h-6 sm:w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg sm:text-xl font-bold truncate">{group.name}</CardTitle>
                      <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-blue-100 flex-wrap">
                        <Badge 
                          className={`${getScopeColor(group.scope)} text-white flex items-center gap-1 transition-colors px-2 py-1 text-xs`}
                        >
                          {getScopeIcon(group.scope)}
                          <span className="capitalize font-medium hidden sm:inline">{group.scope}</span>
                        </Badge>
                        <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="font-medium">{group.memberCount.toLocaleString()}</span>
                          <span className="hidden sm:inline">members</span>
                        </span>
                        <span className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="font-medium">{onlineUsers}</span>
                          <span className="hidden sm:inline">online</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-blue-100 text-xs sm:text-sm leading-relaxed hidden sm:block">{group.description}</p>
                </div>
              </div>
              
              {/* Enhanced Action Buttons */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20 transition-colors"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <Search className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20 transition-colors"
                  onClick={() => setShowPinned(!showPinned)}
                >
                  <Pin className="h-4 w-4" />
                  {pinnedMessages.length > 0 && (
                    <Badge variant="secondary" className="ml-1 text-xs px-1">
                      {pinnedMessages.length}
                    </Badge>
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20 transition-colors hidden sm:inline-flex"
                >
                  <Video className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20 transition-colors"
                  onClick={() => setShowOnlineUsers(!showOnlineUsers)}
                >
                  {showOnlineUsers ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      Group Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Invite Members
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Event
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

          <CardContent className="flex-1 flex p-0 bg-transparent overflow-hidden">
            {/* Messages Area */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Search Bar */}
              {showSearch && (
                <div className="p-3 sm:p-4 border-b bg-blue-50">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search messages, users, or topics..."
                      className="pl-10 bg-white border-blue-200 focus:border-blue-500"
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {setShowSearch(false); setSearchQuery('');}}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Pinned Messages */}
              {showPinned && pinnedMessages.length > 0 && (
                <div className="border-b bg-amber-50 border-amber-200">
                  <div className="p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-amber-800 flex items-center gap-2 text-sm sm:text-base">
                        <Pin className="h-4 w-4" />
                        Pinned Messages
                      </h3>
                      <Button variant="ghost" size="sm" onClick={() => setShowPinned(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {pinnedMessages.map((msg) => (
                        <div key={msg.id} className="bg-white p-3 rounded-lg border border-amber-200 shadow-sm">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-amber-900 text-sm">{msg.userName}</p>
                              <p className="text-gray-700 text-sm mt-1 break-words">{msg.content}</p>
                            </div>
                            <span className="text-xs text-amber-600 flex-shrink-0 ml-2">{formatTime(msg.timestamp)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Reply Banner */}
              {replyTo && (
                <div className="p-3 sm:p-4 bg-blue-50 border-l-4 border-blue-500 m-2 sm:m-4 rounded-r-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Reply className="h-4 w-4 text-blue-600" />
                        <p className="text-sm font-medium text-blue-900">Replying to {replyTo.userName}</p>
                      </div>
                      <p className="text-sm text-blue-700 bg-white/50 p-2 rounded truncate">
                        {replyTo.content}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setReplyTo(null)} className="text-blue-600 hover:bg-blue-100 flex-shrink-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Enhanced Messages with Better Responsiveness */}
              <ScrollArea className="flex-1 px-2 sm:px-4">
                <div className="space-y-4 sm:space-y-6 py-4 max-w-4xl mx-auto">
                  {filteredMessages.map((message, index) => {
                    const showDate = index === 0 || 
                      formatDate(filteredMessages[index - 1].timestamp) !== formatDate(message.timestamp);
                    const isAnnouncement = message.type === 'announcement';
                    const isOwn = message.userId === user.id;
                    
                    return (
                      <div key={message.id}>
                        {showDate && (
                          <div className="text-center my-6 sm:my-8">
                            <div className="relative">
                              <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                              </div>
                              <div className="relative flex justify-center">
                                <span className="bg-white text-gray-600 text-xs sm:text-sm px-4 sm:px-6 py-2 rounded-full shadow-sm border font-medium">
                                  {formatDate(message.timestamp)}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] sm:max-w-xs lg:max-w-2xl group relative ${isOwn ? 'ml-4' : 'mr-4'}`}>
                            <div className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md relative break-words ${
                              isAnnouncement 
                                ? 'bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 text-amber-900'
                                : isOwn 
                                  ? 'bg-blue-500 text-white' 
                                  : 'bg-white text-gray-800 border border-gray-200'
                            }`}>
                              {/* Pin indicator */}
                              {message.isPinned && (
                                <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-md">
                                  <Pin className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                                </div>
                              )}

                              {!isOwn && (
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-xs font-bold text-white">
                                    {message.userName.split(' ')[0][0]}
                                  </div>
                                  <p className="text-xs font-semibold opacity-80 flex items-center gap-2">
                                    <span className="truncate">{message.userName}</span>
                                    {message.userName.includes('CPA') && (
                                      <Badge variant="outline" className="text-xs px-1 py-0">Verified</Badge>
                                    )}
                                  </p>
                                </div>
                              )}
                              
                              {/* Reply context */}
                              {message.repliedTo && (
                                <div className="mb-2 p-2 bg-black/5 rounded-lg border-l-2 border-gray-300">
                                  <p className="text-xs font-medium opacity-70">{message.repliedTo.userName}</p>
                                  <p className="text-xs opacity-60 truncate">{message.repliedTo.content}</p>
                                </div>
                              )}
                              
                              <p className="text-sm leading-relaxed break-words">{message.content}</p>
                              
                              {/* Reactions */}
                              {message.reactions && message.reactions.length > 0 && (
                                <div className="flex gap-1 mt-3 flex-wrap">
                                  {message.reactions.map((reaction, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => handleReaction(message.id, reaction.emoji)}
                                      className={`text-xs px-2 py-1 rounded-full transition-colors flex items-center gap-1 ${
                                        reaction.users.includes(user.id)
                                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border'
                                      }`}
                                    >
                                      <span>{reaction.emoji}</span>
                                      <span className="font-medium">{reaction.users.length}</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                              
                              <div className="flex items-center justify-between mt-2">
                                <p className={`text-xs ${
                                  isAnnouncement ? 'text-amber-700' :
                                  isOwn ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                  {formatTime(message.timestamp)}
                                  {message.isEdited && <span className="ml-1 italic">(edited)</span>}
                                  {isOwn && (
                                    <span className="ml-2">✓✓</span>
                                  )}
                                </p>
                              </div>
                            </div>
                            
                            {/* Enhanced Message Actions */}
                            <div className="absolute top-0 right-0 transform translate-x-full opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-lg shadow-lg border p-1 ml-2 z-10">
                              <div className="flex flex-col gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 sm:h-7 sm:w-7 p-0"
                                  onClick={() => setReplyTo(message)}
                                >
                                  <Reply className="h-3 w-3" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 sm:h-7 sm:w-7 p-0"
                                  onClick={() => handleReaction(message.id, '👍')}
                                >
                                  <ThumbsUp className="h-3 w-3" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 sm:h-7 sm:w-7 p-0"
                                  onClick={() => handlePinMessage(message.id)}
                                >
                                  <Pin className="h-3 w-3" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-6 w-6 sm:h-7 sm:w-7 p-0">
                                      <MoreVertical className="h-3 w-3" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Copy className="h-3 w-3 mr-2" />
                                      Copy
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Forward className="h-3 w-3 mr-2" />
                                      Forward
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Bookmark className="h-3 w-3 mr-2" />
                                      Save
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">
                                      <Flag className="h-3 w-3 mr-2" />
                                      Report
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Enhanced Typing Indicator */}
                  {typingUsers.length > 0 && (
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-600 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-sm border max-w-xs">
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-xs">
                            {typingUsers.length === 1 
                              ? `${typingUsers[0]} is typing...`
                              : `${typingUsers.length} people are typing...`
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Enhanced Message Input with Better Mobile UX */}
              <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t bg-white">
                <div className="flex gap-2 sm:gap-3 items-end max-w-4xl mx-auto">
                  <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                    <Button type="button" variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 p-2">
                      <Image className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 p-2 hidden sm:inline-flex">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 p-2 hidden sm:inline-flex">
                      <Link className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex-1 relative">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={replyTo ? `Replying to ${replyTo.userName}...` : "Share your insights, ask questions, or connect with fellow professionals..."}
                      className="min-h-0 resize-none border-2 focus:border-blue-500 rounded-xl pr-16 sm:pr-24 bg-white text-sm sm:text-base"
                      rows={1}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                    />
                    <div className="absolute right-2 bottom-2 flex gap-1">
                      <Button type="button" variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 p-1">
                        <Smile className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                      {newMessage.trim() ? (
                        <Button 
                          type="submit"
                          size="sm"
                          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full h-7 w-7 sm:h-8 sm:w-8 p-0"
                        >
                          <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      ) : (
                        <Button type="button" size="sm" variant="ghost" className="p-1">
                          <Mic className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Enhanced Online Users Sidebar with Better Mobile Handling */}
            {showOnlineUsers && (
              <div className="w-64 sm:w-80 border-l bg-white shadow-lg">
                <div className="p-3 sm:p-4 border-b bg-gray-50">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    Online Members ({onlineUsers})
                  </h3>
                </div>
                <ScrollArea className="flex-1">
                  <div className="p-3 sm:p-4 space-y-3">
                    {[
                      { name: 'Sarah Johnson, CPA', role: 'Certified Public Accountant', status: 'Available for consultation' },
                      { name: 'Mike Chen', role: 'Senior Bookkeeper', status: 'In a meeting' },
                      { name: 'Emma Rodriguez', role: 'Tax Consultant', status: 'Available' },
                      { name: 'David Kumar', role: 'Financial Advisor', status: 'Available' },
                      { name: 'Lisa Wong, CMA', role: 'Management Accountant', status: 'Busy' }
                    ].slice(0, onlineUsers).map((member, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group">
                        <div className="relative flex-shrink-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                            {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white ${
                            member.status === 'Available' || member.status === 'Available for consultation' 
                              ? 'bg-green-500' 
                              : member.status === 'Busy' 
                                ? 'bg-red-500' 
                                : 'bg-yellow-500'
                          }`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 truncate text-sm">{member.name}</p>
                          <p className="text-xs text-gray-500 truncate">{member.role}</p>
                          <p className="text-xs text-gray-400 truncate">{member.status}</p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                          <Button variant="ghost" size="sm" className="h-6 w-6 sm:h-7 sm:w-7 p-0">
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedGroupChat;

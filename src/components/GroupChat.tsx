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
  X, Check, Clock, Star, Archive, AlertTriangle, ArrowUp
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { User, Group, Message } from './ConnectPulse';
import VideoCallModal from './VideoCallModal';
import SearchModal from './SearchModal';
import GroupSettingsModal from './GroupSettingsModal';
import ImageUploadModal from './ImageUploadModal';
import EmojiPicker from './EmojiPicker';

interface GroupChatProps {
  user: User;
  group: Group;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onBack: () => void;
}

interface ExtendedMessage extends Message {
  type?: 'text' | 'image' | 'voice' | 'file';
  imageUrl?: string;
  fileName?: string;
  fileSize?: string;
  duration?: string;
  isEdited?: boolean;
  repliedTo?: ExtendedMessage;
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
  const [allMessages, setAllMessages] = useState<ExtendedMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);
  const [replyTo, setReplyTo] = useState<ExtendedMessage | null>(null);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const [reactions, setReactions] = useState<Record<string, string[]>>({});
  const [pinnedMessages, setPinnedMessages] = useState<string[]>([]);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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
      const messageContent = replyTo 
        ? `@${replyTo.userName} ${newMessage.trim()}`
        : newMessage.trim();
      
      onSendMessage(messageContent);
      setNewMessage('');
      setReplyTo(null);
      
      toast({
        title: "Message sent!",
        description: "Your message has been delivered.",
      });
      
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const handleImageSelect = (imageUrl: string, caption?: string) => {
    const newImageMessage: ExtendedMessage = {
      id: `img-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      content: caption || 'Shared an image',
      timestamp: new Date(),
      groupId: group.id,
      type: 'image',
      imageUrl: imageUrl
    };
    
    setAllMessages(prev => [...prev, newImageMessage]);
    setIsImageModalOpen(false);
    
    toast({
      title: "Image shared!",
      description: "Your image has been sent to the group.",
    });
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setReactions(prev => ({
      ...prev,
      [messageId]: [...(prev[messageId] || []), emoji]
    }));
    toast({
      title: "Reaction added!",
      description: `Added ${emoji} reaction to message.`,
    });
  };

  const handlePinMessage = (messageId: string) => {
    setPinnedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
    toast({
      title: pinnedMessages.includes(messageId) ? "Message unpinned" : "Message pinned",
      description: pinnedMessages.includes(messageId) ? "Message removed from pinned." : "Message added to pinned.",
    });
  };

  const handleVoiceMessage = () => {
    if (isRecording) {
      setIsRecording(false);
      const voiceMessage: ExtendedMessage = {
        id: `voice-${Date.now()}`,
        userId: user.id,
        userName: user.name,
        content: 'Sent a voice message',
        timestamp: new Date(),
        groupId: group.id,
        type: 'voice',
        duration: '0:05'
      };
      setAllMessages(prev => [...prev, voiceMessage]);
      
      toast({
        title: "Voice message sent!",
        description: "Your voice message has been delivered.",
      });
    } else {
      setIsRecording(true);
      toast({
        title: "Recording...",
        description: "Hold to record your voice message.",
      });
    }
  };

  const handlePhoneCall = () => {
    toast({
      title: "Starting call...",
      description: "Connecting to group voice call.",
    });
  };

  const handleDeleteMessage = (messageId: string) => {
    setAllMessages(prev => prev.filter(msg => msg.id !== messageId));
    toast({
      title: "Message deleted",
      description: "The message has been removed.",
    });
  };

  const handleForwardMessage = (messageId: string) => {
    toast({
      title: "Forward message",
      description: "Message forwarding would open contact selector.",
    });
  };

  const toggleMessageSelection = (messageId: string) => {
    if (isSelectionMode) {
      setSelectedMessages(prev => 
        prev.includes(messageId) 
          ? prev.filter(id => id !== messageId)
          : [...prev, messageId]
      );
    }
  };

  const exitSelectionMode = () => {
    setIsSelectionMode(false);
    setSelectedMessages([]);
  };

  const deleteSelectedMessages = () => {
    setAllMessages(prev => prev.filter(msg => !selectedMessages.includes(msg.id)));
    setSelectedMessages([]);
    setIsSelectionMode(false);
    toast({
      title: "Messages deleted",
      description: `${selectedMessages.length} messages removed.`,
    });
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

  const onlineUsers = Math.floor(group.memberCount * 0.15);

  return (
    <div className="max-w-7xl mx-auto h-screen flex flex-col bg-gray-50">
      <Card className="flex-1 flex flex-col shadow-lg border-0 bg-white overflow-hidden">
        {/* Enhanced Header */}
        <CardHeader className="flex-shrink-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span className="ml-2">Back to Groups</span>
              </Button>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{group.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-blue-100">
                      <Badge 
                        className={`${getScopeColor(group.scope)} text-white flex items-center gap-1 hover:bg-opacity-80`}
                      >
                        {getScopeIcon(group.scope)}
                        {group.scope}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {group.memberCount.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        {onlineUsers} online
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-blue-100 text-sm">{group.description}</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20 transition-colors"
                onClick={() => setIsVideoCallOpen(true)}
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
                  <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
                    <Settings className="h-4 w-4 mr-2" />
                    Group Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Members
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
          <div className="flex-1 flex flex-col">
            {/* Reply Banner */}
            {replyTo && (
              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 m-4 rounded-r-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Reply className="h-4 w-4 text-blue-600" />
                      <p className="text-sm font-medium text-blue-900">Replying to {replyTo.userName}</p>
                    </div>
                    <p className="text-sm text-blue-700 bg-white/50 p-2 rounded truncate">
                      {replyTo.content}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setReplyTo(null)} className="text-blue-600 hover:bg-blue-100">
                    ✕
                  </Button>
                </div>
              </div>
            )}

            {/* Enhanced Messages with ScrollArea */}
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-4 py-4">
                {allMessages.map((message, index) => {
                  const showDate = index === 0 || 
                    formatDate(allMessages[index - 1].timestamp) !== formatDate(message.timestamp);
                  const messageReactions = reactions[message.id] || [];
                  const isPinned = pinnedMessages.includes(message.id);
                  
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
                          
                          {/* Message Actions */}
                          <div className="absolute top-0 right-0 transform translate-x-full opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-lg shadow-lg border p-1 ml-2">
                            <div className="flex flex-col gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0"
                                onClick={() => setReplyTo(message)}
                              >
                                <Reply className="h-3 w-3" />
                              </Button>
                              <EmojiPicker onEmojiSelect={(emoji) => handleReaction(message.id, emoji)}>
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
                
                {/* Typing Indicator */}
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

            {/* Enhanced Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
              <div className="flex gap-3 items-end">
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setIsImageModalOpen(true)}
                  >
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex-1 relative">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={replyTo ? `Replying to ${replyTo.userName}...` : "Type your message..."}
                    className="min-h-0 resize-none border-2 focus:border-blue-500 rounded-xl pr-24 bg-white"
                    rows={1}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                  />
                  <div className="absolute right-2 bottom-2 flex gap-1">
                    <EmojiPicker onEmojiSelect={handleEmojiSelect}>
                      <Button type="button" variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </EmojiPicker>
                    {newMessage.trim() ? (
                      <Button 
                        type="submit"
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full h-8 w-8 p-0"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        variant={isRecording ? "destructive" : "ghost"}
                        onClick={handleVoiceMessage}
                        className={isRecording ? "animate-pulse" : ""}
                      >
                        <Mic className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Online Users Sidebar */}
          {showOnlineUsers && (
            <div className="w-80 border-l bg-white shadow-lg">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  Online ({onlineUsers})
                </h3>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-4 space-y-3">
                  {['Sarah Johnson', 'Mike Chen', 'Emma Rodriguez', 'David Kumar', 'Lisa Wong'].slice(0, onlineUsers).map((name, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                          {name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{name}</p>
                        <p className="text-xs text-gray-500">Active now</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <VideoCallModal 
        isOpen={isVideoCallOpen} 
        onClose={() => setIsVideoCallOpen(false)} 
        groupName={group.name}
      />
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
      <GroupSettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        groupName={group.name}
      />
      <ImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onImageSelect={handleImageSelect}
      />
    </div>
  );
};

export default GroupChat;

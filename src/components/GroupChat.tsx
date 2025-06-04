import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, Send, Users, MessageSquare, Heart, Reply, MoreVertical, Smile, 
  Paperclip, Search, Pin, Edit, Trash2, Copy, Forward, Bookmark, Flag, 
  Image, FileText, Video, Music, Mic, Volume2, VolumeX, Eye, EyeOff,
  Clock, Calendar, Star, Archive, AlertTriangle, Hash, Link, Zap,
  UserPlus, Settings, Phone, VideoIcon, Shield, Bell, BellOff, Download,
  Upload, Filter, SortAsc, MessageCircle, Headphones, Camera, FileImage,
  Globe, Lock, Unlock, Palette, Type, AlignLeft, Bold, Italic, Underline,
  Code, Quote, List, ListOrdered, AtSign, Hashtag, Slash, MousePointer,
  Layers, Maximize2, Minimize2, RotateCcw, Check, X, Plus, Minus
} from 'lucide-react';
import { User, Group, Message } from '@/types/connectPulse';

interface ExtendedMessage extends Message {
  type?: 'text' | 'image' | 'voice' | 'file' | 'video' | 'system' | 'poll' | 'event';
  imageUrl?: string;
  fileName?: string;
  fileSize?: string;
  duration?: string;
  isEdited?: boolean;
  editedAt?: Date;
  repliedTo?: ExtendedMessage;
  reactions?: { emoji: string; users: string[]; count: number }[];
  isPinned?: boolean;
  threadId?: string;
  threadCount?: number;
  isScheduled?: boolean;
  scheduledFor?: Date;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  tags?: string[];
  mentions?: string[];
  attachments?: any[];
  readBy?: string[];
  deliveredAt?: Date;
  isEncrypted?: boolean;
  pollOptions?: { option: string; votes: number; voters: string[] }[];
  eventDetails?: { title: string; date: Date; location?: string };
}

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
  // Message and UI state
  const [newMessage, setNewMessage] = useState('');
  const [extendedMessages, setExtendedMessages] = useState<ExtendedMessage[]>([]);
  const [replyTo, setReplyTo] = useState<ExtendedMessage | null>(null);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [messageFilter, setMessageFilter] = useState<'all' | 'unread' | 'mentions' | 'files' | 'media'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  
  // UI enhancement state
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);
  const [pinnedMessages, setPinnedMessages] = useState<ExtendedMessage[]>([]);
  const [showPinned, setShowPinned] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<Set<string>>(new Set());
  const [bulkActionMode, setBulkActionMode] = useState(false);
  
  // Advanced features state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [voiceLevel, setVoiceLevel] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [showReadReceipts, setShowReadReceipts] = useState(true);
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Formatting state
  const [showFormatting, setShowFormatting] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  
  // Scheduled messages and polls
  const [showScheduler, setShowScheduler] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  
  // Media and files
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  // Thread state
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [threadMessages, setThreadMessages] = useState<ExtendedMessage[]>([]);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRecorderRef = useRef<MediaRecorder | null>(null);

  // Enhanced mock messages with all new features
  const generateEnhancedMessages = (): ExtendedMessage[] => {
    return [
      {
        id: '1',
        userId: 'admin',
        userName: 'Admin',
        content: '🎉 Welcome to the enhanced chat! New features include voice messages, polls, scheduling, and much more!',
        timestamp: new Date(Date.now() - 86400000),
        groupId: group.id,
        type: 'system',
        isPinned: true,
        priority: 'high',
        reactions: [
          { emoji: '🎉', users: ['user1', 'user2'], count: 2 },
          { emoji: '👍', users: ['user3'], count: 1 }
        ],
        readBy: ['user1', 'user2', 'user3'],
        tags: ['announcement', 'features']
      },
      {
        id: '2',
        userId: 'user1',
        userName: 'Sarah Johnson',
        content: 'This is amazing! The new threading feature will help keep conversations organized.',
        timestamp: new Date(Date.now() - 7200000),
        groupId: group.id,
        type: 'text',
        threadCount: 3,
        mentions: ['@everyone'],
        reactions: [
          { emoji: '💯', users: ['user2', 'user3'], count: 2 }
        ],
        readBy: ['user2', 'user3']
      },
      {
        id: '3',
        userId: 'user2',
        userName: 'Mike Chen',
        content: 'Just uploaded the quarterly report. Please review when you have time.',
        timestamp: new Date(Date.now() - 3600000),
        groupId: group.id,
        type: 'file',
        fileName: 'Q4_Report.pdf',
        fileSize: '2.4 MB',
        attachments: [{ name: 'Q4_Report.pdf', size: '2.4 MB', type: 'pdf' }],
        priority: 'high',
        tags: ['report', 'quarterly'],
        readBy: ['user1']
      },
      {
        id: '4',
        userId: 'user3',
        userName: 'Emma Rodriguez',
        content: '',
        timestamp: new Date(Date.now() - 1800000),
        groupId: group.id,
        type: 'poll',
        pollOptions: [
          { option: 'Next Monday', votes: 3, voters: ['user1', 'user2', 'user4'] },
          { option: 'Next Wednesday', votes: 2, voters: ['user3', 'user5'] },
          { option: 'Next Friday', votes: 1, voters: ['user6'] }
        ],
        readBy: ['user1', 'user2']
      },
      {
        id: '5',
        userId: user.id,
        userName: user.name,
        content: 'Thanks for the update! Looking forward to the new features.',
        timestamp: new Date(Date.now() - 900000),
        groupId: group.id,
        type: 'text',
        isEdited: true,
        editedAt: new Date(Date.now() - 600000),
        reactions: [
          { emoji: '👍', users: ['user1', 'user2'], count: 2 }
        ]
      }
    ];
  };

  useEffect(() => {
    const enhanced = generateEnhancedMessages();
    setExtendedMessages([...enhanced, ...messages]);
    setPinnedMessages(enhanced.filter(msg => msg.isPinned));
  }, [group.id, messages]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!activeThread) {
      scrollToBottom();
    }
  }, [extendedMessages, activeThread]);

  // Feature 1: Advanced Message Sending
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const messageContent = formatMessage(newMessage);
      
      if (replyTo) {
        // Create threaded reply
        const threadedMessage = `@${replyTo.userName} ${messageContent}`;
        onSendMessage(threadedMessage);
      } else {
        onSendMessage(messageContent);
      }
      
      setNewMessage('');
      setReplyTo(null);
      setShowFormatting(false);
      
      // Typing indicator simulation
      simulateTyping();
    }
  };

  // Feature 2: Message Formatting
  const formatMessage = (content: string) => {
    let formatted = content;
    
    if (isBold) formatted = `**${formatted}**`;
    if (isItalic) formatted = `*${formatted}*`;
    
    return formatted;
  };

  // Feature 3: Advanced Reactions System
  const handleReaction = (messageId: string, emoji: string) => {
    setExtendedMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions?.find(r => r.emoji === emoji);
        if (existingReaction) {
          const hasUserReacted = existingReaction.users.includes(user.id);
          if (hasUserReacted) {
            existingReaction.users = existingReaction.users.filter(u => u !== user.id);
            existingReaction.count = existingReaction.users.length;
          } else {
            existingReaction.users.push(user.id);
            existingReaction.count = existingReaction.users.length;
          }
        } else {
          msg.reactions = [...(msg.reactions || []), { emoji, users: [user.id], count: 1 }];
        }
      }
      return msg;
    }));
  };

  // Feature 4: Message Threading
  const openThread = (messageId: string) => {
    setActiveThread(messageId);
    // Simulate loading thread messages
    setThreadMessages([
      {
        id: `thread-${messageId}-1`,
        userId: 'user2',
        userName: 'Mike Chen',
        content: 'Great point! I agree with this approach.',
        timestamp: new Date(),
        groupId: group.id,
        type: 'text'
      }
    ]);
  };

  // Feature 5: Voice Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      audioRecorderRef.current = mediaRecorder;
      
      setIsRecording(true);
      setRecordingTime(0);
      
      const timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      mediaRecorder.start();
      
      mediaRecorder.onstop = () => {
        clearInterval(timer);
        setIsRecording(false);
        setRecordingTime(0);
        stream.getTracks().forEach(track => track.stop());
      };
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (audioRecorderRef.current && isRecording) {
      audioRecorderRef.current.stop();
    }
  };

  // Feature 6: File Upload with Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileUpload = (files: File[]) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Feature 7: Message Scheduling
  const scheduleMessage = () => {
    if (newMessage.trim() && scheduledDate && scheduledTime) {
      console.log('Scheduling message for:', scheduledDate, scheduledTime);
      setNewMessage('');
      setShowScheduler(false);
      setScheduledDate('');
      setScheduledTime('');
    }
  };

  // Feature 8: Poll Creation
  const createPoll = () => {
    if (pollQuestion.trim() && pollOptions.filter(opt => opt.trim()).length >= 2) {
      const pollMessage: ExtendedMessage = {
        id: Date.now().toString(),
        userId: user.id,
        userName: user.name,
        content: pollQuestion,
        timestamp: new Date(),
        groupId: group.id,
        type: 'poll',
        pollOptions: pollOptions.filter(opt => opt.trim()).map(opt => ({
          option: opt,
          votes: 0,
          voters: []
        }))
      };
      
      setExtendedMessages(prev => [...prev, pollMessage]);
      setPollQuestion('');
      setPollOptions(['', '']);
      setShowPollCreator(false);
    }
  };

  // Feature 9: Message Search and Filter
  const filteredMessages = extendedMessages.filter(msg => {
    const matchesSearch = !searchQuery || 
      msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.userName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = messageFilter === 'all' || 
      (messageFilter === 'files' && (msg.type === 'file' || msg.attachments?.length)) ||
      (messageFilter === 'media' && ['image', 'video', 'voice'].includes(msg.type || '')) ||
      (messageFilter === 'mentions' && msg.mentions?.some(m => m.includes(user.name)));
    
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    return sortOrder === 'newest' 
      ? b.timestamp.getTime() - a.timestamp.getTime()
      : a.timestamp.getTime() - b.timestamp.getTime();
  });

  // Feature 10: Bulk Actions
  const toggleMessageSelection = (messageId: string) => {
    const newSelection = new Set(selectedMessages);
    if (newSelection.has(messageId)) {
      newSelection.delete(messageId);
    } else {
      newSelection.add(messageId);
    }
    setSelectedMessages(newSelection);
  };

  // Feature 11: Message Translation
  const translateMessage = (messageId: string) => {
    // Simulate translation
    console.log('Translating message:', messageId);
  };

  // Feature 12: Smart Mentions and Hashtags
  const handleInputChange = (value: string) => {
    setNewMessage(value);
    
    // Simulate typing indicator
    if (value.trim()) {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1000);
    }
  };

  // Feature 13: Message Templates
  const insertTemplate = (template: string) => {
    setNewMessage(template);
    messageInputRef.current?.focus();
  };

  // Feature 14: Advanced Notifications
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    if (notificationsEnabled) {
      console.log('Notifications disabled');
    } else {
      console.log('Notifications enabled');
    }
  };

  // Feature 15: Typing Simulation
  const simulateTyping = () => {
    setTypingUsers(['Someone']);
    setTimeout(() => setTypingUsers([]), 2000);
  };

  // Utility functions
  const formatTime = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getMessagePriorityColor = (priority?: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-500';
      case 'high': return 'border-l-orange-500';
      case 'normal': return 'border-l-blue-500';
      case 'low': return 'border-l-gray-500';
      default: return '';
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'} p-4 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
         onDragOver={handleDragOver}
         onDragLeave={handleDragLeave}
         onDrop={handleDrop}>
      
      {/* Drag & Drop Overlay */}
      {dragOver && (
        <div className="fixed inset-0 bg-blue-500/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
            <Upload className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Drop files here</h3>
            <p className="text-gray-600">Release to upload files to the chat</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto h-[calc(100vh-2rem)] flex">
        {/* Main Chat Area */}
        <Card className={`flex-1 flex flex-col shadow-2xl border-0 overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white/95'} backdrop-blur-sm ${focusMode ? 'mx-8' : ''}`}>
          {/* Enhanced Header */}
          <CardHeader className={`bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-4 shadow-lg ${focusMode ? 'py-2' : ''}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onBack}
                  className="text-white hover:bg-white/20 transition-all duration-300 rounded-lg"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      {group.name}
                      {group.scope === 'local' && <MapPin className="h-4 w-4" />}
                      {group.scope === 'global' && <Globe className="h-4 w-4" />}
                    </h2>
                    {!focusMode && (
                      <div className="flex items-center gap-3 mt-1">
                        <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs">
                          <Users className="h-3 w-3 mr-1" />
                          {group.memberCount.toLocaleString()}
                        </Badge>
                        <span className="text-blue-100 text-xs">{group.niche}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Header Actions */}
              <div className="flex items-center gap-1">
                {/* Search Toggle */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <Search className="h-4 w-4" />
                </Button>
                
                {/* Pinned Messages */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20"
                  onClick={() => setShowPinned(!showPinned)}
                >
                  <Pin className="h-4 w-4" />
                  {pinnedMessages.length > 0 && (
                    <Badge variant="secondary" className="ml-1 text-xs px-1">
                      {pinnedMessages.length}
                    </Badge>
                  )}
                </Button>
                
                {/* Notifications */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20"
                  onClick={toggleNotifications}
                >
                  {notificationsEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                </Button>
                
                {/* Focus Mode */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20"
                  onClick={() => setFocusMode(!focusMode)}
                >
                  {focusMode ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                
                {/* Settings Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64" align="end">
                    <DropdownMenuItem>
                      <div className="flex items-center justify-between w-full">
                        <span className="flex items-center gap-2">
                          <Palette className="h-4 w-4" />
                          Dark Mode
                        </span>
                        <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div className="flex items-center justify-between w-full">
                        <span className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          Read Receipts
                        </span>
                        <Switch checked={showReadReceipts} onCheckedChange={setShowReadReceipts} />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div className="flex items-center justify-between w-full">
                        <span className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Auto Translate
                        </span>
                        <Switch checked={autoTranslate} onCheckedChange={setAutoTranslate} />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <div className="flex items-center gap-2 w-full">
                        <Type className="h-4 w-4" />
                        <span>Font Size: {fontSize}px</span>
                        <input 
                          type="range" 
                          min="12" 
                          max="18" 
                          value={fontSize} 
                          onChange={(e) => setFontSize(parseInt(e.target.value))}
                          className="flex-1"
                        />
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden p-0 bg-transparent flex">
            {/* Messages Area */}
            <div className="flex-1 flex flex-col">
              {/* Search Bar */}
              {showSearch && (
                <div className="p-4 border-b bg-blue-50 dark:bg-gray-700">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search messages, users, files..."
                        className="pl-10"
                      />
                    </div>
                    <Select value={messageFilter} onValueChange={(value: any) => setMessageFilter(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="unread">Unread</SelectItem>
                        <SelectItem value="mentions">Mentions</SelectItem>
                        <SelectItem value="files">Files</SelectItem>
                        <SelectItem value="media">Media</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}>
                      <SortAsc className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Pinned Messages */}
              {showPinned && pinnedMessages.length > 0 && (
                <div className="border-b bg-amber-50 dark:bg-amber-900/20 border-amber-200">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-amber-800 dark:text-amber-200 flex items-center gap-2">
                        <Pin className="h-4 w-4" />
                        Pinned Messages
                      </h3>
                      <Button variant="ghost" size="sm" onClick={() => setShowPinned(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {pinnedMessages.map((msg) => (
                        <div key={msg.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg border shadow-sm">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-amber-900 dark:text-amber-200 text-sm">{msg.userName}</p>
                              <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">{msg.content}</p>
                            </div>
                            <span className="text-xs text-amber-600 dark:text-amber-400">{formatTime(msg.timestamp)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Bulk Actions Bar */}
              {bulkActionMode && selectedMessages.size > 0 && (
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 border-b flex items-center justify-between">
                  <span className="text-sm font-medium">{selectedMessages.size} messages selected</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Archive className="h-4 w-4 mr-1" />
                      Archive
                    </Button>
                    <Button size="sm" variant="outline">
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => {setBulkActionMode(false); setSelectedMessages(new Set());}}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Upload Progress */}
              {isUploading && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-b">
                  <div className="flex items-center gap-3">
                    <Upload className="h-4 w-4 text-blue-600" />
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Uploading files...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  </div>
                </div>
              )}

              {/* Messages */}
              <ScrollArea className="flex-1 px-4" style={{ fontSize: `${fontSize}px` }}>
                <div className="space-y-4 py-4">
                  {filteredMessages.map((message) => (
                    <div key={message.id} className="group relative animate-fade-in">
                      <div className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-white/50 dark:hover:bg-gray-700/50 ${
                        selectedMessages.has(message.id) ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200' : ''
                      } ${getMessagePriorityColor(message.priority)} border-l-4`}>
                        
                        {/* Selection Checkbox */}
                        {bulkActionMode && (
                          <input
                            type="checkbox"
                            checked={selectedMessages.has(message.id)}
                            onChange={() => toggleMessageSelection(message.id)}
                            className="mt-1"
                          />
                        )}
                        
                        {/* Avatar */}
                        <Avatar className="w-10 h-10 border-2 border-white shadow-md">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                            {message.userName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          {/* Message Header */}
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900 dark:text-gray-100">{message.userName}</span>
                            <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                            
                            {/* Priority Badge */}
                            {message.priority && message.priority !== 'normal' && (
                              <Badge variant={message.priority === 'urgent' ? 'destructive' : 'secondary'} className="text-xs">
                                {message.priority}
                              </Badge>
                            )}
                            
                            {/* Thread Count */}
                            {message.threadCount && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-5 px-2 text-xs"
                                onClick={() => openThread(message.id)}
                              >
                                <MessageCircle className="h-3 w-3 mr-1" />
                                {message.threadCount}
                              </Button>
                            )}
                            
                            {/* Encryption Badge */}
                            {message.isEncrypted && (
                              <Lock className="h-3 w-3 text-green-600" />
                            )}
                            
                            {/* Edited Badge */}
                            {message.isEdited && (
                              <span className="text-xs text-gray-400 italic">(edited)</span>
                            )}
                          </div>
                          
                          {/* Message Content */}
                          <div className="mb-2">
                            {editingMessage === message.id ? (
                              <div className="flex gap-2">
                                <Input
                                  value={editContent}
                                  onChange={(e) => setEditContent(e.target.value)}
                                  className="flex-1"
                                />
                                <Button size="sm" onClick={() => setEditingMessage(null)}>
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => setEditingMessage(null)}>
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <>
                                {/* Text Message */}
                                {message.type === 'text' && (
                                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border">
                                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{message.content}</p>
                                  </div>
                                )}
                                
                                {/* File Message */}
                                {message.type === 'file' && (
                                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border">
                                    <div className="flex items-center gap-3">
                                      <FileText className="h-8 w-8 text-blue-500" />
                                      <div className="flex-1">
                                        <p className="font-medium text-gray-800 dark:text-gray-200">{message.fileName}</p>
                                        <p className="text-sm text-gray-500">{message.fileSize}</p>
                                      </div>
                                      <Button size="sm" variant="outline">
                                        <Download className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    {message.content && (
                                      <p className="mt-2 text-gray-700 dark:text-gray-300">{message.content}</p>
                                    )}
                                  </div>
                                )}
                                
                                {/* Poll Message */}
                                {message.type === 'poll' && message.pollOptions && (
                                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border">
                                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">{message.content}</h4>
                                    <div className="space-y-2">
                                      {message.pollOptions.map((option, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                                          <Button size="sm" variant="outline" className="text-xs">
                                            Vote
                                          </Button>
                                          <span className="flex-1">{option.option}</span>
                                          <span className="text-sm text-gray-500">{option.votes} votes</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                
                                {/* Voice Message */}
                                {message.type === 'voice' && (
                                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border">
                                    <div className="flex items-center gap-3">
                                      <Button size="sm" variant="outline">
                                        <Headphones className="h-4 w-4" />
                                      </Button>
                                      <div className="flex-1 bg-gray-200 dark:bg-gray-600 h-2 rounded-full">
                                        <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
                                      </div>
                                      <span className="text-sm text-gray-500">{message.duration}</span>
                                    </div>
                                  </div>
                                )}
                                
                                {/* System Message */}
                                {message.type === 'system' && (
                                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-3 border-2 border-blue-200 dark:border-blue-600">
                                    <p className="text-blue-900 dark:text-blue-100 font-medium">{message.content}</p>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                          
                          {/* Tags */}
                          {message.tags && message.tags.length > 0 && (
                            <div className="flex gap-1 mb-2">
                              {message.tags.map((tag, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          
                          {/* Reactions */}
                          {message.reactions && message.reactions.length > 0 && (
                            <div className="flex gap-1 mb-2 flex-wrap">
                              {message.reactions.map((reaction, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleReaction(message.id, reaction.emoji)}
                                  className={`text-xs px-2 py-1 rounded-full transition-all flex items-center gap-1 ${
                                    reaction.users.includes(user.id)
                                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border border-blue-300'
                                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border'
                                  }`}
                                >
                                  <span>{reaction.emoji}</span>
                                  <span className="font-medium">{reaction.count}</span>
                                </button>
                              ))}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                                onClick={() => handleReaction(message.id, '👍')}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                          
                          {/* Read Receipts */}
                          {showReadReceipts && message.readBy && message.readBy.length > 0 && (
                            <div className="text-xs text-gray-400 flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              Read by {message.readBy.length} people
                            </div>
                          )}
                        </div>
                        
                        {/* Message Actions */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => setReplyTo(message)}
                          >
                            <Reply className="h-3 w-3" />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => openThread(message.id)}
                          >
                            <MessageCircle className="h-3 w-3" />
                          </Button>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => {setEditingMessage(message.id); setEditContent(message.content);}}>
                                <Edit className="h-3 w-3 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-3 w-3 mr-2" />
                                Copy
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Forward className="h-3 w-3 mr-2" />
                                Forward
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Pin className="h-3 w-3 mr-2" />
                                Pin
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => translateMessage(message.id)}>
                                <Globe className="h-3 w-3 mr-2" />
                                Translate
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
                  ))}
                  
                  {/* Typing Indicator */}
                  {typingUsers.length > 0 && (
                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-4 py-3 rounded-2xl shadow-sm border">
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

              {/* Reply Banner */}
              {replyTo && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 m-4 rounded-r-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Reply className="h-4 w-4 text-blue-600" />
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Replying to {replyTo.userName}</p>
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-300 bg-white/50 p-2 rounded truncate">
                        {replyTo.content}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setReplyTo(null)} className="text-blue-600 hover:bg-blue-100">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Message Input Area */}
              <div className="p-6 bg-white dark:bg-gray-800 border-t">
                {/* Message Templates */}
                <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => insertTemplate("Thanks for sharing!")}
                  >
                    👍 Thanks
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => insertTemplate("Could you please provide more details?")}
                  >
                    ❓ More Info
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => insertTemplate("Great work everyone! 🎉")}
                  >
                    🎉 Great Work
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => insertTemplate("Let's schedule a meeting to discuss this further.")}
                  >
                    📅 Schedule
                  </Button>
                </div>

                {/* Formatting Toolbar */}
                {showFormatting && (
                  <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Button
                        variant={isBold ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setIsBold(!isBold)}
                      >
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={isItalic ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setIsItalic(!isItalic)}
                      >
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Underline className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Code className="h-4 w-4" />
                      </Button>
                      <div className="h-4 w-px bg-gray-300 mx-2"></div>
                      <Button variant="ghost" size="sm">
                        <List className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ListOrdered className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Quote className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSendMessage}>
                  <div className="flex gap-3 items-end">
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                      {/* File Upload */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        onChange={(e) => e.target.files && handleFileUpload(Array.from(e.target.files))}
                        className="hidden"
                      />
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => fileInputRef.current?.click()}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      
                      {/* More Actions */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem onClick={() => setShowPollCreator(true)}>
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Create Poll
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setShowScheduler(true)}>
                            <Clock className="h-4 w-4 mr-2" />
                            Schedule Message
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="h-4 w-4 mr-2" />
                            Create Event
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setBulkActionMode(!bulkActionMode)}>
                            <MousePointer className="h-4 w-4 mr-2" />
                            Select Messages
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    {/* Message Input */}
                    <div className="flex-1 relative">
                      <Textarea
                        ref={messageInputRef}
                        value={newMessage}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder={replyTo ? `Replying to ${replyTo.userName}...` : "Type your message... Use @ to mention, # for tags"}
                        className="min-h-0 resize-none border-2 focus:border-blue-500 rounded-xl pr-24 bg-white dark:bg-gray-700"
                        rows={1}
                        style={{ minHeight: '48px', maxHeight: '120px' }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                          }
                        }}
                      />
                      
                      {/* Input Actions */}
                      <div className="absolute right-3 bottom-3 flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowFormatting(!showFormatting)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Type className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Smile className="h-4 w-4" />
                        </Button>
                        
                        {newMessage.trim() ? (
                          <Button 
                            type="submit"
                            size="sm"
                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full h-9 w-9 p-0 shadow-lg hover:shadow-xl transition-all"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            size="sm"
                            variant={isRecording ? "destructive" : "ghost"}
                            onClick={isRecording ? stopRecording : startRecording}
                            className={isRecording ? "animate-pulse" : ""}
                          >
                            <Mic className="h-4 w-4" />
                            {isRecording && (
                              <span className="ml-1 text-xs">{recordingTime}s</span>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
                
                {/* Input Helper Text */}
                <div className="mt-2 text-xs text-gray-400 flex justify-between">
                  <span>
                    {isRecording ? `Recording... ${recordingTime}s` : "Press Shift + Enter for new line"}
                  </span>
                  <span>@ mention • # hashtag • /command</span>
                </div>
              </div>
            </div>

            {/* Thread Sidebar */}
            {activeThread && (
              <div className="w-80 border-l bg-white dark:bg-gray-800 shadow-lg">
                <div className="p-4 border-b bg-gray-50 dark:bg-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">Thread</h3>
                    <Button variant="ghost" size="sm" onClick={() => setActiveThread(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-3">
                    {threadMessages.map((msg) => (
                      <div key={msg.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="font-medium text-sm">{msg.userName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{msg.content}</p>
                        <span className="text-xs text-gray-400">{formatTime(msg.timestamp)}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t">
                  <Input placeholder="Reply to thread..." />
                </div>
              </div>
            )}

            {/* Online Users Sidebar */}
            {showOnlineUsers && (
              <div className="w-80 border-l bg-white dark:bg-gray-800 shadow-lg">
                <div className="p-4 border-b bg-gray-50 dark:bg-gray-700">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    Online Members (12)
                  </h3>
                </div>
                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-3">
                    {/* ... keep existing online users code */}
                  </div>
                </ScrollArea>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modals */}
        
        {/* Poll Creator */}
        <Dialog open={showPollCreator} onOpenChange={setShowPollCreator}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a Poll</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
                placeholder="What's your question?"
              />
              {pollOptions.map((option, idx) => (
                <Input
                  key={idx}
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...pollOptions];
                    newOptions[idx] = e.target.value;
                    setPollOptions(newOptions);
                  }}
                  placeholder={`Option ${idx + 1}`}
                />
              ))}
              <Button onClick={() => setPollOptions([...pollOptions, ''])}>
                Add Option
              </Button>
              <div className="flex gap-2">
                <Button onClick={createPoll} disabled={!pollQuestion.trim()}>
                  Create Poll
                </Button>
                <Button variant="outline" onClick={() => setShowPollCreator(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Message Scheduler */}
        <Dialog open={showScheduler} onOpenChange={setShowScheduler}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Message</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                rows={3}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                />
                <Input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={scheduleMessage}>
                  Schedule
                </Button>
                <Button variant="outline" onClick={() => setShowScheduler(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default GroupChat;


import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Send, Heart, ThumbsUp, Smile, Reply, MoreHorizontal, 
  ArrowLeft, Search, Share2, Bookmark, Copy, Flag,
  UserPlus, Settings, Phone, Video, Shield, Bell, BellOff, Download,
  Upload, Filter, SortAsc, MessageCircle, Headphones, Camera, FileImage,
  Globe, Lock, Unlock, Palette, Type, AlignLeft, Bold, Italic, Underline,
  Code, Quote, List, ListOrdered, AtSign, MapPin, Slash, MousePointer,
  Layers, Maximize2, Minimize2, RotateCcw, Check, X, Plus, Minus, BarChart,
  Users, Eye, EyeOff, Volume2, VolumeX, Mic, MicOff, ScreenShare, Calendar,
  Star, Pin, Archive, Trash2, Edit, Forward, PaperclipIcon, Image, FileText,
  Monitor, Smartphone, Tablet, Zap, Crown, UserCheck, Clock, Hash, MessageSquare
} from 'lucide-react';
import { User, Group, Message } from '@/types/connectPulse';
import EnhancedChatHeader from './chat/EnhancedChatHeader';
import OnlineUsersList from './chat/OnlineUsersList';
import VideoCallModal from './VideoCallModal';
import { useToast } from '@/hooks/use-toast';

interface GroupChatProps {
  user: User;
  group: Group;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onBack: () => void;
}

const GroupChat: React.FC<GroupChatProps> = ({ user, group, messages, onSendMessage, onBack }) => {
  const [newMessage, setNewMessage] = useState('');
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [isMuted, setIsMuted] = useState(false);
  const [isNotified, setIsNotified] = useState(true);
  const [messageFilter, setMessageFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [reactions, setReactions] = useState<{[key: string]: string[]}>({});
  const [pinnedMessages, setPinnedMessages] = useState<string[]>([]);
  const [bookmarkedMessages, setBookmarkedMessages] = useState<string[]>([]);
  const [messageTranslation, setMessageTranslation] = useState<{[key: string]: string}>({});
  const [showMessageActions, setShowMessageActions] = useState<string | null>(null);
  const [theme, setTheme] = useState('blue');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showReadReceipts, setShowReadReceipts] = useState(true);
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [smartReplies, setSmartReplies] = useState<string[]>([]);
  const [mentionSuggestions, setMentionSuggestions] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Mock data for online users
  const onlineUsers = 7;
  const onlineUsersList = [
    { id: '1', name: 'Sarah Johnson', avatar: 'SJ', status: 'online' },
    { id: '2', name: 'Mike Chen', avatar: 'MC', status: 'online' },
    { id: '3', name: 'Emma Rodriguez', avatar: 'ER', status: 'online' },
    { id: '4', name: 'David Kumar', avatar: 'DK', status: 'away' },
    { id: '5', name: 'Lisa Wong', avatar: 'LW', status: 'online' },
    { id: '6', name: 'Alex Taylor', avatar: 'AT', status: 'busy' },
    { id: '7', name: 'Jordan Smith', avatar: 'JS', status: 'online' }
  ];

  const emojis = ['👍', '❤️', '😂', '😮', '😢', '😡', '🎉', '🔥', '💯', '👏'];
  const themes = ['blue', 'green', 'purple', 'orange', 'pink'];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Generate smart replies based on last message
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.userId !== user.id) {
        setSmartReplies(['Thanks!', 'Sounds good!', 'I agree', 'Tell me more']);
      }
    }
  }, [messages, user.id]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
      setReplyingTo(null);
      if (soundEnabled) {
        // Play send sound
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEaBDSH0fPTgjMGHm7A7+OZURE');
        audio.volume = 0.1;
        audio.play().catch(() => {});
      }
    }
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setReactions(prev => ({
      ...prev,
      [messageId]: prev[messageId]?.includes(emoji) 
        ? prev[messageId].filter(e => e !== emoji)
        : [...(prev[messageId] || []), emoji]
    }));
  };

  const handlePinMessage = (messageId: string) => {
    setPinnedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
    toast({
      title: pinnedMessages.includes(messageId) ? "Message unpinned" : "Message pinned",
      description: pinnedMessages.includes(messageId) ? "Message removed from pinned messages" : "Message added to pinned messages",
    });
  };

  const handleBookmarkMessage = (messageId: string) => {
    setBookmarkedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
    toast({
      title: bookmarkedMessages.includes(messageId) ? "Bookmark removed" : "Message bookmarked",
      description: bookmarkedMessages.includes(messageId) ? "Message removed from bookmarks" : "Message saved to bookmarks",
    });
  };

  const handleTranslateMessage = (messageId: string) => {
    // Mock translation
    const translations = [
      "Hello, how are you?",
      "This is a great idea!",
      "Let's meet tomorrow",
      "Thank you for sharing"
    ];
    const randomTranslation = translations[Math.floor(Math.random() * translations.length)];
    setMessageTranslation(prev => ({
      ...prev,
      [messageId]: randomTranslation
    }));
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Recording started",
        description: "Tap again to stop recording",
      });
    } else {
      toast({
        title: "Voice message sent",
        description: "Your voice message has been sent",
      });
    }
  };

  const handleFileUpload = (type: string) => {
    setShowFileUpload(false);
    toast({
      title: "File uploaded",
      description: `${type} has been uploaded successfully`,
    });
  };

  const filteredMessages = messages.filter(message => {
    if (messageFilter === 'pinned') return pinnedMessages.includes(message.id);
    if (messageFilter === 'bookmarked') return bookmarkedMessages.includes(message.id);
    if (messageFilter === 'media') return message.content.includes('📷') || message.content.includes('🎵');
    if (searchQuery) return message.content.toLowerCase().includes(searchQuery.toLowerCase());
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getThemeColors = (theme: string) => {
    switch (theme) {
      case 'green': return 'from-green-500 to-emerald-600';
      case 'purple': return 'from-purple-500 to-indigo-600';
      case 'orange': return 'from-orange-500 to-red-600';
      case 'pink': return 'from-pink-500 to-rose-600';
      default: return 'from-blue-500 to-indigo-600';
    }
  };

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'} ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Enhanced Header with all features */}
      <EnhancedChatHeader
        group={group}
        onlineUsers={onlineUsers}
        showOnlineUsers={showOnlineUsers}
        onBack={onBack}
        onVideoCall={() => setShowVideoCall(true)}
        onAudioCall={() => toast({ title: "Audio Call", description: "Starting audio call..." })}
        onToggleUsers={() => setShowOnlineUsers(!showOnlineUsers)}
        onSettings={() => setShowSettings(true)}
        onSearch={() => setShowSearch(!showSearch)}
        onInvite={() => toast({ title: "Invite", description: "Invite link copied to clipboard" })}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        isNotified={isNotified}
        onToggleNotifications={() => setIsNotified(!isNotified)}
      />

      {/* Search Bar */}
      {showSearch && (
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex gap-2">
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" onClick={() => setShowSearch(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2 mt-2">
            {['all', 'pinned', 'bookmarked', 'media'].map(filter => (
              <Button
                key={filter}
                variant={messageFilter === filter ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMessageFilter(filter)}
                className="capitalize"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Pinned Messages Bar */}
          {pinnedMessages.length > 0 && (
            <div className="bg-yellow-50 border-b p-2">
              <div className="flex items-center gap-2 text-sm text-yellow-800">
                <Pin className="h-4 w-4" />
                <span>{pinnedMessages.length} pinned message(s)</span>
                <Button variant="ghost" size="sm" onClick={() => setPinnedMessages([])}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4" style={{ fontSize: `${fontSize}px` }}>
            <div className="space-y-4">
              {filteredMessages.map((message) => (
                <div key={message.id} className="group relative">
                  <div className={`flex items-start gap-3 ${message.userId === user.id ? 'flex-row-reverse' : ''}`}>
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className={`bg-gradient-to-r ${getThemeColors(theme)} text-white`}>
                        {message.userId === user.id ? user.name.charAt(0) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className={`flex-1 ${message.userId === user.id ? 'text-right' : ''}`}>
                      {/* Message Header */}
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">
                          {message.userId === user.id ? 'You' : 'Anonymous User'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                        {pinnedMessages.includes(message.id) && (
                          <Pin className="h-3 w-3 text-yellow-600" />
                        )}
                        {bookmarkedMessages.includes(message.id) && (
                          <Bookmark className="h-3 w-3 text-blue-600" />
                        )}
                        {showReadReceipts && (
                          <div className="flex -space-x-1">
                            <div className="w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                            <div className="w-3 h-3 bg-blue-500 rounded-full border border-white"></div>
                          </div>
                        )}
                      </div>

                      {/* Reply Context */}
                      {replyingTo === message.id && (
                        <div className="bg-gray-100 p-2 rounded mb-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Reply className="h-3 w-3" />
                            <span className="text-gray-600">Replying to message</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setReplyingTo(null)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Message Content */}
                      <div className={`p-3 rounded-lg ${
                        message.userId === user.id 
                          ? `bg-gradient-to-r ${getThemeColors(theme)} text-white ml-8` 
                          : 'bg-gray-100 mr-8'
                      }`}>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        
                        {/* Message Translation */}
                        {messageTranslation[message.id] && (
                          <div className="mt-2 p-2 bg-black/10 rounded text-sm">
                            <div className="flex items-center gap-1 mb-1">
                              <Globe className="h-3 w-3" />
                              <span className="text-xs opacity-75">Translation:</span>
                            </div>
                            <p>{messageTranslation[message.id]}</p>
                          </div>
                        )}
                      </div>

                      {/* Message Reactions */}
                      {reactions[message.id] && reactions[message.id].length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {reactions[message.id].map((emoji, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="h-6 px-2 text-xs"
                              onClick={() => handleReaction(message.id, emoji)}
                            >
                              {emoji}
                            </Button>
                          ))}
                        </div>
                      )}

                      {/* Message Actions */}
                      <div className={`opacity-0 group-hover:opacity-100 transition-opacity mt-2 ${
                        message.userId === user.id ? 'text-right' : ''
                      }`}>
                        <div className="flex gap-1">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Smile className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <div className="grid grid-cols-5 gap-1 p-2">
                                {emojis.map(emoji => (
                                  <Button
                                    key={emoji}
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => handleReaction(message.id, emoji)}
                                  >
                                    {emoji}
                                  </Button>
                                ))}
                              </div>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => setReplyingTo(message.id)}
                          >
                            <Reply className="h-3 w-3" />
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => handlePinMessage(message.id)}>
                                <Pin className="h-4 w-4 mr-2" />
                                {pinnedMessages.includes(message.id) ? 'Unpin' : 'Pin'} Message
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleBookmarkMessage(message.id)}>
                                <Bookmark className="h-4 w-4 mr-2" />
                                {bookmarkedMessages.includes(message.id) ? 'Remove' : 'Add'} Bookmark
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleTranslateMessage(message.id)}>
                                <Globe className="h-4 w-4 mr-2" />
                                Translate
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Message
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Forward className="h-4 w-4 mr-2" />
                                Forward
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Flag className="h-4 w-4 mr-2" />
                                Report
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Smart Replies */}
          {smartReplies.length > 0 && (
            <div className="p-2 border-t bg-gray-50">
              <div className="flex gap-2 overflow-x-auto">
                {smartReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setNewMessage(reply);
                      setSmartReplies([]);
                    }}
                    className="whitespace-nowrap"
                  >
                    ⚡ {reply}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Message Input Area */}
          <div className="p-4 border-t bg-white">
            <div className="flex items-end gap-2">
              {/* File Upload */}
              <DropdownMenu open={showFileUpload} onOpenChange={setShowFileUpload}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <PaperclipIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleFileUpload('image')}>
                    <Image className="h-4 w-4 mr-2" />
                    Upload Image
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFileUpload('document')}>
                    <FileText className="h-4 w-4 mr-2" />
                    Upload Document
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFileUpload('video')}>
                    <Video className="h-4 w-4 mr-2" />
                    Upload Video
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Message Input */}
              <div className="flex-1 relative">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`Message ${group.name}...`}
                  className="min-h-[44px] max-h-32 resize-none pr-20"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                
                {/* Input Actions */}
                <div className="absolute right-2 bottom-2 flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleVoiceRecord}
                    className={isRecording ? 'text-red-500' : ''}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>

                {/* Emoji Picker */}
                {showEmojiPicker && (
                  <div className="absolute bottom-full right-0 mb-2 bg-white border rounded-lg shadow-lg p-3">
                    <div className="grid grid-cols-8 gap-1">
                      {emojis.map(emoji => (
                        <Button
                          key={emoji}
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setNewMessage(prev => prev + emoji);
                            setShowEmojiPicker(false);
                          }}
                        >
                          {emoji}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Advanced Actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setShowPollCreator(true)}>
                    <BarChart className="h-4 w-4 mr-2" />
                    Create Poll
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowScheduler(true)}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Message
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MapPin className="h-4 w-4 mr-2" />
                    Share Location
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ScreenShare className="h-4 w-4 mr-2" />
                    Screen Share
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Send Button */}
              <Button 
                onClick={handleSendMessage} 
                disabled={!newMessage.trim()}
                className={`bg-gradient-to-r ${getThemeColors(theme)}`}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Online Users Sidebar */}
        {showOnlineUsers && <OnlineUsersList onlineUsers={onlineUsers} />}
      </div>

      {/* Video Call Modal */}
      <VideoCallModal
        isOpen={showVideoCall}
        onClose={() => setShowVideoCall(false)}
        groupName={group.name}
      />

      {/* Settings Modal */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Chat Settings</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>
            
            <TabsContent value="appearance" className="space-y-4">
              <div className="space-y-2">
                <Label>Theme Color</Label>
                <div className="flex gap-2">
                  {themes.map(themeOption => (
                    <Button
                      key={themeOption}
                      variant={theme === themeOption ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTheme(themeOption)}
                      className={`w-8 h-8 p-0 bg-gradient-to-r ${getThemeColors(themeOption)}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Font Size: {fontSize}px</Label>
                <Slider
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                  min={12}
                  max={20}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Dark Mode</Label>
                <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Show Read Receipts</Label>
                <Switch checked={showReadReceipts} onCheckedChange={setShowReadReceipts} />
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Sound Effects</Label>
                <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Push Notifications</Label>
                <Switch checked={isNotified} onCheckedChange={setIsNotified} />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Mute Group</Label>
                <Switch checked={isMuted} onCheckedChange={setIsMuted} />
              </div>
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Auto Translate</Label>
                <Switch checked={autoTranslate} onCheckedChange={setAutoTranslate} />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Online Status</Label>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Typing Indicators</Label>
                <Switch defaultChecked />
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Fullscreen Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsFullscreen(!isFullscreen)}
        className="fixed bottom-4 right-4 z-40 bg-white shadow-lg"
      >
        {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default GroupChat;

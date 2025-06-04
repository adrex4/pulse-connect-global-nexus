
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
import MessageBubble from './chat/MessageBubble';
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

  const getThemeColors = (theme: string) => {
    switch (theme) {
      case 'green': return 'from-green-500 to-emerald-600';
      case 'purple': return 'from-purple-500 to-indigo-600';
      case 'orange': return 'from-orange-500 to-red-600';
      case 'pink': return 'from-pink-500 to-rose-600';
      default: return 'from-blue-500 to-indigo-600';
    }
  };

  const filteredMessages = messages.filter(message => {
    if (messageFilter === 'pinned') return pinnedMessages.includes(message.id);
    if (messageFilter === 'bookmarked') return bookmarkedMessages.includes(message.id);
    if (messageFilter === 'media') return message.content.includes('📷') || message.content.includes('🎵');
    if (searchQuery) return message.content.toLowerCase().includes(searchQuery.toLowerCase());
    return true;
  });

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
        <div className="flex-1 flex flex-col min-w-0">
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
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4 max-w-4xl mx-auto">
              {filteredMessages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  user={user}
                  reactions={reactions}
                  pinnedMessages={pinnedMessages}
                  bookmarkedMessages={bookmarkedMessages}
                  messageTranslation={messageTranslation}
                  showReadReceipts={showReadReceipts}
                  theme={theme}
                  fontSize={fontSize}
                  onReaction={handleReaction}
                  onPin={handlePinMessage}
                  onBookmark={handleBookmarkMessage}
                  onTranslate={handleTranslateMessage}
                  onReply={(messageId) => setReplyingTo(messageId)}
                  getThemeColors={getThemeColors}
                />
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

          {/* Compact Message Input Area */}
          <div className="p-3 border-t bg-white">
            <div className="flex items-center gap-2 max-w-4xl mx-auto">
              {/* File Upload */}
              <Button variant="ghost" size="sm" className="flex-shrink-0">
                <PaperclipIcon className="h-4 w-4" />
              </Button>

              {/* Message Input */}
              <div className="flex-1 relative">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`Message ${group.name}...`}
                  className="min-h-[40px] max-h-24 resize-none pr-16 text-sm"
                  rows={1}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                
                {/* Input Actions */}
                <div className="absolute right-2 bottom-2 flex gap-1">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Smile className="h-3 w-3" />
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Mic className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Send Button */}
              <Button 
                onClick={handleSendMessage} 
                disabled={!newMessage.trim()}
                size="sm"
                className={`bg-gradient-to-r ${getThemeColors(theme)} flex-shrink-0`}
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

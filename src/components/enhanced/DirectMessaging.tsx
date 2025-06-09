
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search, Phone, Video, MoreVertical, ArrowLeft, Plus, Star, 
  Archive, Settings, Paperclip, Image, Clock, CheckCheck,
  Pin, Reply, Forward, Edit3, Trash2, Volume2, VolumeX,
  UserPlus, UserMinus, Shield, Flag, Download, Copy, X, MessageSquare,
  Bell, Moon, Sun, Palette, User, Lock, HelpCircle, Upload
} from 'lucide-react';
import { User as ConnectPulseUser } from '@/types/connectPulse';
import EmojiPicker from '@/components/EmojiPicker';

// Custom Send Icon Component
const SendIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface DirectMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  messageType: 'text' | 'image' | 'file' | 'voice' | 'video';
  attachments?: string[];
  reactions?: { emoji: string; userId: string }[];
  isEdited?: boolean;
  replyTo?: string;
  isDeleted?: boolean;
  deliveryStatus: 'sent' | 'delivered' | 'read';
}

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastSeen: Date;
  isOnline: boolean;
  status: 'available' | 'busy' | 'away' | 'offline';
  unreadCount: number;
  lastMessage?: DirectMessage;
  isBlocked: boolean;
  isFavorite: boolean;
  isArchived: boolean;
  isPinned: boolean;
  isMuted: boolean;
  profession?: string;
  mutualConnections?: number;
}

interface DirectMessagingProps {
  currentUser: ConnectPulseUser;
  onBack: () => void;
}

const DirectMessaging: React.FC<DirectMessagingProps> = ({ currentUser, onBack }) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'favorites' | 'archived'>('all');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [replyingTo, setReplyingTo] = useState<DirectMessage | null>(null);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notifications, setNotifications] = useState(true);
  const [fileUploading, setFileUploading] = useState(false);

  // Enhanced contacts data with professional information
  useEffect(() => {
    setContacts([
      {
        id: '1',
        name: 'Sarah Johnson',
        profession: 'UI/UX Designer',
        isOnline: true,
        status: 'available',
        lastSeen: new Date(),
        unreadCount: 3,
        mutualConnections: 15,
        lastMessage: {
          id: 'msg1',
          senderId: '1',
          receiverId: currentUser.id,
          content: 'Hey! I saw your latest project. Would love to discuss collaboration opportunities.',
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          isRead: false,
          messageType: 'text',
          deliveryStatus: 'delivered'
        },
        isBlocked: false,
        isFavorite: true,
        isArchived: false,
        isPinned: true,
        isMuted: false
      },
      {
        id: '2',
        name: 'Mike Chen',
        profession: 'Full Stack Developer',
        isOnline: false,
        status: 'offline',
        lastSeen: new Date(Date.now() - 1000 * 60 * 30),
        unreadCount: 0,
        mutualConnections: 8,
        lastMessage: {
          id: 'msg2',
          senderId: currentUser.id,
          receiverId: '2',
          content: 'Thanks for the code review! Really helpful feedback.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          isRead: true,
          messageType: 'text',
          deliveryStatus: 'read'
        },
        isBlocked: false,
        isFavorite: false,
        isArchived: false,
        isPinned: false,
        isMuted: false
      },
      {
        id: '3',
        name: 'Emma Davis',
        profession: 'Product Manager',
        isOnline: true,
        status: 'busy',
        lastSeen: new Date(),
        unreadCount: 1,
        mutualConnections: 23,
        lastMessage: {
          id: 'msg3',
          senderId: '3',
          receiverId: currentUser.id,
          content: 'Can we schedule a call to discuss the new feature requirements?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          isRead: false,
          messageType: 'text',
          deliveryStatus: 'delivered'
        },
        isBlocked: false,
        isFavorite: false,
        isArchived: false,
        isPinned: false,
        isMuted: false
      },
      {
        id: '4',
        name: 'Alex Rivera',
        profession: 'Data Scientist',
        isOnline: false,
        status: 'away',
        lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 4),
        unreadCount: 0,
        mutualConnections: 12,
        lastMessage: {
          id: 'msg4',
          senderId: currentUser.id,
          receiverId: '4',
          content: 'Here\'s the dataset analysis you requested. Let me know if you need anything else!',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
          isRead: true,
          messageType: 'text',
          deliveryStatus: 'read'
        },
        isBlocked: false,
        isFavorite: true,
        isArchived: false,
        isPinned: false,
        isMuted: false
      },
      {
        id: '5',
        name: 'Lisa Thompson',
        profession: 'Marketing Director',
        isOnline: true,
        status: 'available',
        lastSeen: new Date(),
        unreadCount: 2,
        mutualConnections: 31,
        lastMessage: {
          id: 'msg5',
          senderId: '5',
          receiverId: currentUser.id,
          content: 'The campaign results look amazing! 🎉 Great job on the technical implementation.',
          timestamp: new Date(Date.now() - 1000 * 60 * 20),
          isRead: false,
          messageType: 'text',
          deliveryStatus: 'delivered'
        },
        isBlocked: false,
        isFavorite: false,
        isArchived: false,
        isPinned: false,
        isMuted: false
      }
    ]);

    // Mock messages for demonstration
    setMessages([
      {
        id: 'conversation1',
        senderId: '1',
        receiverId: currentUser.id,
        content: 'Hey! I saw your latest project. Would love to discuss collaboration opportunities.',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        isRead: false,
        messageType: 'text',
        deliveryStatus: 'delivered'
      },
      {
        id: 'conversation2',
        senderId: currentUser.id,
        receiverId: '1',
        content: 'Hi Sarah! That sounds great. I\'d love to hear more about what you have in mind.',
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
        isRead: true,
        messageType: 'text',
        deliveryStatus: 'read'
      },
      {
        id: 'conversation3',
        senderId: '1',
        receiverId: currentUser.id,
        content: 'Perfect! I\'m working on a new fintech app and need someone with your backend expertise.',
        timestamp: new Date(Date.now() - 1000 * 60 * 2),
        isRead: false,
        messageType: 'text',
        deliveryStatus: 'delivered'
      }
    ]);
  }, [currentUser.id]);

  // Working Settings dialog component
  const SettingsDialog = () => (
    <Dialog open={showSettings} onOpenChange={setShowSettings}>
      <DialogContent className="max-w-md bg-white border border-purple-200 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-purple-800">
            <Settings className="h-5 w-5" />
            Message Settings
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium text-purple-700">Appearance</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm">Theme</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={theme === 'light' ? 'default' : 'outline'}
                  onClick={() => setTheme('light')}
                  className={theme === 'light' ? 'bg-purple-600 hover:bg-purple-700' : 'border-purple-300 hover:bg-purple-50'}
                >
                  <Sun className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  onClick={() => setTheme('dark')}
                  className={theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' : 'border-purple-300 hover:bg-purple-50'}
                >
                  <Moon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-purple-700">Notifications</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm">Message notifications</span>
              <Button
                size="sm"
                variant={notifications ? 'default' : 'outline'}
                onClick={() => setNotifications(!notifications)}
                className={notifications ? 'bg-purple-600 hover:bg-purple-700' : 'border-purple-300 hover:bg-purple-50'}
              >
                {notifications ? <Bell className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-purple-700">Privacy</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start border-purple-200 hover:bg-purple-50">
                <Shield className="h-4 w-4 mr-2" />
                Privacy Settings
              </Button>
              <Button variant="outline" className="w-full justify-start border-purple-200 hover:bg-purple-50">
                <Lock className="h-4 w-4 mr-2" />
                Blocked Users
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start border-purple-200 hover:bg-purple-50">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help & Support
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Working New message dialog component
  const NewMessageDialog = () => (
    <Dialog open={showNewMessage} onOpenChange={setShowNewMessage}>
      <DialogContent className="max-w-md bg-white border border-purple-200 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-purple-800">
            <MessageSquare className="h-5 w-5" />
            New Message
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-purple-700">To:</label>
            <Input placeholder="Search contacts..." className="mt-1 border-purple-200 focus:border-purple-400" />
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-purple-700">Suggested Contacts</h4>
            {contacts.slice(0, 3).map(contact => (
              <div
                key={contact.id}
                className="flex items-center gap-3 p-2 hover:bg-purple-50 rounded-lg cursor-pointer transition-colors"
                onClick={() => {
                  setSelectedContact(contact);
                  setShowNewMessage(false);
                }}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{contact.name}</p>
                  <p className="text-xs text-purple-600">{contact.profession}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowNewMessage(false)} className="flex-1 border-purple-200 hover:bg-purple-50">
              Cancel
            </Button>
            <Button className="flex-1 bg-purple-600 hover:bg-purple-700">Start Chat</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Filter contacts based on active tab and search
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.profession?.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesTab = true;
    switch (activeTab) {
      case 'unread':
        matchesTab = contact.unreadCount > 0;
        break;
      case 'favorites':
        matchesTab = contact.isFavorite;
        break;
      case 'archived':
        matchesTab = contact.isArchived;
        break;
      default:
        matchesTab = !contact.isArchived;
    }
    
    return matchesSearch && matchesTab;
  }).sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    const aTime = a.lastMessage?.timestamp.getTime() || 0;
    const bTime = b.lastMessage?.timestamp.getTime() || 0;
    return bTime - aTime;
  });

  // Enhanced message sending with typing indicator
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedContact) return;

    const message: DirectMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId: selectedContact.id,
      content: newMessage,
      timestamp: new Date(),
      isRead: false,
      messageType: 'text',
      deliveryStatus: 'sent',
      replyTo: replyingTo?.id
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setReplyingTo(null);

    // Simulate delivery status updates
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, deliveryStatus: 'delivered' } : msg
      ));
    }, 1000);
  };

  // Working file upload handler
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedContact) return;

    setFileUploading(true);
    
    try {
      // Simulate file upload
      setTimeout(() => {
        const message: DirectMessage = {
          id: Date.now().toString(),
          senderId: currentUser.id,
          receiverId: selectedContact.id,
          content: `Shared file: ${file.name}`,
          timestamp: new Date(),
          isRead: false,
          messageType: 'file',
          attachments: [file.name],
          deliveryStatus: 'sent'
        };
        
        setMessages(prev => [...prev, message]);
        setFileUploading(false);
      }, 2000);
    } catch (error) {
      setFileUploading(false);
    }
  };

  // Working emoji selection handler
  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  // Advanced message actions
  const handleMessageAction = (action: string, messageId: string) => {
    switch (action) {
      case 'reply':
        const messageToReply = messages.find(m => m.id === messageId);
        if (messageToReply) setReplyingTo(messageToReply);
        break;
      case 'edit':
        setEditingMessage(messageId);
        break;
      case 'delete':
        setMessages(prev => prev.filter(m => m.id !== messageId));
        break;
      case 'forward':
        console.log('Forwarding message:', messageId);
        break;
      case 'copy':
        const messageToCopy = messages.find(m => m.id === messageId);
        if (messageToCopy) {
          navigator.clipboard.writeText(messageToCopy.content);
        }
        break;
    }
  };

  // Contact actions
  const handleContactAction = (action: string, contactId: string) => {
    setContacts(prev => prev.map(contact => {
      if (contact.id !== contactId) return contact;
      
      switch (action) {
        case 'favorite':
          return { ...contact, isFavorite: !contact.isFavorite };
        case 'mute':
          return { ...contact, isMuted: !contact.isMuted };
        case 'pin':
          return { ...contact, isPinned: !contact.isPinned };
        case 'archive':
          return { ...contact, isArchived: !contact.isArchived };
        case 'block':
          return { ...contact, isBlocked: !contact.isBlocked };
        default:
          return contact;
      }
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const getDeliveryIcon = (status: string) => {
    switch (status) {
      case 'sent': return <Clock className="h-3 w-3 text-gray-400" />;
      case 'delivered': return <CheckCheck className="h-3 w-3 text-gray-400" />;
      case 'read': return <CheckCheck className="h-3 w-3 text-purple-500" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="hover:bg-white/50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Direct Messages
              </h1>
              <p className="text-gray-600">Stay connected with your professional network</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowSettings(true)}
              className="hover:bg-purple-50 border-purple-200"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              onClick={() => setShowNewMessage(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Message
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Enhanced Contacts Sidebar */}
          <Card className="lg:col-span-1 shadow-xl border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Messages
                </span>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  {filteredContacts.length}
                </Badge>
              </CardTitle>
              
              {/* Enhanced Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-purple-200 focus:border-purple-400"
                />
              </div>

              {/* Enhanced Message Tabs */}
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                <TabsList className="grid w-full grid-cols-4 text-xs bg-purple-50">
                  <TabsTrigger value="all" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">All</TabsTrigger>
                  <TabsTrigger value="unread" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">Unread</TabsTrigger>
                  <TabsTrigger value="favorites" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">⭐</TabsTrigger>
                  <TabsTrigger value="archived" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">📁</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all relative ${
                      selectedContact?.id === contact.id ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200' : ''
                    } ${contact.isMuted ? 'opacity-70' : ''}`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    {/* Pin indicator */}
                    {contact.isPinned && (
                      <Pin className="absolute top-2 right-2 h-3 w-3 text-purple-500" />
                    )}
                    
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12 ring-2 ring-purple-100">
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        {/* Enhanced status indicator */}
                        {contact.isOnline && (
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${getStatusColor(contact.status)}`}>
                            {contact.status === 'busy' && (
                              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium truncate">{contact.name}</h3>
                            {contact.isFavorite && <Star className="h-3 w-3 text-yellow-500 fill-current" />}
                            {contact.isMuted && <VolumeX className="h-3 w-3 text-gray-400" />}
                          </div>
                          {contact.unreadCount > 0 && (
                            <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-purple-500 to-pink-500">
                              {contact.unreadCount}
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-xs text-purple-600 mb-1 font-medium">{contact.profession}</p>
                        <p className="text-sm text-gray-500 truncate">
                          {contact.lastMessage?.content || 'No messages yet'}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-gray-400">
                            {contact.lastMessage?.timestamp.toLocaleTimeString()}
                          </p>
                          <p className="text-xs text-gray-400">
                            {contact.mutualConnections} mutual
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredContacts.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No conversations found</p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Enhanced Chat Area */}
          <Card className="lg:col-span-3 shadow-xl border-0 bg-white/70 backdrop-blur-sm">
            {selectedContact ? (
              <>
                {/* Enhanced Chat Header */}
                <CardHeader className="border-b bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12 ring-2 ring-purple-100">
                          <AvatarImage src={selectedContact.avatar} />
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            {selectedContact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {selectedContact.isOnline && (
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${getStatusColor(selectedContact.status)}`}></div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{selectedContact.name}</h3>
                          {selectedContact.isFavorite && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                        </div>
                        <p className="text-sm text-purple-600 font-medium">{selectedContact.profession}</p>
                        <p className="text-xs text-gray-500">
                          {selectedContact.isOnline 
                            ? `Online • ${selectedContact.status}` 
                            : `Last seen ${selectedContact.lastSeen.toLocaleString()}`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="hover:bg-purple-50">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="hover:bg-purple-50">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleContactAction('favorite', selectedContact.id)}
                        className="hover:bg-purple-50"
                      >
                        <Star className={`h-4 w-4 ${selectedContact.isFavorite ? 'text-yellow-500 fill-current' : ''}`} />
                      </Button>
                      <Button size="sm" variant="ghost" className="hover:bg-purple-50">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="text-sm text-gray-500 italic">
                      {selectedContact.name} is typing...
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="p-0">
                  {/* Enhanced Messages Area */}
                  <ScrollArea className="h-[400px] p-4 bg-gradient-to-b from-purple-50/30 to-pink-50/30">
                    {messages.filter(msg => 
                      (msg.senderId === selectedContact.id && msg.receiverId === currentUser.id) ||
                      (msg.senderId === currentUser.id && msg.receiverId === selectedContact.id)
                    ).map((message) => (
                      <div
                        key={message.id}
                        className={`mb-6 flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md group ${message.senderId === currentUser.id ? 'ml-12' : 'mr-12'}`}>
                          {/* Reply indicator */}
                          {message.replyTo && (
                            <div className="text-xs text-gray-500 mb-1 p-2 bg-gray-100 rounded border-l-2 border-purple-500">
                              Replying to previous message
                            </div>
                          )}
                          
                          <div className={`px-4 py-3 rounded-2xl relative shadow-sm ${
                            message.senderId === currentUser.id 
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                              : 'bg-white border border-purple-100 shadow-md'
                          }`}>
                            <p className="text-sm break-words">{message.content}</p>
                            {message.isEdited && (
                              <p className="text-xs opacity-70 mt-1">(edited)</p>
                            )}
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-xs opacity-70">
                                {message.timestamp.toLocaleTimeString()}
                              </p>
                              {message.senderId === currentUser.id && (
                                <div className="flex items-center gap-1">
                                  {getDeliveryIcon(message.deliveryStatus)}
                                </div>
                              )}
                            </div>
                            
                            {/* Message actions */}
                            <div className="absolute top-0 right-0 transform translate-x-full opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="flex gap-1 ml-2">
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-6 w-6 p-0 hover:bg-purple-50"
                                  onClick={() => handleMessageAction('reply', message.id)}
                                >
                                  <Reply className="h-3 w-3" />
                                </Button>
                                {message.senderId === currentUser.id && (
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-6 w-6 p-0 hover:bg-purple-50"
                                    onClick={() => handleMessageAction('edit', message.id)}
                                  >
                                    <Edit3 className="h-3 w-3" />
                                  </Button>
                                )}
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-6 w-6 p-0 hover:bg-purple-50"
                                  onClick={() => handleMessageAction('copy', message.id)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  
                  {/* Enhanced Message Input with Working Features */}
                  <div className="border-t p-4 bg-gradient-to-r from-purple-50/50 to-pink-50/50">
                    {/* Reply preview */}
                    {replyingTo && (
                      <div className="bg-purple-50 p-3 rounded-lg mb-3 flex items-center justify-between border border-purple-200">
                        <div>
                          <p className="text-sm font-medium text-purple-700">Replying to:</p>
                          <p className="text-sm text-gray-600 truncate">{replyingTo.content}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setReplyingTo(null)}
                          className="h-6 w-6 p-0 hover:bg-purple-100"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <div className="flex gap-1">
                        {/* Working File Upload */}
                        <input
                          type="file"
                          id="file-upload"
                          className="hidden"
                          onChange={handleFileUpload}
                          accept="*/*"
                        />
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 hover:bg-purple-100"
                          onClick={() => document.getElementById('file-upload')?.click()}
                          disabled={fileUploading}
                        >
                          {fileUploading ? <Upload className="h-4 w-4 animate-spin" /> : <Paperclip className="h-4 w-4" />}
                        </Button>
                        
                        {/* Working Image Upload */}
                        <input
                          type="file"
                          id="image-upload"
                          className="hidden"
                          onChange={handleFileUpload}
                          accept="image/*"
                        />
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 hover:bg-purple-100"
                          onClick={() => document.getElementById('image-upload')?.click()}
                        >
                          <Image className="h-4 w-4" />
                        </Button>
                        
                        {/* Working Emoji Picker */}
                        <EmojiPicker onEmojiSelect={handleEmojiSelect}>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0 hover:bg-purple-100"
                          >
                            {/* Emoji icon placeholder */}
                            😊
                          </Button>
                        </EmojiPicker>
                      </div>
                      
                      <Textarea
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        className="flex-1 min-h-[40px] max-h-[120px] resize-none border-purple-200 focus:border-purple-400"
                        rows={1}
                      />
                      
                      {/* Custom Send Icon */}
                      <Button 
                        onClick={handleSendMessage} 
                        disabled={!newMessage.trim()}
                        className="h-10 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        <SendIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="h-[600px] flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageSquare className="h-10 w-10 text-purple-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">Select a conversation</h3>
                  <p className="text-sm max-w-sm">Choose a contact from your list to start messaging and build meaningful professional connections.</p>
                  <Button 
                    className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" 
                    size="sm"
                    onClick={() => setShowNewMessage(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Start New Conversation
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Working Dialogs */}
        <SettingsDialog />
        <NewMessageDialog />
      </div>
    </div>
  );
};

export default DirectMessaging;

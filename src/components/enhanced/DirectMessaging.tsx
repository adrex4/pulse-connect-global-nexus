
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, Send, Phone, Video, MoreVertical, ArrowLeft, Plus, Star, 
  Archive, Settings, Paperclip, Image, Smile, Clock, CheckCheck,
  Pin, Reply, Forward, Edit3, Trash2, Volume2, VolumeX,
  UserPlus, UserMinus, Shield, Flag, Download, Copy
} from 'lucide-react';
import { User } from '@/types/connectPulse';

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
  currentUser: User;
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
    // Sort by pinned first, then by last message time
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
      case 'read': return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Direct Messages</h1>
              <p className="text-gray-600">Stay connected with your professional network</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Message
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Enhanced Contacts Sidebar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Messages
                <Badge variant="secondary">{filteredContacts.length}</Badge>
              </CardTitle>
              
              {/* Enhanced Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Message Tabs */}
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                <TabsList className="grid w-full grid-cols-4 text-xs">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="favorites">⭐</TabsTrigger>
                  <TabsTrigger value="archived">📁</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors relative ${
                      selectedContact?.id === contact.id ? 'bg-blue-50 border-blue-200' : ''
                    } ${contact.isMuted ? 'opacity-70' : ''}`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    {/* Pin indicator */}
                    {contact.isPinned && (
                      <Pin className="absolute top-2 right-2 h-3 w-3 text-blue-500" />
                    )}
                    
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
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
                            <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                              {contact.unreadCount}
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-xs text-blue-600 mb-1">{contact.profession}</p>
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
          <Card className="lg:col-span-3">
            {selectedContact ? (
              <>
                {/* Enhanced Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={selectedContact.avatar} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
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
                        <p className="text-sm text-blue-600">{selectedContact.profession}</p>
                        <p className="text-xs text-gray-500">
                          {selectedContact.isOnline 
                            ? `Online • ${selectedContact.status}` 
                            : `Last seen ${selectedContact.lastSeen.toLocaleString()}`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleContactAction('favorite', selectedContact.id)}
                      >
                        <Star className={`h-4 w-4 ${selectedContact.isFavorite ? 'text-yellow-500 fill-current' : ''}`} />
                      </Button>
                      <Button size="sm" variant="ghost">
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
                  <ScrollArea className="h-[400px] p-4">
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
                            <div className="text-xs text-gray-500 mb-1 p-2 bg-gray-100 rounded border-l-2 border-blue-500">
                              Replying to previous message
                            </div>
                          )}
                          
                          <div className={`px-4 py-3 rounded-2xl relative ${
                            message.senderId === currentUser.id 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-white border shadow-sm'
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
                                  className="h-6 w-6 p-0"
                                  onClick={() => handleMessageAction('reply', message.id)}
                                >
                                  <Reply className="h-3 w-3" />
                                </Button>
                                {message.senderId === currentUser.id && (
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-6 w-6 p-0"
                                    onClick={() => handleMessageAction('edit', message.id)}
                                  >
                                    <Edit3 className="h-3 w-3" />
                                  </Button>
                                )}
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-6 w-6 p-0"
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
                  
                  {/* Enhanced Message Input */}
                  <div className="border-t p-4">
                    {/* Reply preview */}
                    {replyingTo && (
                      <div className="bg-gray-50 p-3 rounded-lg mb-3 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Replying to:</p>
                          <p className="text-sm text-gray-600 truncate">{replyingTo.content}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setReplyingTo(null)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Image className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0"
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        >
                          <Smile className="h-4 w-4" />
                        </Button>
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
                        className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                        rows={1}
                      />
                      
                      <Button 
                        onClick={handleSendMessage} 
                        disabled={!newMessage.trim()}
                        className="h-10 px-4"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="h-[600px] flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageSquare className="h-10 w-10 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">Select a conversation</h3>
                  <p className="text-sm max-w-sm">Choose a contact from your list to start messaging and build meaningful professional connections.</p>
                  <Button className="mt-4" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Start New Conversation
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DirectMessaging;


import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, Plus, Phone, Video, MoreHorizontal, Smile, Paperclip, 
  Send, Star, Archive, Trash2, Flag, Reply, Forward, Copy, 
  Edit, Check, CheckCheck, Clock, Eye, EyeOff, Volume2, VolumeX,
  Image, File, Calendar, MapPin, Heart, ThumbsUp, Zap, Gift,
  Settings, Filter, Download, Upload, Lock, Unlock, Users, User,
  MessageCircle
} from 'lucide-react';
import { User as UserType } from '@/types/connectPulse';

interface DirectMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  messageType: 'text' | 'image' | 'file' | 'voice' | 'video' | 'location' | 'contact';
  attachments?: string[];
  reactions?: { emoji: string; userId: string; count: number }[];
  isEdited?: boolean;
  replyTo?: string;
  isDeleted?: boolean;
  deliveryStatus: 'sent' | 'delivered' | 'read';
  isForwarded?: boolean;
  priority: 'normal' | 'high' | 'urgent';
  expiresAt?: Date;
  isStarred?: boolean;
  mentions?: string[];
  tags?: string[];
}

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastSeen: Date;
  isOnline: boolean;
  status: 'available' | 'busy' | 'away' | 'offline' | 'invisible';
  unreadCount: number;
  lastMessage?: DirectMessage;
  isBlocked: boolean;
  isFavorite: boolean;
  isArchived: boolean;
  groups: string[];
  customRingtone?: string;
  notificationsEnabled: boolean;
  relationship: 'friend' | 'colleague' | 'family' | 'stranger';
  location?: string;
  timezone?: string;
}

interface DirectMessagingProps {
  user: UserType;
}

const DirectMessaging: React.FC<DirectMessagingProps> = ({ user }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [messageFilter, setMessageFilter] = useState<'all' | 'unread' | 'favorites' | 'archived'>('all');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [replyingTo, setReplyingTo] = useState<DirectMessage | null>(null);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [encryptionEnabled, setEncryptionEnabled] = useState(false);
  const [autoDeleteEnabled, setAutoDeleteEnabled] = useState(false);
  const [activeCall, setActiveCall] = useState<{ type: 'voice' | 'video'; contactId: string } | null>(null);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [drafts, setDrafts] = useState<{ [contactId: string]: string }>({});
  const [scheduledMessages, setScheduledMessages] = useState<DirectMessage[]>([]);
  const [pinnedMessages, setPinnedMessages] = useState<string[]>([]);
  const [messageTranslation, setMessageTranslation] = useState<{ [messageId: string]: string }>({});
  const [showReadReceipts, setShowReadReceipts] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [lastSeenPrivacy, setLastSeenPrivacy] = useState<'everyone' | 'contacts' | 'nobody'>('contacts');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initialize with sample contacts and messages
  useEffect(() => {
    const sampleContacts: Contact[] = [
      {
        id: '1',
        name: 'Alice Johnson',
        avatar: undefined,
        lastSeen: new Date(Date.now() - 1000 * 60 * 5),
        isOnline: true,
        status: 'available',
        unreadCount: 2,
        isBlocked: false,
        isFavorite: true,
        isArchived: false,
        groups: ['work', 'friends'],
        notificationsEnabled: true,
        relationship: 'colleague',
        location: 'New York, USA',
        timezone: 'EST'
      },
      {
        id: '2',
        name: 'Bob Smith',
        avatar: undefined,
        lastSeen: new Date(Date.now() - 1000 * 60 * 30),
        isOnline: false,
        status: 'away',
        unreadCount: 0,
        isBlocked: false,
        isFavorite: false,
        isArchived: false,
        groups: ['work'],
        notificationsEnabled: true,
        relationship: 'colleague',
        location: 'Los Angeles, USA',
        timezone: 'PST'
      },
      {
        id: '3',
        name: 'Carol Williams',
        avatar: undefined,
        lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2),
        isOnline: true,
        status: 'busy',
        unreadCount: 1,
        isBlocked: false,
        isFavorite: true,
        isArchived: false,
        groups: ['family'],
        notificationsEnabled: true,
        relationship: 'family',
        location: 'Chicago, USA',
        timezone: 'CST'
      }
    ];

    const sampleMessages: DirectMessage[] = [
      {
        id: 'm1',
        senderId: '1',
        receiverId: user.id,
        content: 'Hey! How are you doing today?',
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        isRead: false,
        messageType: 'text',
        deliveryStatus: 'delivered',
        priority: 'normal',
        reactions: [{ emoji: '👍', userId: user.id, count: 1 }]
      },
      {
        id: 'm2',
        senderId: user.id,
        receiverId: '1',
        content: 'I\'m doing great! Just working on some new projects.',
        timestamp: new Date(Date.now() - 1000 * 60 * 8),
        isRead: true,
        messageType: 'text',
        deliveryStatus: 'read',
        priority: 'normal'
      },
      {
        id: 'm3',
        senderId: '1',
        receiverId: user.id,
        content: 'That sounds exciting! Would love to hear more about it.',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        isRead: false,
        messageType: 'text',
        deliveryStatus: 'delivered',
        priority: 'normal',
        isStarred: true
      }
    ];

    setContacts(sampleContacts);
    setMessages(sampleMessages);
  }, [user.id]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Filter contacts based on search and filter criteria
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      messageFilter === 'all' ||
      (messageFilter === 'unread' && contact.unreadCount > 0) ||
      (messageFilter === 'favorites' && contact.isFavorite) ||
      (messageFilter === 'archived' && contact.isArchived);
    return matchesSearch && matchesFilter;
  });

  // Get messages for selected contact
  const contactMessages = selectedContact 
    ? messages.filter(msg => 
        (msg.senderId === selectedContact.id && msg.receiverId === user.id) ||
        (msg.senderId === user.id && msg.receiverId === selectedContact.id)
      ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
    : [];

  // Send message function
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const message: DirectMessage = {
      id: Date.now().toString(),
      senderId: user.id,
      receiverId: selectedContact.id,
      content: newMessage,
      timestamp: new Date(),
      isRead: false,
      messageType: 'text',
      deliveryStatus: 'sent',
      priority: 'normal',
      replyTo: replyingTo?.id
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setReplyingTo(null);
    
    if (soundEnabled) {
      // Play send sound
    }

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id 
          ? { ...msg, deliveryStatus: 'delivered' }
          : msg
      ));
    }, 1000);
  };

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      case 'invisible': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  // Emoji reactions
  const quickEmojis = ['👍', '❤️', '😂', '😮', '😢', '😡', '🎉', '🔥'];

  // Message actions
  const handleReaction = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions || [];
        const existingReaction = reactions.find(r => r.emoji === emoji && r.userId === user.id);
        
        if (existingReaction) {
          return {
            ...msg,
            reactions: reactions.filter(r => !(r.emoji === emoji && r.userId === user.id))
          };
        } else {
          return {
            ...msg,
            reactions: [...reactions, { emoji, userId: user.id, count: 1 }]
          };
        }
      }
      return msg;
    }));
  };

  const handleStarMessage = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isStarred: !msg.isStarred }
        : msg
    ));
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isDeleted: true, content: 'This message was deleted' }
        : msg
    ));
  };

  return (
    <div className={`h-[600px] flex border rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
      {/* Contacts Sidebar */}
      <div className="w-80 border-r">
        {/* Header */}
        <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Messages</h2>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                <Plus className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-gray-300"
            />
          </div>
          
          {/* Filters */}
          <div className="flex gap-1 mt-3">
            {[
              { id: 'all', label: 'All', icon: Users },
              { id: 'unread', label: 'Unread', icon: Eye },
              { id: 'favorites', label: 'Favorites', icon: Star },
              { id: 'archived', label: 'Archived', icon: Archive }
            ].map((filter) => {
              const Icon = filter.icon;
              return (
                <Button
                  key={filter.id}
                  size="sm"
                  variant={messageFilter === filter.id ? 'secondary' : 'ghost'}
                  onClick={() => setMessageFilter(filter.id as any)}
                  className="text-xs text-white hover:bg-white/20"
                >
                  <Icon className="h-3 w-3 mr-1" />
                  {filter.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Contacts List */}
        <ScrollArea className="flex-1">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedContact?.id === contact.id ? 'bg-blue-50 border-blue-200' : ''
              } ${isDarkMode ? 'hover:bg-gray-800 border-gray-700' : ''}`}
              onClick={() => setSelectedContact(contact)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {contact.isOnline && (
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(contact.status)} border-2 border-white rounded-full`}></div>
                  )}
                  {contact.isFavorite && (
                    <Star className="absolute -top-1 -left-1 w-4 h-4 text-yellow-500 fill-current" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{contact.name}</h3>
                    <div className="flex items-center gap-1">
                      {contact.unreadCount > 0 && (
                        <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                          {contact.unreadCount}
                        </Badge>
                      )}
                      {contact.lastMessage && (
                        <span className="text-xs text-gray-500">
                          {contact.lastMessage.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500 truncate">
                      {contact.lastMessage?.content || 'No messages yet'}
                    </p>
                    {contact.lastMessage?.isStarred && (
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {contact.relationship}
                    </Badge>
                    {!contact.notificationsEnabled && (
                      <VolumeX className="w-3 h-3 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={selectedContact.avatar} />
                      <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(selectedContact.status)} border-2 border-white rounded-full`}></div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedContact.name}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedContact.isOnline ? (
                        isTyping ? 'Typing...' : `${selectedContact.status}`
                      ) : (
                        `Last seen ${selectedContact.lastSeen.toLocaleString()}`
                      )}
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
                  <Button size="sm" variant="ghost" onClick={() => setShowContactInfo(!showContactInfo)}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {contactMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md group relative ${
                      message.senderId === user.id 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700'
                    } rounded-lg px-4 py-2 ${message.isDeleted ? 'opacity-50 italic' : ''}`}>
                      {message.replyTo && (
                        <div className="text-xs opacity-70 border-l-2 pl-2 mb-2">
                          Replying to previous message
                        </div>
                      )}
                      
                      <p className="text-sm">{message.content}</p>
                      
                      {message.reactions && message.reactions.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {message.reactions.map((reaction, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {reaction.emoji} {reaction.count}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        <div className="flex items-center gap-1">
                          {message.isStarred && (
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          )}
                          {message.senderId === user.id && (
                            <>
                              {message.deliveryStatus === 'sent' && <Check className="w-3 h-3" />}
                              {message.deliveryStatus === 'delivered' && <CheckCheck className="w-3 h-3" />}
                              {message.deliveryStatus === 'read' && <CheckCheck className="w-3 h-3 text-blue-400" />}
                            </>
                          )}
                        </div>
                      </div>
                      
                      {/* Message Actions */}
                      <div className="absolute -top-8 right-0 hidden group-hover:flex bg-white dark:bg-gray-800 border rounded-lg shadow-lg p-1 gap-1">
                        <Button size="sm" variant="ghost" onClick={() => handleReaction(message.id, '👍')}>
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setReplyingTo(message)}>
                          <Reply className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleStarMessage(message.id)}>
                          <Star className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDeleteMessage(message.id)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              {replyingTo && (
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded mb-2 text-sm">
                  <p className="font-medium">Replying to:</p>
                  <p className="text-gray-600 dark:text-gray-300 truncate">{replyingTo.content}</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setReplyingTo(null)}
                    className="h-6 w-6 p-0 ml-2"
                  >
                    <Check className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              <div className="flex gap-2">
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                
                <Textarea
                  ref={inputRef}
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1 min-h-[40px] max-h-[120px]"
                  rows={1}
                />
                
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              {showEmojiPicker && (
                <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex gap-2">
                    {quickEmojis.map((emoji) => (
                      <Button
                        key={emoji}
                        size="sm"
                        variant="ghost"
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
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Select a conversation</p>
              <p className="text-sm">Choose a contact to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* Contact Info Sidebar */}
      {showContactInfo && selectedContact && (
        <div className="w-80 border-l bg-gray-50 dark:bg-gray-900 p-4">
          <div className="text-center mb-6">
            <Avatar className="h-20 w-20 mx-auto mb-3">
              <AvatarImage src={selectedContact.avatar} />
              <AvatarFallback className="text-2xl">{selectedContact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold">{selectedContact.name}</h3>
            <p className="text-sm text-gray-500">{selectedContact.relationship}</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Contact Info</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{selectedContact.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{selectedContact.timezone}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Settings</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notifications</span>
                  <Button size="sm" variant="outline">
                    {selectedContact.notificationsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Favorite</span>
                  <Button size="sm" variant="outline">
                    <Star className={`w-4 h-4 ${selectedContact.isFavorite ? 'text-yellow-500 fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectMessaging;

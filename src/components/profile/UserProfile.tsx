
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  User, Settings, Bell, Shield, MessageCircle, Phone, Video,
  Edit, Save, X, Plus, Search, Filter, MoreHorizontal,
  Calendar, Clock, Star, Heart, Share, Flag, Archive,
  Eye, EyeOff, Lock, Unlock, Download, Upload, Trash2,
  UserPlus, UserMinus, Send, Reply, Forward, Copy, Users,
  Globe, MapPin, Crown, Zap, TrendingUp, Activity
} from 'lucide-react';
import { User as UserType, Group } from '@/types/connectPulse';
import { generateSocialMediaGroups } from '@/data/socialMediaGroups';
import JoinedGroupsList from './JoinedGroupsList';
import SkillsEndorsements from './SkillsEndorsements';
import AnalyticsDashboard from './AnalyticsDashboard';
import PortfolioShowcase from './PortfolioShowcase';

interface UserProfileProps {
  user: UserType;
  onUpdateUser: (user: UserType) => void;
  joinedGroups?: Group[];
  onJoinGroup?: (group: Group) => void;
  onOpenChat?: (group: Group) => void;
}

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
  groups: string[];
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  user, 
  onUpdateUser, 
  joinedGroups = [],
  onJoinGroup,
  onOpenChat
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [activeTab, setActiveTab] = useState<'profile' | 'groups' | 'messages' | 'analytics' | 'portfolio' | 'skills'>('profile');
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [messageFilter, setMessageFilter] = useState<'all' | 'unread' | 'favorites'>('all');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [replyingTo, setReplyingTo] = useState<DirectMessage | null>(null);
  const [availableGroups, setAvailableGroups] = useState<Group[]>([]);
  const [groupSearchTerm, setGroupSearchTerm] = useState('');

  // Generate available groups for joining
  useEffect(() => {
    const groups = generateSocialMediaGroups(user);
    // Filter out already joined groups
    const unJoinedGroups = groups.filter(group => 
      !joinedGroups.find(joined => joined.id === group.id)
    );
    setAvailableGroups(unJoinedGroups);
  }, [user, joinedGroups]);

  // Mock data for contacts
  useEffect(() => {
    setContacts([
      {
        id: '1',
        name: 'John Smith',
        avatar: undefined,
        lastSeen: new Date(Date.now() - 1000 * 60 * 5),
        isOnline: true,
        status: 'available',
        unreadCount: 3,
        lastMessage: {
          id: 'msg1',
          senderId: '1',
          receiverId: user.id,
          content: 'Hey, how are you doing?',
          timestamp: new Date(Date.now() - 1000 * 60 * 10),
          isRead: false,
          messageType: 'text',
          deliveryStatus: 'delivered'
        },
        isBlocked: false,
        isFavorite: true,
        groups: ['developers']
      },
      {
        id: '2',
        name: 'Emily Johnson',
        avatar: undefined,
        lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2),
        isOnline: false,
        status: 'offline',
        unreadCount: 0,
        lastMessage: {
          id: 'msg2',
          senderId: user.id,
          receiverId: '2',
          content: 'Sounds good! Let\'s catch up later.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
          isRead: true,
          messageType: 'text',
          deliveryStatus: 'read'
        },
        isBlocked: false,
        isFavorite: false,
        groups: ['designers']
      },
      {
        id: '3',
        name: 'David Lee',
        avatar: undefined,
        lastSeen: new Date(Date.now() - 1000 * 60 * 30),
        isOnline: true,
        status: 'busy',
        unreadCount: 1,
        lastMessage: {
          id: 'msg3',
          senderId: '3',
          receiverId: user.id,
          content: 'I\'m in a meeting right now, will get back to you soon.',
          timestamp: new Date(Date.now() - 1000 * 60 * 35),
          isRead: false,
          messageType: 'text',
          deliveryStatus: 'delivered'
        },
        isBlocked: false,
        isFavorite: false,
        groups: ['managers']
      },
      {
        id: '4',
        name: 'Sarah Wilson',
        avatar: undefined,
        lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 24),
        isOnline: false,
        status: 'away',
        unreadCount: 0,
        lastMessage: {
          id: 'msg4',
          senderId: user.id,
          receiverId: '4',
          content: 'I\'m on vacation, will be back next week.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25),
          isRead: true,
          messageType: 'text',
          deliveryStatus: 'read'
        },
        isBlocked: false,
        isFavorite: false,
        groups: ['travelers']
      },
      {
        id: '5',
        name: 'Michael Brown',
        avatar: undefined,
        lastSeen: new Date(Date.now() - 1000 * 60 * 15),
        isOnline: true,
        status: 'available',
        unreadCount: 2,
        lastMessage: {
          id: 'msg5',
          senderId: '5',
          receiverId: user.id,
          content: 'Just finished the project, ready for review.',
          timestamp: new Date(Date.now() - 1000 * 60 * 20),
          isRead: false,
          messageType: 'text',
          deliveryStatus: 'delivered'
        },
        isBlocked: false,
        isFavorite: true,
        groups: ['developers']
      }
    ]);
  }, [user.id]);

  const handleSaveProfile = () => {
    onUpdateUser(editedUser);
    setIsEditing(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
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
      replyTo: replyingTo?.id
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setReplyingTo(null);
  };

  const handleJoinGroup = (group: Group) => {
    if (onJoinGroup) {
      onJoinGroup(group);
      setAvailableGroups(prev => prev.filter(g => g.id !== group.id));
    }
  };

  const handleOpenGroupChat = (group: Group) => {
    if (onOpenChat) {
      onOpenChat(group);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = messageFilter === 'all' || 
                         (messageFilter === 'unread' && contact.unreadCount > 0) ||
                         (messageFilter === 'favorites' && contact.isFavorite);
    return matchesSearch && matchesFilter;
  });

  const filteredAvailableGroups = availableGroups.filter(group => 
    group.name.toLowerCase().includes(groupSearchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(groupSearchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Enhanced Profile Header */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-90"></div>
            <div className="absolute inset-0 bg-black/20"></div>
            <CardHeader className="relative text-white p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="relative group">
                  <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-white shadow-xl transition-transform group-hover:scale-105">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-white text-blue-600 text-2xl font-bold">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-3 border-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">{user.name}</CardTitle>
                    <p className="text-blue-100 text-lg">{user.email || 'Professional Member'}</p>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-3 py-1">
                      <Crown className="h-4 w-4 mr-1" />
                      {user.niche}
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-3 py-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {user.country}
                    </Badge>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-100 border-green-300/30 px-3 py-1">
                      <Activity className="h-4 w-4 mr-1" />
                      Active
                    </Badge>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-blue-100">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="font-medium">{joinedGroups.length}</span>
                      <span>Groups</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      <span className="font-medium">{contacts.length}</span>
                      <span>Connections</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-medium">92%</span>
                      <span>Profile Strength</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-white hover:bg-white/20 transition-colors"
                  >
                    {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    <span className="ml-2 hidden sm:inline">{isEditing ? 'Cancel' : 'Edit'}</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
          </div>
        </Card>

        {/* Enhanced Navigation Tabs */}
        <Card className="shadow-lg border-0">
          <div className="p-2">
            <div className="flex flex-wrap gap-1 p-1 bg-gray-100 rounded-lg">
              {[
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'groups', label: 'Groups', icon: Users },
                { id: 'messages', label: 'Messages', icon: MessageCircle },
                { id: 'skills', label: 'Skills', icon: Star },
                { id: 'portfolio', label: 'Portfolio', icon: Eye },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? 'default' : 'ghost'}
                    className={`flex-1 min-w-0 transition-all duration-200 ${
                      activeTab === tab.id 
                        ? 'bg-white shadow-md text-blue-600 border-blue-200' 
                        : 'hover:bg-white/50'
                    }`}
                    onClick={() => setActiveTab(tab.id as any)}
                  >
                    <Icon className="h-4 w-4 mr-1 sm:mr-2 flex-shrink-0" />
                    <span className="truncate text-xs sm:text-sm">{tab.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditing ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <Input
                        value={editedUser.name}
                        onChange={(e) => setEditedUser(prev => ({ ...prev, name: e.target.value }))}
                        className="border-2 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        value={editedUser.email || ''}
                        onChange={(e) => setEditedUser(prev => ({ ...prev, email: e.target.value }))}
                        className="border-2 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <Textarea
                      value={editedUser.bio || ''}
                      onChange={(e) => setEditedUser(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                      rows={4}
                      className="border-2 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={handleSaveProfile} className="bg-blue-600 hover:bg-blue-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-blue-600" />
                      About
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {user.bio || 'No bio available. Click edit to add your bio and tell the world about yourself!'}
                    </p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-white border border-gray-200 rounded-lg">
                      <h3 className="font-semibold text-lg mb-3">Contact Information</h3>
                      <p className="text-gray-600">Email: {user.email || 'Not provided'}</p>
                      <p className="text-gray-600">Location: {user.country}</p>
                      <p className="text-gray-600">Specialization: {user.niche}</p>
                    </div>
                    <div className="p-4 bg-white border border-gray-200 rounded-lg">
                      <h3 className="font-semibold text-lg mb-3">Quick Stats</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Profile Views</span>
                          <span className="font-medium">1,234</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Connections</span>
                          <span className="font-medium">{contacts.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Groups Joined</span>
                          <span className="font-medium">{joinedGroups.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Enhanced Groups Tab */}
        {activeTab === 'groups' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Joined Groups */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    My Groups ({joinedGroups.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <JoinedGroupsList 
                    groups={joinedGroups} 
                    currentUser={user}
                    onOpenChat={handleOpenGroupChat}
                  />
                </CardContent>
              </Card>

              {/* Available Groups */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Discover Groups
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search groups..."
                      value={groupSearchTerm}
                      onChange={(e) => setGroupSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      {filteredAvailableGroups.map((group) => (
                        <div key={group.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium truncate">{group.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {group.scope}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{group.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {group.memberCount.toLocaleString()} members
                            </span>
                            <Button 
                              size="sm" 
                              onClick={() => handleJoinGroup(group)}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <UserPlus className="h-3 w-3 mr-1" />
                              Join
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Messages Tab with Enhanced UI */}
        {activeTab === 'messages' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contacts List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Messages</CardTitle>
                  <Button size="sm" variant="ghost">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search contacts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-1">
                    {[
                      { id: 'all', label: 'All' },
                      { id: 'unread', label: 'Unread' },
                      { id: 'favorites', label: 'Favorites' }
                    ].map((filter) => (
                      <Button
                        key={filter.id}
                        size="sm"
                        variant={messageFilter === filter.id ? 'default' : 'outline'}
                        onClick={() => setMessageFilter(filter.id as any)}
                      >
                        {filter.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-96">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedContact?.id === contact.id ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={contact.avatar} />
                            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {contact.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">{contact.name}</p>
                            {contact.unreadCount > 0 && (
                              <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                                {contact.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 truncate">
                            {contact.lastMessage?.content || 'No messages yet'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Chat Area */}
            <Card className="lg:col-span-2">
              {selectedContact ? (
                <>
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={selectedContact.avatar} />
                          <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{selectedContact.name}</h3>
                          <p className="text-sm text-gray-500">
                            {selectedContact.isOnline ? 'Online' : `Last seen ${selectedContact.lastSeen.toLocaleString()}`}
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
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-96 p-4">
                      {messages.filter(msg => 
                        (msg.senderId === selectedContact.id && msg.receiverId === user.id) ||
                        (msg.senderId === user.id && msg.receiverId === selectedContact.id)
                      ).map((message) => (
                        <div
                          key={message.id}
                          className={`mb-4 flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.senderId === user.id 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-100'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                    <div className="border-t p-4">
                      {replyingTo && (
                        <div className="bg-gray-50 p-2 rounded mb-2 text-sm">
                          <p className="font-medium">Replying to:</p>
                          <p className="text-gray-600 truncate">{replyingTo.content}</p>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setReplyingTo(null)}
                            className="h-6 w-6 p-0 ml-2"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      <form onSubmit={handleSendMessage} className="flex gap-2">
                        <Input
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="submit" disabled={!newMessage.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </CardContent>
                </>
              ) : (
                <div className="h-96 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select a contact to start messaging</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <SkillsEndorsements />
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <PortfolioShowcase />
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <AnalyticsDashboard />
        )}
      </div>
    </div>
  );
};

export default UserProfile;

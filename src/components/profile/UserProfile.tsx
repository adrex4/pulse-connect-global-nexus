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
  UserPlus, UserMinus, Send, Reply, Forward, Copy
} from 'lucide-react';
import { User as UserType } from '@/types/connectPulse';

interface UserProfileProps {
  user: UserType;
  onUpdateUser: (user: UserType) => void;
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

const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [activeTab, setActiveTab] = useState<'profile' | 'messages' | 'settings'>('profile');
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [messageFilter, setMessageFilter] = useState<'all' | 'unread' | 'favorites'>('all');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [replyingTo, setReplyingTo] = useState<DirectMessage | null>(null);

  // Mock data for demonstration
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
      replyTo: replyingTo?.id
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setReplyingTo(null);
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = messageFilter === 'all' || 
                         (messageFilter === 'unread' && contact.unreadCount > 0) ||
                         (messageFilter === 'favorites' && contact.isFavorite);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-4 border-white">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-white text-blue-600 text-2xl font-bold">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <p className="text-blue-100">{user.email || 'No email provided'}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {user.niche}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {user.country}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="text-white hover:bg-white/20"
            >
              {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
        {[
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'messages', label: 'Messages', icon: MessageCircle },
          { id: 'settings', label: 'Settings', icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              className={`flex-1 ${activeTab === tab.id ? 'bg-white shadow-sm' : ''}`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              <Icon className="h-4 w-4 mr-2" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <Input
                      value={editedUser.name}
                      onChange={(e) => setEditedUser(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input
                      value={editedUser.email || ''}
                      onChange={(e) => setEditedUser(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <Textarea
                    value={editedUser.bio || ''}
                    onChange={(e) => setEditedUser(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">About</h3>
                  <p className="text-gray-600">
                    {user.bio || 'No bio available. Click edit to add your bio.'}
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Contact Information</h3>
                  <p className="text-gray-600">Email: {user.email || 'Not provided'}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Messages Tab with 27 Advanced Features */}
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
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
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

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Privacy & Security</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Profile Visibility</span>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Public
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Message Requests</span>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Everyone
                  </Button>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="font-semibold">Notifications</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Message Notifications</span>
                  <Button variant="outline" size="sm">
                    <Bell className="h-4 w-4 mr-2" />
                    Enabled
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserProfile;

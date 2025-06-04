
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  User, Edit, Settings, Camera, MapPin, Phone, Mail, Globe,
  Calendar, Star, Award, Briefcase, MessageCircle, Users,
  Shield, Bell, Lock, Eye, Heart, Share, Download, Upload,
  CheckCircle, Clock, Send, Search, Filter, MoreHorizontal,
  Video, FileText, Image, Paperclip, Smile
} from 'lucide-react';
import { User as UserType } from '@/types/connectPulse';

interface UserProfileProps {
  user: UserType;
  onUpdateProfile: (updates: Partial<UserType>) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [activeTab, setActiveTab] = useState('profile');
  const [dmMessages, setDmMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock DM conversations
  const conversations = [
    {
      id: 'conv1',
      participant: {
        id: 'user1',
        name: 'Sarah Johnson',
        avatar: 'SJ',
        status: 'online',
        lastSeen: 'now'
      },
      lastMessage: 'Hey! Are you available for a quick call later?',
      timestamp: new Date(Date.now() - 300000),
      unread: 2,
      type: 'business'
    },
    {
      id: 'conv2',
      participant: {
        id: 'user2',
        name: 'Mike Chen',
        avatar: 'MC',
        status: 'away',
        lastSeen: '2 hours ago'
      },
      lastMessage: 'Thanks for sharing that resource!',
      timestamp: new Date(Date.now() - 7200000),
      unread: 0,
      type: 'professional'
    },
    {
      id: 'conv3',
      participant: {
        id: 'user3',
        name: 'Emma Rodriguez',
        avatar: 'ER',
        status: 'busy',
        lastSeen: '1 hour ago'
      },
      lastMessage: 'Let me review the proposal and get back to you.',
      timestamp: new Date(Date.now() - 86400000),
      unread: 1,
      type: 'business'
    }
  ];

  // Mock messages for selected conversation
  const mockMessages = [
    {
      id: 'msg1',
      senderId: 'user1',
      content: 'Hi! I saw your post about the new project. Very interesting!',
      timestamp: new Date(Date.now() - 3600000),
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg2',
      senderId: user.id,
      content: 'Thank you! I\'d love to discuss it further. Are you available for a call?',
      timestamp: new Date(Date.now() - 3300000),
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg3',
      senderId: 'user1',
      content: 'Absolutely! How about tomorrow at 2 PM?',
      timestamp: new Date(Date.now() - 300000),
      type: 'text',
      status: 'delivered'
    }
  ];

  const handleSaveProfile = () => {
    onUpdateProfile(editedUser);
    setIsEditing(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const message = {
        id: `msg${Date.now()}`,
        senderId: user.id,
        content: newMessage,
        timestamp: new Date(),
        type: 'text',
        status: 'sent'
      };
      setDmMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl font-bold">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="sm" 
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-white text-blue-600 hover:bg-blue-50"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold">{user.name}</CardTitle>
                  <p className="text-blue-100 text-lg">{user.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified Professional
                    </Badge>
                    <Badge className="bg-blue-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Premium Member
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
                <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-50 border-b">
                <TabsTrigger value="profile" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="messages" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Messages
                  {conversations.reduce((sum, conv) => sum + conv.unread, 0) > 0 && (
                    <Badge className="ml-2 bg-red-500 text-white text-xs">
                      {conversations.reduce((sum, conv) => sum + conv.unread, 0)}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="activity" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                  <Calendar className="h-4 w-4 mr-2" />
                  Activity
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-gray-500 data-[state=active]:text-white">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Profile Information */}
                  <div className="lg:col-span-2 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-5 w-5" />
                          Personal Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {isEditing ? (
                          <>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Full Name</label>
                                <Input 
                                  value={editedUser.name}
                                  onChange={(e) => setEditedUser(prev => ({ ...prev, name: e.target.value }))}
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Email</label>
                                <Input 
                                  value={editedUser.email}
                                  onChange={(e) => setEditedUser(prev => ({ ...prev, email: e.target.value }))}
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Bio</label>
                              <Textarea 
                                value={editedUser.bio || ''}
                                onChange={(e) => setEditedUser(prev => ({ ...prev, bio: e.target.value }))}
                                placeholder="Tell us about yourself..."
                                rows={4}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Phone</label>
                                <Input placeholder="+1 (555) 123-4567" />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Location</label>
                                <Input placeholder="City, Country" />
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button onClick={handleSaveProfile} className="bg-blue-500 hover:bg-blue-600">
                                Save Changes
                              </Button>
                              <Button variant="outline" onClick={() => setIsEditing(false)}>
                                Cancel
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="space-y-3">
                              <p><strong>Bio:</strong> {user.bio || 'No bio available'}</p>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-gray-500" />
                                <span>+1 (555) 123-4567</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-gray-500" />
                                <span>{user.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-500" />
                                <span>San Francisco, CA</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <span>Joined March 2024</span>
                              </div>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Briefcase className="h-5 w-5" />
                          Professional Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-700">Industry</h4>
                            <p className="text-gray-600">Technology & Software</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-700">Experience</h4>
                            <p className="text-gray-600">5+ years</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-700">Skills</h4>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {['React', 'TypeScript', 'Node.js', 'Python'].map(skill => (
                                <Badge key={skill} variant="secondary">{skill}</Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-700">Availability</h4>
                            <Badge className="bg-green-500">Available for projects</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Stats</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Groups Joined</span>
                          <Badge variant="outline">12</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Messages Sent</span>
                          <Badge variant="outline">1,247</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Connections</span>
                          <Badge variant="outline">89</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Rating</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span>4.8</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm">Joined Tech Innovators group</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm">Sent message to Sarah Johnson</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-sm">Updated profile picture</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="messages" className="p-0">
                <div className="flex h-[700px]">
                  {/* Conversations List */}
                  <div className="w-80 border-r bg-gray-50">
                    <div className="p-4 border-b bg-white">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">Messages</h3>
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          New Chat
                        </Button>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search conversations..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    
                    <ScrollArea className="flex-1">
                      <div className="p-2">
                        {conversations.map((conversation) => (
                          <div
                            key={conversation.id}
                            onClick={() => setSelectedConversation(conversation.id)}
                            className={`p-3 rounded-lg cursor-pointer transition-colors mb-2 ${
                              selectedConversation === conversation.id 
                                ? 'bg-blue-100 border-blue-300 border' 
                                : 'hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <Avatar className="h-10 w-10">
                                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                                    {conversation.participant.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(conversation.participant.status)}`}></div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-gray-900 truncate">
                                    {conversation.participant.name}
                                  </h4>
                                  <span className="text-xs text-gray-500">
                                    {formatTime(conversation.timestamp)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 truncate">
                                  {conversation.lastMessage}
                                </p>
                                <div className="flex items-center justify-between mt-1">
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${
                                      conversation.type === 'business' ? 'border-green-300 text-green-700' : 'border-blue-300 text-blue-700'
                                    }`}
                                  >
                                    {conversation.type}
                                  </Badge>
                                  {conversation.unread > 0 && (
                                    <Badge className="bg-red-500 text-white text-xs">
                                      {conversation.unread}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Chat Area */}
                  <div className="flex-1 flex flex-col">
                    {selectedConversation ? (
                      <>
                        {/* Chat Header */}
                        <div className="p-4 border-b bg-white">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {(() => {
                                const conv = conversations.find(c => c.id === selectedConversation);
                                return conv ? (
                                  <>
                                    <div className="relative">
                                      <Avatar className="h-10 w-10">
                                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                                          {conv.participant.avatar}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(conv.participant.status)}`}></div>
                                    </div>
                                    <div>
                                      <h3 className="font-semibold">{conv.participant.name}</h3>
                                      <p className="text-sm text-gray-500">
                                        {conv.participant.status === 'online' ? 'Active now' : `Last seen ${conv.participant.lastSeen}`}
                                      </p>
                                    </div>
                                  </>
                                ) : null;
                              })()}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Video className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Phone className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Messages */}
                        <ScrollArea className="flex-1 p-4">
                          <div className="space-y-4">
                            {mockMessages.map((message) => (
                              <div
                                key={message.id}
                                className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                              >
                                <div
                                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                    message.senderId === user.id
                                      ? 'bg-blue-500 text-white'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  <p className="text-sm">{message.content}</p>
                                  <div className={`text-xs mt-1 ${
                                    message.senderId === user.id ? 'text-blue-100' : 'text-gray-500'
                                  }`}>
                                    {formatTime(message.timestamp)}
                                    {message.senderId === user.id && (
                                      <span className="ml-2">
                                        {message.status === 'read' ? '✓✓' : message.status === 'delivered' ? '✓' : '⏰'}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>

                        {/* Message Input */}
                        <div className="p-4 border-t bg-white">
                          <div className="flex gap-2 items-end">
                            <Button variant="ghost" size="sm">
                              <Paperclip className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Image className="h-4 w-4" />
                            </Button>
                            <div className="flex-1 relative">
                              <Textarea
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="min-h-0 resize-none pr-12"
                                rows={1}
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                  }
                                }}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 bottom-2"
                              >
                                <Smile className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button 
                              onClick={handleSendMessage}
                              disabled={!newMessage.trim()}
                              className="bg-blue-500 hover:bg-blue-600"
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex-1 flex items-center justify-center bg-gray-50">
                        <div className="text-center">
                          <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                          <p className="text-gray-500">Choose a conversation from the sidebar to start messaging</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="p-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { action: 'Joined', target: 'Tech Innovators Global', time: '2 hours ago', type: 'group' },
                          { action: 'Sent message to', target: 'Sarah Johnson', time: '5 hours ago', type: 'message' },
                          { action: 'Updated', target: 'Profile information', time: '1 day ago', type: 'profile' },
                          { action: 'Connected with', target: 'Mike Chen', time: '2 days ago', type: 'connection' }
                        ].map((activity, index) => (
                          <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <div className={`w-3 h-3 rounded-full ${
                              activity.type === 'group' ? 'bg-blue-500' :
                              activity.type === 'message' ? 'bg-green-500' :
                              activity.type === 'profile' ? 'bg-purple-500' : 'bg-orange-500'
                            }`}></div>
                            <div className="flex-1">
                              <p className="text-sm">
                                <span className="font-medium">{activity.action}</span> {activity.target}
                              </p>
                              <p className="text-xs text-gray-500">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="p-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Privacy & Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Profile Visibility</h4>
                          <p className="text-sm text-gray-600">Control who can see your profile</p>
                        </div>
                        <Badge variant="outline">Public</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Message Requests</h4>
                          <p className="text-sm text-gray-600">Allow messages from non-connections</p>
                        </div>
                        <Badge variant="outline">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Online Status</h4>
                          <p className="text-sm text-gray-600">Show when you're online</p>
                        </div>
                        <Badge variant="outline">Visible</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;

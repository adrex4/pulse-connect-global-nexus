
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Send, Phone, Video, MoreVertical, 
  ArrowLeft, Plus, Star, Archive, Settings 
} from 'lucide-react';
import { User } from '@/types/connectPulse';

interface DirectMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastSeen: Date;
  isOnline: boolean;
  unreadCount: number;
  lastMessage?: DirectMessage;
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

  // Mock contacts data
  useEffect(() => {
    setContacts([
      {
        id: '1',
        name: 'Sarah Johnson',
        isOnline: true,
        lastSeen: new Date(),
        unreadCount: 2,
        lastMessage: {
          id: 'msg1',
          senderId: '1',
          receiverId: currentUser.id,
          content: 'Hey! How are you doing?',
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          isRead: false
        }
      },
      {
        id: '2',
        name: 'Mike Chen',
        isOnline: false,
        lastSeen: new Date(Date.now() - 1000 * 60 * 30),
        unreadCount: 0,
        lastMessage: {
          id: 'msg2',
          senderId: currentUser.id,
          receiverId: '2',
          content: 'Thanks for the help!',
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          isRead: true
        }
      },
      {
        id: '3',
        name: 'Emma Davis',
        isOnline: true,
        lastSeen: new Date(),
        unreadCount: 1,
        lastMessage: {
          id: 'msg3',
          senderId: '3',
          receiverId: currentUser.id,
          content: 'Can we schedule a call?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          isRead: false
        }
      }
    ]);
  }, [currentUser.id]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const message: DirectMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId: selectedContact.id,
      content: newMessage,
      timestamp: new Date(),
      isRead: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Direct Messages</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contacts Sidebar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Messages</CardTitle>
                <Button size="sm" variant="ghost">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
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
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback>
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {contact.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium truncate">{contact.name}</h3>
                          {contact.unreadCount > 0 && (
                            <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                              {contact.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {contact.lastMessage?.content || 'No messages yet'}
                        </p>
                        <p className="text-xs text-gray-400">
                          {contact.lastMessage?.timestamp.toLocaleTimeString()}
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
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedContact.avatar} />
                        <AvatarFallback>
                          {selectedContact.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
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
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-96 p-4">
                    {messages.filter(msg => 
                      (msg.senderId === selectedContact.id && msg.receiverId === currentUser.id) ||
                      (msg.senderId === currentUser.id && msg.receiverId === selectedContact.id)
                    ).map((message) => (
                      <div
                        key={message.id}
                        className={`mb-4 flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.senderId === currentUser.id 
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
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-sm">Choose a contact to start messaging</p>
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

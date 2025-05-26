
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send, Users, Globe, MapPin } from 'lucide-react';
import { User, Group, Message } from './ConnectPulse';

interface GroupChatProps {
  user: User;
  group: Group;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onBack: () => void;
}

// Mock messages for demonstration
const generateInitialMessages = (group: Group): Message[] => {
  const mockMessages = [
    {
      id: '1',
      userId: 'user1',
      userName: 'Sarah Johnson',
      content: `Welcome to the ${group.name} group! Great to have everyone here.`,
      timestamp: new Date(Date.now() - 3600000),
      groupId: group.id
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Mike Chen',
      content: 'Looking forward to collaborating with businesses in this space!',
      timestamp: new Date(Date.now() - 3000000),
      groupId: group.id
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Emma Rodriguez',
      content: 'Has anyone here worked with international clients? Would love to share experiences.',
      timestamp: new Date(Date.now() - 1800000),
      groupId: group.id
    }
  ];
  return mockMessages;
};

const GroupChat: React.FC<GroupChatProps> = ({ user, group, messages, onSendMessage, onBack }) => {
  const [newMessage, setNewMessage] = useState('');
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with mock messages if no real messages exist
    if (messages.length === 0) {
      setAllMessages(generateInitialMessages(group));
    } else {
      setAllMessages([...generateInitialMessages(group), ...messages]);
    }
  }, [group.id, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [allMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const getScopeIcon = (scope: string) => {
    switch (scope) {
      case 'local': return <MapPin className="h-4 w-4" />;
      case 'regional': return <Users className="h-4 w-4" />;
      case 'global': return <Globe className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getScopeColor = (scope: string) => {
    switch (scope) {
      case 'local': return 'bg-green-500';
      case 'regional': return 'bg-blue-500';
      case 'global': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className="text-lg">{group.name}</CardTitle>
                <Badge 
                  className={`${getScopeColor(group.scope)} text-white flex items-center gap-1`}
                >
                  {getScopeIcon(group.scope)}
                  {group.scope}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Users className="h-4 w-4" />
                {group.memberCount.toLocaleString()} members • {group.description}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {allMessages.map((message) => (
              <div key={message.id} className={`flex ${message.userId === user.id ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.userId === user.id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-800'
                }`}>
                  {message.userId !== user.id && (
                    <p className="text-xs font-semibold mb-1 opacity-80">
                      {message.userName}
                    </p>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.userId === user.id ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t bg-gray-50">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupChat;

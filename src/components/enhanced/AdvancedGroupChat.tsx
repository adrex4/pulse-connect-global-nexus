import React, { useState } from 'react';
import EnhancedMessageList from '../chat/EnhancedMessageList';
import EnhancedMessageInput from '../chat/EnhancedMessageInput';
import EnhancedChatHeader from '../chat/EnhancedChatHeader';
import { User, Group, Message } from '@/types/connectPulse';
import { Button } from '@/components/ui/button';

interface AdvancedGroupChatProps {
  user: User;
  group: Group;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onBack: () => void;
}

const demoMessages: Message[] = [
  {
    id: '1',
    userId: 'demo-user',
    userName: 'Demo User',
    content: 'Welcome to the new Advanced Group Chat! 🎉',
    timestamp: new Date(),
    groupId: 'demo-group',
  },
  {
    id: '2',
    userId: '2',
    userName: 'Jane Doe',
    content: 'This chat supports emoji, reactions, file sharing, and more! 😎',
    timestamp: new Date(),
    groupId: 'demo-group',
  },
];

const demoGroup: Group = {
  id: 'demo-group',
  name: 'Demo Group',
  memberCount: 2,
  description: 'A sample group for demonstration',
  isPublic: true,
  scope: 'global',
  niche: 'General',
};

const AdvancedGroupChat: React.FC<AdvancedGroupChatProps> = ({ user, group, messages, onSendMessage, onBack }) => {
  // Fallback to demo data if group or messages are empty
  const safeGroup = group && group.id ? group : demoGroup;
  const safeMessages = messages && messages.length > 0 ? messages : demoMessages;
  const [reactions, setReactions] = useState<Record<string, string[]>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleReaction = (messageId: string, emoji: string) => {
    setReactions(prev => ({
      ...prev,
      [messageId]: prev[messageId]?.includes(emoji)
        ? prev[messageId].filter(e => e !== emoji)
        : [...(prev[messageId] || []), emoji],
    }));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
      setReplyTo(null);
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 rounded-xl shadow-2xl border border-blue-100">
      <div className="flex justify-end mb-2 p-2">
        <Button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition">Back to Home</Button>
      </div>
      <EnhancedChatHeader
        group={safeGroup}
        onlineUsers={safeGroup.memberCount}
        showOnlineUsers={true}
        onBack={onBack}
        onVideoCall={() => {}}
        onToggleUsers={() => {}}
        onSettings={() => {}}
      />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <EnhancedMessageList
          messages={safeMessages as any}
          user={user}
          reactions={reactions}
          isTyping={isTyping}
          onReply={() => {}}
          onReaction={handleReaction}
        />
      </div>
      <div className="p-4 bg-white border-t border-blue-100">
        <EnhancedMessageInput
          newMessage={newMessage}
          replyTo={replyTo}
          isRecording={isRecording}
          onMessageChange={setNewMessage}
          onSendMessage={handleSendMessage}
          onEmojiSelect={emoji => setNewMessage(msg => msg + emoji)}
          onImageUpload={() => {}}
          onVoiceMessage={() => setIsRecording(true)}
          onCancelReply={() => setReplyTo(null)}
        />
      </div>
    </div>
  );
};

export default AdvancedGroupChat; 

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User, Group, Message } from '@/types/connectPulse';
import ChatHeader from './chat/ChatHeader';
import MessageList from './chat/MessageList';
import MessageInput from './chat/MessageInput';
import OnlineUsersList from './chat/OnlineUsersList';
import VideoCallModal from './VideoCallModal';
import GroupSettingsModal from './GroupSettingsModal';
import ImageUploadModal from './ImageUploadModal';

interface GroupChatProps {
  user: User;
  group: Group;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onBack: () => void;
}

interface ExtendedMessage extends Message {
  type?: 'text' | 'image' | 'voice' | 'file';
  imageUrl?: string;
  fileName?: string;
  fileSize?: string;
  duration?: string;
  isEdited?: boolean;
  repliedTo?: ExtendedMessage;
}

const generateInitialMessages = (group: Group): Message[] => {
  return [
    {
      id: '1',
      userId: 'user1',
      userName: 'Sarah Johnson',
      content: `🎉 Welcome to the ${group.name} group! Great to have everyone here. Let's share our experiences and grow together!`,
      timestamp: new Date(Date.now() - 7200000),
      groupId: group.id
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Mike Chen',
      content: 'Looking forward to collaborating with businesses in this space! Anyone working on sustainable solutions?',
      timestamp: new Date(Date.now() - 6000000),
      groupId: group.id
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Emma Rodriguez',
      content: 'Has anyone here worked with international clients? Would love to share experiences and learn best practices.',
      timestamp: new Date(Date.now() - 4800000),
      groupId: group.id
    },
    {
      id: '4',
      userId: 'user4',
      userName: 'David Kumar',
      content: '@Emma Rodriguez Yes! I\'ve been working with clients across 15 countries. Happy to share some insights in a call this week.',
      timestamp: new Date(Date.now() - 3600000),
      groupId: group.id
    },
    {
      id: '5',
      userId: 'user1',
      userName: 'Sarah Johnson',
      content: 'That sounds amazing! We should organize a virtual meetup. What do you all think? 📅',
      timestamp: new Date(Date.now() - 1800000),
      groupId: group.id
    }
  ];
};

const GroupChat: React.FC<GroupChatProps> = ({ user, group, messages, onSendMessage, onBack }) => {
  const [newMessage, setNewMessage] = useState('');
  const [allMessages, setAllMessages] = useState<ExtendedMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);
  const [replyTo, setReplyTo] = useState<ExtendedMessage | null>(null);
  const [reactions, setReactions] = useState<Record<string, string[]>>({});
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (messages.length === 0) {
      setAllMessages(generateInitialMessages(group));
    } else {
      setAllMessages([...generateInitialMessages(group), ...messages]);
    }
  }, [group.id, messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const messageContent = replyTo 
        ? `@${replyTo.userName} ${newMessage.trim()}`
        : newMessage.trim();
      
      onSendMessage(messageContent);
      setNewMessage('');
      setReplyTo(null);
      
      toast({
        title: "Message sent!",
        description: "Your message has been delivered.",
      });
      
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const handleImageSelect = (imageUrl: string, caption?: string) => {
    const newImageMessage: ExtendedMessage = {
      id: `img-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      content: caption || 'Shared an image',
      timestamp: new Date(),
      groupId: group.id,
      type: 'image',
      imageUrl: imageUrl
    };
    
    setAllMessages(prev => [...prev, newImageMessage]);
    setIsImageModalOpen(false);
    
    toast({
      title: "Image shared!",
      description: "Your image has been sent to the group.",
    });
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setReactions(prev => ({
      ...prev,
      [messageId]: [...(prev[messageId] || []), emoji]
    }));
    toast({
      title: "Reaction added!",
      description: `Added ${emoji} reaction to message.`,
    });
  };

  const handleVoiceMessage = () => {
    if (isRecording) {
      setIsRecording(false);
      const voiceMessage: ExtendedMessage = {
        id: `voice-${Date.now()}`,
        userId: user.id,
        userName: user.name,
        content: 'Sent a voice message',
        timestamp: new Date(),
        groupId: group.id,
        type: 'voice',
        duration: '0:05'
      };
      setAllMessages(prev => [...prev, voiceMessage]);
      
      toast({
        title: "Voice message sent!",
        description: "Your voice message has been delivered.",
      });
    } else {
      setIsRecording(true);
      toast({
        title: "Recording...",
        description: "Hold to record your voice message.",
      });
    }
  };

  const onlineUsers = Math.floor(group.memberCount * 0.15);

  return (
    <div className="max-w-7xl mx-auto h-screen flex flex-col bg-gray-50">
      <Card className="flex-1 flex flex-col shadow-lg border-0 bg-white overflow-hidden">
        <ChatHeader
          group={group}
          onlineUsers={onlineUsers}
          showOnlineUsers={showOnlineUsers}
          onBack={onBack}
          onVideoCall={() => setIsVideoCallOpen(true)}
          onToggleUsers={() => setShowOnlineUsers(!showOnlineUsers)}
          onSettings={() => setIsSettingsOpen(true)}
        />

        <CardContent className="flex-1 flex p-0 bg-transparent overflow-hidden">
          <div className="flex-1 flex flex-col">
            <MessageList
              messages={allMessages}
              user={user}
              reactions={reactions}
              isTyping={isTyping}
              onReply={setReplyTo}
              onReaction={handleReaction}
            />

            <MessageInput
              newMessage={newMessage}
              replyTo={replyTo}
              isRecording={isRecording}
              onMessageChange={setNewMessage}
              onSendMessage={handleSendMessage}
              onEmojiSelect={handleEmojiSelect}
              onImageUpload={() => setIsImageModalOpen(true)}
              onVoiceMessage={handleVoiceMessage}
              onCancelReply={() => setReplyTo(null)}
            />
          </div>

          {showOnlineUsers && <OnlineUsersList onlineUsers={onlineUsers} />}
        </CardContent>
      </Card>

      <VideoCallModal 
        isOpen={isVideoCallOpen} 
        onClose={() => setIsVideoCallOpen(false)} 
        groupName={group.name}
      />
      <GroupSettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        groupName={group.name}
      />
      <ImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onImageSelect={handleImageSelect}
      />
    </div>
  );
};

export default GroupChat;


import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User, Group, Message } from '@/types/connectPulse';
import EnhancedChatHeader from './chat/EnhancedChatHeader';
import EnhancedMessageList from './chat/EnhancedMessageList';
import EnhancedMessageInput from './chat/EnhancedMessageInput';
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
  type?: 'text' | 'image' | 'voice' | 'file' | 'system';
  imageUrl?: string;
  fileName?: string;
  fileSize?: string;
  duration?: string;
  isEdited?: boolean;
  repliedTo?: ExtendedMessage;
  reactions?: { emoji: string; users: string[]; count: number }[];
  isPinned?: boolean;
  threadCount?: number;
}

const generateInitialMessages = (group: Group): ExtendedMessage[] => {
  return [
    {
      id: '1',
      userId: 'user1',
      userName: 'Sarah Johnson',
      content: `🎉 Welcome to the ${group.name} group! Great to have everyone here. Let's share our experiences and grow together!`,
      timestamp: new Date(Date.now() - 7200000),
      groupId: group.id,
      isPinned: true,
      reactions: [
        { emoji: '❤️', users: ['Mike Chen', 'Emma Rodriguez'], count: 2 },
        { emoji: '👍', users: ['David Kumar'], count: 1 }
      ]
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Mike Chen',
      content: 'Looking forward to collaborating with businesses in this space! Anyone working on sustainable solutions?',
      timestamp: new Date(Date.now() - 6000000),
      groupId: group.id,
      threadCount: 2
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
      groupId: group.id,
      repliedTo: {
        id: '3',
        userId: 'user3',
        userName: 'Emma Rodriguez',
        content: 'Has anyone here worked with international clients?',
        timestamp: new Date(Date.now() - 4800000),
        groupId: group.id
      }
    },
    {
      id: '5',
      userId: 'user1',
      userName: 'Sarah Johnson',
      content: 'That sounds amazing! We should organize a virtual meetup. What do you all think? 📅',
      timestamp: new Date(Date.now() - 1800000),
      groupId: group.id,
      reactions: [
        { emoji: '🔥', users: ['Mike Chen', 'Emma Rodriguez', 'David Kumar'], count: 3 },
        { emoji: '👏', users: ['Alex Smith'], count: 1 }
      ]
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
  const [isMuted, setIsMuted] = useState(false);
  const [isNotified, setIsNotified] = useState(true);
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
        description: "Your message has been delivered to the group.",
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

  const handleEditMessage = (message: ExtendedMessage) => {
    setNewMessage(message.content);
    setReplyTo(null);
    toast({
      title: "Editing message",
      description: "Make your changes and send to update.",
    });
  };

  const handleDeleteMessage = (messageId: string) => {
    setAllMessages(prev => prev.filter(m => m.id !== messageId));
    toast({
      title: "Message deleted",
      description: "The message has been removed from the chat.",
    });
  };

  const handlePinMessage = (messageId: string) => {
    setAllMessages(prev => prev.map(m => 
      m.id === messageId ? { ...m, isPinned: !m.isPinned } : m
    ));
    toast({
      title: "Message pinned",
      description: "The message has been pinned to the chat.",
    });
  };

  const handleThread = (message: ExtendedMessage) => {
    toast({
      title: "Thread started",
      description: "Threading feature coming soon!",
    });
  };

  const onlineUsers = Math.floor(group.memberCount * 0.15);

  return (
    <div className="max-w-7xl mx-auto h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      <Card className="flex-1 flex flex-col shadow-2xl border-0 bg-white overflow-hidden">
        <EnhancedChatHeader
          group={group}
          onlineUsers={onlineUsers}
          showOnlineUsers={showOnlineUsers}
          onBack={onBack}
          onVideoCall={() => setIsVideoCallOpen(true)}
          onAudioCall={() => toast({ title: "Audio call", description: "Audio call feature coming soon!" })}
          onToggleUsers={() => setShowOnlineUsers(!showOnlineUsers)}
          onSettings={() => setIsSettingsOpen(true)}
          onSearch={() => toast({ title: "Search", description: "Search feature coming soon!" })}
          onInvite={() => toast({ title: "Invite", description: "Invite feature coming soon!" })}
          isMuted={isMuted}
          onToggleMute={() => setIsMuted(!isMuted)}
          isNotified={isNotified}
          onToggleNotifications={() => setIsNotified(!isNotified)}
        />

        <CardContent className="flex-1 flex p-0 bg-transparent overflow-hidden">
          <div className="flex-1 flex flex-col">
            <EnhancedMessageList
              messages={allMessages}
              user={user}
              reactions={reactions}
              isTyping={isTyping}
              onReply={setReplyTo}
              onReaction={handleReaction}
              onEdit={handleEditMessage}
              onDelete={handleDeleteMessage}
              onPin={handlePinMessage}
              onThread={handleThread}
            />

            <EnhancedMessageInput
              newMessage={newMessage}
              replyTo={replyTo}
              isRecording={isRecording}
              onMessageChange={setNewMessage}
              onSendMessage={handleSendMessage}
              onEmojiSelect={handleEmojiSelect}
              onImageUpload={() => setIsImageModalOpen(true)}
              onVoiceMessage={handleVoiceMessage}
              onCancelReply={() => setReplyTo(null)}
              onFileUpload={() => toast({ title: "File upload", description: "File upload coming soon!" })}
              onVideoUpload={() => toast({ title: "Video upload", description: "Video upload coming soon!" })}
              onAudioUpload={() => toast({ title: "Audio upload", description: "Audio upload coming soon!" })}
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

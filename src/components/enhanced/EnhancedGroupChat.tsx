import React from 'react';
import { User, Group, Message } from '@/types/connectPulse';
import { Button } from '@/components/ui/button';

interface EnhancedGroupChatProps {
  user: User;
  group: Group;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onBack: () => void;
}

const EnhancedGroupChat: React.FC<EnhancedGroupChatProps> = ({ user, group, messages, onSendMessage, onBack }) => {
  // Strict defensive checks
  if (!user || !group || !messages || !onSendMessage || !user.id || !user.name || !group.id || !group.name) {
    console.error('EnhancedGroupChat: Missing or invalid required props', { user, group, messages, onSendMessage });
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-red-600">
        <h2 className="text-2xl font-bold mb-4">Error: Missing or invalid required data</h2>
        <p className="mb-4">Some required information is missing or invalid. Please reload the page or return to the home screen.</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-red-500 text-white rounded">Reload</button>
      </div>
    );
  }
  // Lazy load the actual chat UI (from GroupChat)
  const GroupChat = require('../GroupChat').default;
  return (
    <div className="max-w-6xl mx-auto h-screen flex flex-col bg-white">
      <div className="flex justify-end mb-2">
        <Button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition">Back to Home</Button>
      </div>
      <GroupChat user={user} group={group} messages={messages} onSendMessage={onSendMessage} onBack={onBack} />
    </div>
  );
};

export default EnhancedGroupChat; 
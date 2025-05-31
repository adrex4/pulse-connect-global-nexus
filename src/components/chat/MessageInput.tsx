
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUp, Smile, Image, Paperclip, Mic } from 'lucide-react';
import EmojiPicker from '../EmojiPicker';

interface ExtendedMessage {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  groupId: string;
}

interface MessageInputProps {
  newMessage: string;
  replyTo: ExtendedMessage | null;
  isRecording: boolean;
  onMessageChange: (message: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  onEmojiSelect: (emoji: string) => void;
  onImageUpload: () => void;
  onVoiceMessage: () => void;
  onCancelReply: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  newMessage,
  replyTo,
  isRecording,
  onMessageChange,
  onSendMessage,
  onEmojiSelect,
  onImageUpload,
  onVoiceMessage,
  onCancelReply
}) => {
  return (
    <div className="p-4 border-t bg-white">
      {replyTo && (
        <div className="p-4 bg-blue-50 border-l-4 border-blue-500 mb-4 rounded-r-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900">Replying to {replyTo.userName}</p>
              <p className="text-sm text-blue-700 bg-white/50 p-2 rounded truncate mt-1">
                {replyTo.content}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onCancelReply} className="text-blue-600 hover:bg-blue-100">
              ✕
            </Button>
          </div>
        </div>
      )}
      
      <form onSubmit={onSendMessage}>
        <div className="flex gap-3 items-end">
          <div className="flex gap-2">
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              className="text-gray-500 hover:text-gray-700"
              onClick={onImageUpload}
            >
              <Image className="h-4 w-4" />
            </Button>
            <Button type="button" variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <Paperclip className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 relative">
            <Textarea
              value={newMessage}
              onChange={(e) => onMessageChange(e.target.value)}
              placeholder={replyTo ? `Replying to ${replyTo.userName}...` : "Type your message..."}
              className="min-h-0 resize-none border-2 focus:border-blue-500 rounded-xl pr-24 bg-white"
              rows={1}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onSendMessage(e);
                }
              }}
            />
            <div className="absolute right-2 bottom-2 flex gap-1">
              <EmojiPicker onEmojiSelect={onEmojiSelect}>
                <Button type="button" variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                  <Smile className="h-4 w-4" />
                </Button>
              </EmojiPicker>
              {newMessage.trim() ? (
                <Button 
                  type="submit"
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-full h-8 w-8 p-0"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  variant={isRecording ? "destructive" : "ghost"}
                  onClick={onVoiceMessage}
                  className={isRecording ? "animate-pulse" : ""}
                >
                  <Mic className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;

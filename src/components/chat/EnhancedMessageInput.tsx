
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ArrowUp, Smile, Image, Paperclip, Mic, Send, X, Bold, Italic, Code, Link, AtSign, Hash, Plus, FileText, Video, Music } from 'lucide-react';
import EmojiPicker from '../EmojiPicker';

interface ExtendedMessage {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  groupId: string;
}

interface EnhancedMessageInputProps {
  newMessage: string;
  replyTo: ExtendedMessage | null;
  isRecording: boolean;
  onMessageChange: (message: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  onEmojiSelect: (emoji: string) => void;
  onImageUpload: () => void;
  onVoiceMessage: () => void;
  onCancelReply: () => void;
  onFileUpload?: () => void;
  onVideoUpload?: () => void;
  onAudioUpload?: () => void;
}

const EnhancedMessageInput: React.FC<EnhancedMessageInputProps> = ({
  newMessage,
  replyTo,
  isRecording,
  onMessageChange,
  onSendMessage,
  onEmojiSelect,
  onImageUpload,
  onVoiceMessage,
  onCancelReply,
  onFileUpload,
  onVideoUpload,
  onAudioUpload
}) => {
  const [isFormatting, setIsFormatting] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormatting = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = newMessage.substring(start, end);
    const newText = newMessage.substring(0, start) + before + selectedText + after + newMessage.substring(end);
    
    onMessageChange(newText);
    
    // Set cursor position after formatting
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const quickEmojis = ['😀', '😂', '❤️', '👍', '😮', '😢', '😡', '🔥', '👏', '🎉'];

  return (
    <div className="p-6 border-t bg-white shadow-lg">
      {/* Reply Preview */}
      {replyTo && (
        <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg shadow-sm animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <p className="text-sm font-semibold text-blue-900">Replying to {replyTo.userName}</p>
              </div>
              <p className="text-sm text-blue-700 bg-white/70 p-3 rounded-lg truncate">
                {replyTo.content}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onCancelReply} 
              className="text-blue-600 hover:bg-blue-100 ml-4"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Formatting Toolbar */}
      {isFormatting && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg border shadow-sm animate-fade-in">
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertFormatting('**', '**')}
              className="hover:bg-gray-200"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertFormatting('*', '*')}
              className="hover:bg-gray-200"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertFormatting('`', '`')}
              className="hover:bg-gray-200"
            >
              <Code className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertFormatting('[', '](url)')}
              className="hover:bg-gray-200"
            >
              <Link className="h-4 w-4" />
            </Button>
            <div className="h-4 w-px bg-gray-300 mx-2"></div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertFormatting('@')}
              className="hover:bg-gray-200"
            >
              <AtSign className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertFormatting('#')}
              className="hover:bg-gray-200"
            >
              <Hash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Quick Emojis */}
      <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-sm text-gray-500 whitespace-nowrap">Quick:</span>
        {quickEmojis.map((emoji) => (
          <Button
            key={emoji}
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEmojiSelect(emoji)}
            className="text-lg hover:bg-gray-100 transition-all hover:scale-110"
          >
            {emoji}
          </Button>
        ))}
      </div>
      
      <form onSubmit={onSendMessage}>
        <div className="flex gap-4 items-end">
          {/* Attachment Menu */}
          <Dialog open={showAttachments} onOpenChange={setShowAttachments}>
            <DialogTrigger asChild>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-80">
              <div className="space-y-2 p-2">
                <Button variant="ghost" className="w-full justify-start" onClick={() => { onImageUpload(); setShowAttachments(false); }}>
                  <Image className="h-4 w-4 mr-3 text-green-600" />
                  Upload Image
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => { onVideoUpload?.(); setShowAttachments(false); }}>
                  <Video className="h-4 w-4 mr-3 text-blue-600" />
                  Upload Video
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => { onAudioUpload?.(); setShowAttachments(false); }}>
                  <Music className="h-4 w-4 mr-3 text-purple-600" />
                  Upload Audio
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => { onFileUpload?.(); setShowAttachments(false); }}>
                  <FileText className="h-4 w-4 mr-3 text-orange-600" />
                  Upload File
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          {/* Message Input */}
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={newMessage}
              onChange={(e) => onMessageChange(e.target.value)}
              placeholder={replyTo ? `Replying to ${replyTo.userName}...` : "Type your message... Use @ to mention someone"}
              className="min-h-0 resize-none border-2 focus:border-blue-500 rounded-2xl pr-32 bg-white shadow-sm transition-all focus:shadow-md"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onSendMessage(e);
                }
              }}
            />
            
            {/* Input Actions */}
            <div className="absolute right-3 bottom-3 flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsFormatting(!isFormatting)}
                className={`text-gray-500 hover:text-gray-700 transition-all ${isFormatting ? 'bg-gray-100' : ''}`}
              >
                <Bold className="h-4 w-4" />
              </Button>
              
              <EmojiPicker onEmojiSelect={onEmojiSelect}>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-500 hover:text-gray-700 transition-all hover:scale-110"
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </EmojiPicker>
              
              {newMessage.trim() ? (
                <Button 
                  type="submit"
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full h-9 w-9 p-0 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <Send className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  variant={isRecording ? "destructive" : "ghost"}
                  onClick={onVoiceMessage}
                  className={`transition-all ${isRecording ? "animate-pulse shadow-lg" : "hover:bg-gray-100"}`}
                >
                  <Mic className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
      
      {/* Typing Indicator for Others */}
      <div className="mt-3 text-xs text-gray-400">
        Press Shift + Enter for new line • @ to mention • # for channels
      </div>
    </div>
  );
};

export default EnhancedMessageInput;

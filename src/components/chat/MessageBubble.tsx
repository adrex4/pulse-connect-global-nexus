
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Pin, Reply, MoreHorizontal, Copy, Forward, Bookmark, Flag, Globe, Smile } from 'lucide-react';

interface MessageBubbleProps {
  message: any;
  user: any;
  reactions: any;
  pinnedMessages: string[];
  bookmarkedMessages: string[];
  messageTranslation: any;
  showReadReceipts: boolean;
  theme: string;
  fontSize: number;
  onReaction: (messageId: string, emoji: string) => void;
  onPin: (messageId: string) => void;
  onBookmark: (messageId: string) => void;
  onTranslate: (messageId: string) => void;
  onReply: (messageId: string) => void;
  getThemeColors: (theme: string) => string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  user,
  reactions,
  pinnedMessages,
  bookmarkedMessages,
  messageTranslation,
  showReadReceipts,
  theme,
  fontSize,
  onReaction,
  onPin,
  onBookmark,
  onTranslate,
  onReply,
  getThemeColors
}) => {
  const emojis = ['👍', '❤️', '😂', '😮', '😢', '😡', '🎉', '🔥', '💯', '👏'];

  return (
    <div className="group relative">
      <div className={`flex items-start gap-3 ${message.userId === user.id ? 'flex-row-reverse' : ''}`}>
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className={`bg-gradient-to-r ${getThemeColors(theme)} text-white`}>
            {message.userId === user.id ? user.name.charAt(0) : 'U'}
          </AvatarFallback>
        </Avatar>
        
        <div className={`flex-1 max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl ${message.userId === user.id ? 'text-right' : ''}`}>
          {/* Message Header */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">
              {message.userId === user.id ? 'You' : 'Anonymous User'}
            </span>
            <span className="text-xs text-gray-500">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
            {pinnedMessages.includes(message.id) && (
              <Pin className="h-3 w-3 text-yellow-600" />
            )}
            {bookmarkedMessages.includes(message.id) && (
              <Bookmark className="h-3 w-3 text-blue-600" />
            )}
            {showReadReceipts && (
              <div className="flex -space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full border border-white"></div>
              </div>
            )}
          </div>

          {/* Message Content */}
          <div className={`p-3 rounded-lg break-words ${
            message.userId === user.id 
              ? `bg-gradient-to-r ${getThemeColors(theme)} text-white` 
              : 'bg-gray-100'
          }`} style={{ fontSize: `${fontSize}px` }}>
            <p className="whitespace-pre-wrap word-wrap break-words">{message.content}</p>
            
            {/* Message Translation */}
            {messageTranslation[message.id] && (
              <div className="mt-2 p-2 bg-black/10 rounded text-sm">
                <div className="flex items-center gap-1 mb-1">
                  <Globe className="h-3 w-3" />
                  <span className="text-xs opacity-75">Translation:</span>
                </div>
                <p>{messageTranslation[message.id]}</p>
              </div>
            )}
          </div>

          {/* Message Reactions */}
          {reactions[message.id] && reactions[message.id].length > 0 && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {reactions[message.id].map((emoji: string, index: number) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => onReaction(message.id, emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          )}

          {/* Message Actions */}
          <div className={`opacity-0 group-hover:opacity-100 transition-opacity mt-2 ${
            message.userId === user.id ? 'text-right' : ''
          }`}>
            <div className="flex gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Smile className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <div className="grid grid-cols-5 gap-1 p-2">
                    {emojis.map(emoji => (
                      <Button
                        key={emoji}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => onReaction(message.id, emoji)}
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => onReply(message.id)}
              >
                <Reply className="h-3 w-3" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onPin(message.id)}>
                    <Pin className="h-4 w-4 mr-2" />
                    {pinnedMessages.includes(message.id) ? 'Unpin' : 'Pin'} Message
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onBookmark(message.id)}>
                    <Bookmark className="h-4 w-4 mr-2" />
                    {bookmarkedMessages.includes(message.id) ? 'Remove' : 'Add'} Bookmark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onTranslate(message.id)}>
                    <Globe className="h-4 w-4 mr-2" />
                    Translate
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Message
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Forward className="h-4 w-4 mr-2" />
                    Forward
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Flag className="h-4 w-4 mr-2" />
                    Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Smile, Search } from 'lucide-react';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  children?: React.ReactNode;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect, children }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const emojiCategories = {
    'Smileys & People': [
      '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
      '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
      '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
      '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
      '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬'
    ],
    'Animals & Nature': [
      '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
      '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒',
      '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇'
    ],
    'Food & Drink': [
      '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒',
      '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬',
      '🥒', '🌶️', '🌽', '🥕', '🧄', '🧅', '🥔', '🍠', '🥐', '🍞'
    ],
    'Activities': [
      '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱',
      '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳'
    ],
    'Objects': [
      '📱', '💻', '🖥️', '🖨️', '⌨️', '🖱️', '🖲️', '💽', '💾', '💿',
      '📀', '🧮', '🎥', '🎞️', '📹', '📷', '📸', '📻', '🎙️', '🎚️'
    ],
    'Symbols': [
      '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
      '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️',
      '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐'
    ]
  };

  const filteredEmojis = React.useMemo(() => {
    if (!searchTerm) return emojiCategories;
    
    const filtered: Record<string, string[]> = {};
    Object.entries(emojiCategories).forEach(([category, emojis]) => {
      const matchingEmojis = emojis.filter(emoji => 
        // In a real app, you'd have emoji names to search against
        emoji.includes(searchTerm)
      );
      if (matchingEmojis.length > 0) {
        filtered[category] = matchingEmojis;
      }
    });
    return filtered;
  }, [searchTerm]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children || (
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
            <Smile className="h-4 w-4" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search emojis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        <div className="max-h-64 overflow-y-auto">
          {Object.entries(filteredEmojis).map(([category, emojis]) => (
            <div key={category} className="p-3 border-b last:border-b-0">
              <h4 className="text-xs font-semibold text-gray-600 mb-2">{category}</h4>
              <div className="grid grid-cols-8 gap-1">
                {emojis.map((emoji, index) => (
                  <button
                    key={`${emoji}-${index}`}
                    onClick={() => onEmojiSelect(emoji)}
                    className="text-lg hover:bg-gray-100 rounded p-1 transition-colors"
                    title={emoji}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {Object.keys(filteredEmojis).length === 0 && (
          <div className="p-6 text-center text-gray-500">
            <Smile className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No emojis found</p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
